import { motion } from "framer-motion";
import {SquareCheckBig, Search, BadgeX } from "lucide-react";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Divider } from "@mantine/core";
import axios from "axios";

import { upcommingService } from "../../../Type/Type";
import { useStat } from "../../../Context/StatsProvider";
import { useProfile } from "../../../Context/ProfileContext";
import CustomerDetails from "./CustomerDetails";
import PaginatedList from "../../Services/JobCards/Pagetable";
import { useCart } from "../../../Context/CartContext";


const BookingTable = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [booking, setbookingdetail] = useState<upcommingService | null>(null);
  const [productData, setProductData] = useState<upcommingService[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<upcommingService[]>([]);
  const { loading , setLoading} = useCart()
  const token = localStorage.getItem("authToken");

  const { fetchStatsProfessional,statsProfessional  } = useStat()
  const {basic} = useProfile()
  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await axios.get("https://service-sphere-j7vd.onrender.com/service/allBookings", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setLoading(false);
      setProductData(response.data.service);
      setFilteredProducts(response.data.service);
      
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
   
  }, []);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = productData.filter(
      (product) =>
        product.service.name.toLowerCase().includes(term) || product.payment.toLowerCase().includes(term) ||  Number(product.amount) <= Number(term) ||   product.date.toLowerCase().includes(term) 
    );
    setFilteredProducts(filtered);
  };

  const handleDetails =  (service: upcommingService) => {
    setbookingdetail(service)
    open();
  }

  const handleComplete = async (service: upcommingService) => {
    if (window.confirm("Are you sure you want to complete the service")) {
    try{
      await axios.post("https://service-sphere-j7vd.onrender.com/service/completeBooking", 
        { 
          Orderid: service.id,
          date: service.date,
          customerId: service.customer.id,
          serviceId: service.service.id,
          amount: service.amount,
          payment: service.payment,
          servicePrice: service.service.price
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
          withCredentials: true,
        }
      );
      alert('Service Completed Successfully');
      fetchData();
      fetchStatsProfessional();

    } catch(error){
      console.log(error)
    }
  }};

 

  const handleReject = async (service: upcommingService) => {
    if (window.confirm("Are you sure you want to reject the service")) {
    try{
       await axios.post("https://service-sphere-j7vd.onrender.com/service/rejectBooking", 
        { 
          Orderid: service.id,
          date: service.date,
          customerId: service.customer.id,
          customerName: service.customer.profile.name,
          customerEmail: service.customer.username,
          serviceId: service.service.id,
          serviceName: service.service.name,
          company: basic.name,
          amount: service.amount,
          payment: service.payment,
          servicePrice: service.service.price
        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
          withCredentials: true,
        }
      );
      alert('Service Rejected Successfully');
      fetchData();
      fetchStatsProfessional();

    } catch(error){
      console.log(error)
    }
  }};

  const handlePayment = async () => {
    console.log(statsProfessional)
    if((statsProfessional.wallet.Pay + statsProfessional.wallet.Gst) === 0){
      alert('No Payment Due');
      return
    }
    if (window.confirm("Are you sure you want to pay the Due")) {
    try{
      setLoading(true); 
       await axios.post("https://service-sphere-j7vd.onrender.com/payment/professionalPayment", 
       {},
        {
          headers: { Authorization: `Bearer ${token}` }, 
          withCredentials: true,
        }
      );
      alert('Payment Successfull');
      fetchStatsProfessional();
    } catch(error){
      console.log(error)
    }finally {
      setLoading(false); // Stop loading indicator
    }
  }};

  return (
    <motion.div
      className="bg-mine-shaft-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
  

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Bookings List</h2>
        <div className="flex gap-4">
        <Button onClick={handlePayment} disabled={loading} variant="light" color="orange">Pay Due</Button>
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
      </div>

      {/* Table */}
      {productData.length === 0 && !loading ? (
        <div className="flex justify-center items-center min-h-[20vh] text-2xl text-mine-shaft-300">
          No Bookings Available
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
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Earnings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                 Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">

            <PaginatedList
                data={filteredProducts}
                itemsPerPage={4} // 4 services per page
                renderItem={(product) => (

                <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                    <img
                      src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60"
                      alt="Product img"
                      className="size-10 rounded-full"
                    />
                   {product.service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹{product.service.price + (product.service.price*0.18) - (product.service.price*0.10) }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹{product.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-semibold">{product.payment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Button variant="light" color="lime" onClick={() => handleDetails(product)}>Details</Button></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button onClick={() => handleComplete(product)}  className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <SquareCheckBig size={18} />
                    </button>
                    <button onClick={() => handleReject(product)} className="text-red-400 hover:text-red-300">
                      <BadgeX size={18} />
                    </button>
                  </td>
                </motion.tr>
                   )}
                   />

            </tbody>
          </table>
          <Divider mx="md" mb="xl" />
        </div>
      )}

     { booking && <CustomerDetails opened={opened} close={close}  booking={booking} /> }

    </motion.div>
  );
};

export default BookingTable;
