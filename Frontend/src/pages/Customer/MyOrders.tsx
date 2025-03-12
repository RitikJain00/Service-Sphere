import Header from "../../components/Customer/Header/Header"
import Footer from "../../components/Footer/Footer"
import { useCart } from "../../Context/CartContext";
import UpcommingOrder from "../../components/Services/JobCards/UpcommingOrderCard";
import { Divider } from "@mantine/core"
import { Grid } from '@mantine/core';


const MyOrders = () => {
  const {upcommingOrders} = useCart()
  upcommingOrders.sort((a, b) => 
  new Date(a.date).getTime() - new Date(b.date).getTime()
);
  return (
    <div className="flex flex-col min-h-[100vh] bg-mine-shaft-950">
      <Header></Header>
      <Divider mx="md" mb='xl' />
      <div className="text-4xl text-bright-sun-400 font-bold text-center">Upcomming Bookings</div>
   <div className="px-8 flex-grow">
        {upcommingOrders.length > 0 ? (
         
          <Grid>
            {upcommingOrders.map((job) =>  <Grid.Col span={4}>
               <UpcommingOrder key={job.service.id} job={job} /> 
               </Grid.Col>)}
            
          </Grid>
       
        ) : (
          <div className="text-center font-bold text-mine-shaft-300 text-2xl mt-16">
            No Upcomming Booking Present.
          </div>
        )}
      </div>
      <Footer></Footer>

    </div>
  )
}

export default MyOrders