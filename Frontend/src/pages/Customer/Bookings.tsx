import Header from "../../components/Customer/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../Context/CartContext";
import UpcommingOrder from "../../components/Services/JobCards/UpcommingOrderCard";
import { Divider, Table } from "@mantine/core";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import PaginatedList from "../../components/Services/JobCards/Pagetable";

const CustomerBookings = () => {
  const { upcommingOrders, pastOrders } = useCart();
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  // Sorting upcoming orders by date (earliest first)
  upcommingOrders.sort((a, b) => {
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      const fullYear = year < 50 ? 2000 + year : 1900 + year;
      return new Date(fullYear, month - 1, day);
    };
    return parseDate(a.date).getTime() - parseDate(b.date).getTime();
  });

  // Sorting past orders by completion date (latest first)
  pastOrders.sort((a, b) => {
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      const fullYear = year < 50 ? 2000 + year : 1900 + year;
      return new Date(fullYear, month - 1, day);
    };
    return parseDate(b.completionDate).getTime() - parseDate(a.completionDate).getTime();
  });

  return (
    <div className="flex flex-col min-h-[100vh] bg-mine-shaft-950">
      <Header />
      <Divider mx="md" mb="xl" />

      {/* Upcoming Bookings Section */}
      <div className="text-4xl text-bright-sun-400 font-bold text-center">Upcoming Bookings</div>
      <div className="px-8 flex-grow">
        {upcommingOrders.length > 0 ? (
          <Carousel
            slideSize="22%"
            align="center"
            slideGap="md"
            dragFree
            controlSize={30}
            loop
            nextControlIcon={<IconArrowRight className="h-6 w-6" />}
            previousControlIcon={<IconArrowLeft className="h-6 w-6" />}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            {upcommingOrders.map((job) => (
              <Carousel.Slide key={job.service.id}>
                <UpcommingOrder job={job} />
              </Carousel.Slide>
            ))}
          </Carousel>
        ) : (
          <div className="text-center font-bold text-mine-shaft-300 text-2xl mt-16">
            No Upcoming Booking Present.
          </div>
        )}
      </div>

      {/* Past Bookings Section */}
      <div className="text-4xl text-bright-sun-400 font-bold text-center mt-16">Past Bookings</div>
      <div className="px-8 flex-grow mt-8">
        {pastOrders.length > 0 ? (
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr className="text-xl md:text-2xl font-bold text-bright-sun-300">
                <Table.Th className="!text-center">Service</Table.Th>
                <Table.Th className="!text-center">Service Name</Table.Th>
                <Table.Th className="!text-center">Amount</Table.Th>
                <Table.Th className="!text-center">Payment</Table.Th>
                <Table.Th className="!text-center">Status</Table.Th>
                <Table.Th className="!text-center">Slot Date</Table.Th>
                <Table.Th className="!text-center">Completion Date</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <PaginatedList
                data={pastOrders}
                itemsPerPage={4} // 4 services per page
                renderItem={(job) => (
                  <Table.Tr key={job.id} className="text-lg md:text-xl font-bold text-center">
                    <Table.Td className="flex items-center justify-center">
                      <img
                        className="w-16 h-16 rounded-full"
                        src={`ServicePages/${job.service.category.toLowerCase()}.png`}
                        alt={job.service.name}
                      />
                    </Table.Td>
                    <Table.Td>{job.service.name}</Table.Td>
                    <Table.Td>&#8377; {job.service.price + job.service.price * 0.08}</Table.Td>
                    <Table.Td>{job.payment}</Table.Td>
                    <Table.Td className={job.status === "Completed" ? "text-green-500" : "text-red-500"}>
                      {job.status}
                    </Table.Td>
                    <Table.Td>{job.slotDate}</Table.Td>
                    <Table.Td>{job.completionDate}</Table.Td>
                  </Table.Tr>
                )}
              />
            </Table.Tbody>
          </Table>
        ) : (
          <div className="text-center font-bold text-mine-shaft-300 text-2xl mt-16">
            No Past Booking Present.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CustomerBookings;
