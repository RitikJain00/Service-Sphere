import Header from "../../components/Professional/Header/Header"
import SideBar from "../../components/Professional/Header/SideBar"
import { Divider } from "@mantine/core"
import StateCard from '../../components/Professional/Services/StateCard'
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import CategoryDistributionChart from "../../components/Admin/DashBoard/PiChart";
import SalesChannelChart from "../../components/Admin/DashBoard/BarChart";
import { useStat } from "../../Context/StatsProvider";

const DashBoard = () => {
	const { statsProfessional} = useStat()
	const ConversionRate = parseFloat(((statsProfessional.completedPastBookings / statsProfessional._count.PastBookings) * 100).toFixed(2)) | 0;

	const DATA =  statsProfessional
  ? [
      { name: "Catagories", value: (statsProfessional.serviceCategories)},
			{ name: "Services", value: statsProfessional._count.services },
      { name: "Sales", value: statsProfessional.completedPastBookings},
      { name: "Customers", value: statsProfessional.newCustomers },
      { name: "Revenue (k)", value: statsProfessional.wallet.Total/1000},

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
					<StateCard name='Total Sales' icon={Zap} value={statsProfessional.completedPastBookings} color='#6366F1' />
					<StateCard name='New Users' icon={Users} value={statsProfessional.newCustomers} color='#8B5CF6' />
					<StateCard name='Total Services' icon={ShoppingBag} value={statsProfessional._count.services} color='#EC4899' />
					<StateCard name='Conversion Rate %' icon={BarChart2} value={ConversionRate}

  color='#10B981' />
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

export default DashBoard