import Header from "../../components/Admin/Header/Header"
import SideBar from "../../components/Admin/Sidebar"
import { Divider } from "@mantine/core"
import StateCard from "../../components/Professional/StateCard"
import { motion } from "framer-motion";
import { AlertTriangle, BarChart2, Users, TrendingUp,UserRoundCheck } from "lucide-react";
import CategoryDistributionChart from "../../components/Admin/DashBoard/PiChart";
import SalesTrendChart from "../../components/Admin/DashBoard/BarChart";
import ProfessionalTable from '../../components/Admin/Professional/ProfessionalTable'
import { useStat } from "../../Context/StatsProvider";


const Professionals = () => {
	const {statsAdmin} = useStat();

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
					<StateCard name='Total Professionals' icon={Users} value={statsAdmin.totalProfessionals} color='#6366F1' />
					<StateCard name='New Professionals' icon={UserRoundCheck} value={statsAdmin.newProfessionals} color='#C30E59' />
					<StateCard name='Completed Bookings' icon={TrendingUp} value={statsAdmin.totalCompletedBookings} color='#10B981' />
					<StateCard name='Declined Bookings' icon={AlertTriangle} value={statsAdmin.totalRejectedBookings} color='#F59E0B' />
					<StateCard name='Conversion Rate' icon={BarChart2} value={parseFloat(((statsAdmin.totalCompletedBookings/(statsAdmin.totalCompletedBookings + statsAdmin.totalRejectedBookings)) * 100).toFixed(2))} color='#EF4444' />
				</motion.div>

				<ProfessionalTable/>

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>

    </div>
    </div>

}

export default Professionals