import Header from "../../components/Professional/Header/Header"
import SideBar from "../../components/Professional/SideBar"
import { Divider } from "@mantine/core"
import StateCard from '../../components/Professional/StateCard'
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import CategoryDistributionChart from "../../components/Professional/DashBoard/PiChart";
import SalesOverviewChart from "../../components/Professional/DashBoard/LineChart";
import SalesChannelChart from "../../components/Professional/DashBoard/BarChart";

const DashBoard = () => {
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
					<StateCard name='Total Sales' icon={Zap} value='$12,345' color='#6366F1' />
					<StateCard name='New Users' icon={Users} value='1,234' color='#8B5CF6' />
					<StateCard name='Total Products' icon={ShoppingBag} value='567' color='#EC4899' />
					<StateCard name='Conversion Rate' icon={BarChart2} value='12.5%' color='#10B981' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />
				</div>
			</main>
    </div>
   
  </div>
}

export default DashBoard