import Header from "../../components/Customer/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Divider, Table } from "@mantine/core";
import { useCart } from "../../Context/CartContext";

const MyOrders = () => {
  const { orders } = useCart();
  console.log(orders);

  return (
    <div className="flex flex-col min-h-[100vh] bg-mine-shaft-950">
      <Header />
      <Divider mx="md" mb="xl" />

      <div className="text-3xl md:text-4xl text-bright-sun-400 font-bold text-center">
        Your Orders
      </div>

      <div className="px-8 flex-grow mt-8 mx-auto">
        {orders.length > 0 ? (
          <div className="flex flex-col gap-4 ">
            {orders.map((order) => (
              <div
                key={order.id}
                className="min-w-fit mt-8 p-4 bg-mine-shaft-900 rounded-xl hover:scale-105 hover:shadow-[0_0_5px_2px_black] transition duration-300 !shadow-bright-sun-300"
              >
                
                <div className="text-lg md:text-xl font-bold mb-4">{order.bookedDate}</div>
                {/* Order Details Table */}
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                  <Table.Thead>
                    <Table.Tr className="text-bs md:text-lg bs:text-xl font-bold text-bright-sun-300">
                      <Table.Th className="!text-center">Service</Table.Th>
                      <Table.Th className="!text-center">Service Name</Table.Th>
                      <Table.Th className="!text-center">Company Name</Table.Th>
                      <Table.Th className="!text-center">Price</Table.Th>
                      <Table.Th className="!text-center">Slot Date</Table.Th>
                      <Table.Th className="!text-center">Payment</Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody >
                    {order.services.map((booking, index) => (
                      <Table.Tr key={index} className="text-sm text-bs bs:text-lg font-bold text-center !bg-mine-shaft-950">
                        <Table.Td className="flex items-center justify-center">
                          <img className="w-16 h-16 rounded-full" src={booking.service.image} alt="" />
                        </Table.Td>
                        <Table.Td>{booking.service.name}</Table.Td>
                        <Table.Td>{booking.service.company}</Table.Td>
                        <Table.Td> &#8377;{booking.service.price}</Table.Td>
                        <Table.Td>{booking.date}</Table.Td>
                        <Table.Td>{order.payment}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>

                {/* Order Summary */}
                <div className="flex flex-col gap-1 bg-mine-shaft-900 p-4 rounded-lg">
                      <div className="text-lg md:text-xl mt-5 flex justify-between">
                    <div>Total</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">&#8377;</span>
                      <span>{order.total}</span>
                    </div>
                  </div>

                  <div className="text-lg md:text-xl mt-3 flex justify-between">
                    <div>GST</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">&#8377;</span>
                      <span>{order.gst}</span>
                    </div>
                  </div>

                  <div className="text-lg md:text-xl my-3 flex justify-between">
                    <div>Discount</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">&#8377;</span>
                      <span>{order.discount}</span>
                    </div>
                  </div>

                  <Divider color="mine-shaft.5" />

                  <div className="text-lg md:text-xl my-3 flex justify-between font-bold">
                    <div>Grand Total</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">&#8377;</span>
                      <span>{order.grandTotal}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center font-bold text-mine-shaft-300 text-2xl mt-16">
            No Orders Present.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyOrders;
