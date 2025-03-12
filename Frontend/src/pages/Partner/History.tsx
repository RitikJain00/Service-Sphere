import Header from "../../components/Professional/Header/Header"
import SideBar from "../../components/Professional/SideBar"
import { Divider } from "@mantine/core"
import StateCard from "../../components/Professional/StateCard"
import { motion } from "framer-motion";
import { AlertTriangle, IndianRupee, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../../components/Professional/DashBoard/PiChart";
import SalesTrendChart from "../../components/Professional/Services/SalesTrendChart";
import PastBooking from "../../components/Professional/History/PastBookings";
import { useStat } from "../../Context/StatsProvider";


const History = () => {
	const { statsProfessional } = useStat()
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
					<StateCard name='Past Bookings' icon={Package} value={statsProfessional._count.PastBookings} color='#6366F1' />
					<StateCard name='Completed Bookings' icon={TrendingUp} value={statsProfessional.completedPastBookings} color='#10B981' />
					<StateCard name='Cancelled Bookings' icon={AlertTriangle} value={statsProfessional.rejectedPastBookings} color='#F59E0B' />
					<StateCard name='Total Revenue' icon={IndianRupee} value={statsProfessional.wallet.Total} color='#EF4444' />
				</motion.div>

				<PastBooking></PastBooking>

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>

    </div>
    </div>

}

export default History