import Header from "../../components/Customer/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Divider } from "@mantine/core";
import { useCart } from "../../Context/CartContext";

import PaginatedList from "../../components/Services/JobCards/Pagination";
import Ordercard from "../../components/Services/JobCards/Ordercard";



const MyOrders = () => {
  const { orders } = useCart();


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

            <PaginatedList
                  
                  data={orders}
                  itemsPerPage={4} // 5 services per page
                  renderItem={(order) => <Ordercard key={order.id} order={order} />}
                />
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
