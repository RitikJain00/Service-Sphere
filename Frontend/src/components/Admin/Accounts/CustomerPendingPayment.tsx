import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Button, Divider } from "@mantine/core";
import PaginatedList from "../../Services/JobCards/Pagetable";

import axios from "axios";

import { useStat } from "../../../Context/StatsProvider";
import { useCart } from "../../../Context/CartContext";



interface Profile{
  name: string,
  phone: string,
 }
 interface Wallet{
  Pending: number
 }
  interface customerPendingPayment{
    id: number,
    username: string,
    profile: Profile,
    wallet: Wallet
  }


const PaymentPendingCustomers = () => {

  const [customerPendingpayment, setCustomerPendingpayment] = useState<customerPendingPayment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomer, setFilteredCustomers] = useState<customerPendingPayment[]>([]);
  const {loading,setLoading } = useCart()
  const token = localStorage.getItem("authToken");

  const { fetchStatsAdmin } = useStat()


  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get("https://service-sphere-j7vd.onrender.com/adminsDashboard/customers/customersPendingPayment", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
 
     
      setCustomerPendingpayment(response.data.customers);
      setFilteredCustomers(response.data.customers);
    } catch (error) {
      console.error("Error fetching services:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
 
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = customerPendingpayment.filter(
      (customer) =>
      customer.profile.name.toLowerCase().includes(term) ||
      customer.wallet.Pending >= Number(term) // Compare numerically
    );
    setFilteredCustomers(filtered);
  };

  const handlePayment = async (amount: number, customerId: number, email: string, name: string) => {
    if (window.confirm("Are you sure you want to pay the due?")) {
    
      try {
        setLoading(true)
        await axios.post(
          "https://service-sphere-j7vd.onrender.com/adminsDashboard/customers/customersPayment",
          { amount, customerId, email, name }, 
          {
            headers: { Authorization: `Bearer ${token}` }, 
            withCredentials: true,
          }
        );
  
        fetchStatsAdmin() ;
        await fetchData();
        alert('Payment Successfull')

      } catch (error) {
        console.error("Error in Payment:", error);
      }finally{
        setLoading(false)
      }
    }
  };
  




  return (
    <motion.div
      className="bg-mine-shaft-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
     
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Customers Balances</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Table */}
      {customerPendingpayment.length === 0 && !loading ? (
        <div className="flex justify-center items-center min-h-[20vh] text-2xl text-mine-shaft-300">
          No Customer Balance Available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Phone-No
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Due Amount
                </th>
               
              
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Pay Due
                </th>

              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
            <PaginatedList
                data={filteredCustomer}
                itemsPerPage={4} // 4 services per page
                renderItem={(product) => (
                  
                <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                    <img
                      src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60"
                      alt="Product img"
                      className="size-10 rounded-full"
                    />
                   {product.profile.name}
                  </td>

                  <td className="px-6 py-4  whitespace-nowrap text-md text-gray-300 font-semibold"> {product.username}</td>

                  <td className="px-6 py-4  whitespace-nowrap text-md text-gray-300 font-semibold"> {product.profile.phone}</td>
                
                  <td className="px-6 py-4  whitespace-nowrap text-lg text-gray-300 font-semibold">₹  {product.wallet.Pending + (product.wallet.Pending*0.18)-(product.wallet.Pending*0.10)}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Button onClick={() => handlePayment(product.wallet.Pending, product.id, product.username, product.profile.name)} disabled={loading} variant="light" color="lime" >Payment</Button></td>
                  
                </motion.tr>
              )}
              />
    
            </tbody>
          </table>
          <Divider mx="md" mb="xl" />
        </div>
      )}
    </motion.div>
  );
};

export default PaymentPendingCustomers;
