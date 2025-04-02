import Header from "../../components/Admin/Header/Header"
import SideBar from "../../components/Admin/Header/Sidebar"
import { Divider } from "@mantine/core"
import StateCard from "../../components/Professional/Services/StateCard"
import { motion } from "framer-motion";
import { AlertTriangle, BarChart2, Users, TrendingUp,UserRoundCheck } from "lucide-react";
import CategoryDistributionChart from "../../components/Admin/DashBoard/PiChart";
import SalesChannelChart from "../../components/Admin/DashBoard/BarChart";
import CustomerTable from '../../components/Admin/Customer/CustomerTable'
import { useStat } from "../../Context/StatsProvider";


const Customers = () => {
	const {statsAdmin} = useStat();
	const DATA = statsAdmin
  ? [
      { name: "Customers", value: statsAdmin.totalCustomers},
      { name: "New Customers", value: statsAdmin.newCustomers },
			{ name: "Cancelled ", value: statsAdmin.totalCancelledBookings },
      { name: "Completed ", value: statsAdmin.totalCompletedBookings },
      
    ]
  : [];
  return <div className="w-full min-h-[100vh] bg-mine-shaft-950 flex ">
      <SideBar></SideBar>
    <div className="w-full">
    <Header></Header>
    <Divider mx="md" mb='xl' />

    <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StateCard name='Total Customers' icon={Users} value={statsAdmin.totalCustomers} color='#6366F1' />
					<StateCard name='New Customers' icon={UserRoundCheck} value={statsAdmin.newCustomers} color='#C30E59' />
					<StateCard name='Completed Bookings' icon={TrendingUp} value={statsAdmin.totalCompletedBookings} color='#10B981' />
					<StateCard name='Cancelled Bookings' icon={AlertTriangle} value={statsAdmin.totalCancelledBookings} color='#F59E0B' />
					<StateCard name='Conversion Rate' icon={BarChart2} value={parseFloat(((statsAdmin.totalCompletedBookings/(statsAdmin.totalCompletedBookings+statsAdmin.totalCancelledBookings)) * 100).toFixed(2))} color='#EF4444' />
				</motion.div>

				<CustomerTable/>

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
				<SalesChannelChart DATA={DATA} />
 				 <CategoryDistributionChart DATA={DATA} />
				</div>
			</main>

    </div>
    </div>

}

export default Customers