import Header from "../../components/Admin/Header/Header"
import SideBar from "../../components/Admin/Header/Sidebar"
import { Divider } from "@mantine/core"
import StateCard from '../../components/Professional/Services/StateCard'
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import CategoryDistributionChart from "../../components/Admin/DashBoard/PiChart";
import SalesChannelChart from "../../components/Admin/DashBoard/BarChart";
import { useStat } from "../../Context/StatsProvider";

const Admin = () => {
	const {statsAdmin} = useStat();
	const DATA = statsAdmin
  ? [
      { name: "Revenue (k)", value: (statsAdmin.adminWallet.wallet) / 1000 },
      { name: "Professionals", value: statsAdmin.totalProfessionals },
      { name: "Services", value: statsAdmin.totalServices },
      { name: "Customers", value: statsAdmin.totalCustomers },
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
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StateCard name='Total Orders' icon={Zap} value={statsAdmin.totalPastBookings + statsAdmin.totalUpcomingBookings} color='#6366F1' />
					<StateCard name='Total Professionals' icon={Users} value={statsAdmin.totalProfessionals} color='#8B5CF6' />
					<StateCard name='Total Services' icon={ShoppingBag} value={statsAdmin.totalServices} color='#EC4899' />
					<StateCard name='Total Customers' icon={BarChart2} value={statsAdmin.totalCustomers} color='#10B981' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
 				 <SalesChannelChart DATA={DATA} />
 				 <CategoryDistributionChart DATA={DATA} />
			</div>


			</main>
    </div>
   
  </div>
}

export default Admin