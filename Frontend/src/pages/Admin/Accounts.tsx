import Header from "../../components/Admin/Header/Header"
import SideBar from "../../components/Admin/Header/Sidebar"
import { Divider } from "@mantine/core"
import StateCard from '../../components/Professional/Services/StateCard'
import { motion } from "framer-motion";
import { TrendingUp, Package, IndianRupee, AlertTriangle, Zap} from "lucide-react";
import CategoryDistributionChart from "../../components/Admin/DashBoard/PiChart";
import SalesChannelChart from "../../components/Admin/DashBoard/BarChart";
import { useStat } from "../../Context/StatsProvider";
import PaymentPendingCustomers from "../../components/Admin/Accounts/CustomerPendingPayment";
import PaymentPendingProfessional from "../../components/Admin/Accounts/ProfessionalPendingPayment";

const Admin = () => {
	const {statsAdmin} = useStat();
	const DATA = statsAdmin
  ? [
      { name: "Revenue", value:statsAdmin.adminWallet.wallet},
			{ name: "Profit ", value: statsAdmin.adminWallet.wallet-statsAdmin.adminWallet.totalGst+statsAdmin.adminWallet.recieve-statsAdmin.adminWallet.pay },  
      { name: "GST", value: statsAdmin.adminWallet.totalGst },
			{ name: "Pending", value: statsAdmin.adminWallet.recieve },
      { name: "Due ", value: statsAdmin.adminWallet.pay },
       
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
					<StateCard name='Total Revenue' icon={IndianRupee} value={statsAdmin.adminWallet.wallet} color='#EF4444' />
					<StateCard name='Total GST' icon={Package} value={statsAdmin.adminWallet.totalGst} color='#8B5CF6' />
					<StateCard name='Pending Amount' icon={TrendingUp} value={statsAdmin.adminWallet.recieve} color='#10B981'/>
					<StateCard name='Payment Due' icon={AlertTriangle} value={statsAdmin.adminWallet.pay} color='#F59E0B' />
          <StateCard name='Total Profit' icon={Zap} value={statsAdmin.adminWallet.wallet-statsAdmin.adminWallet.totalGst+statsAdmin.adminWallet.recieve-statsAdmin.adminWallet.pay} color='#6366F1' />
      
				</motion.div>

        <PaymentPendingCustomers/>
        <PaymentPendingProfessional/>

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