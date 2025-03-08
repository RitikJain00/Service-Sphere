import { motion } from "framer-motion";
import {SquareCheckBig, Search, BadgeX } from "lucide-react";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Divider } from "@mantine/core";
import axios from "axios";
import { IconCheck } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

import { Loader } from '@mantine/core';


interface CustomerProfile{
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  country: string;
  image: string;
}

interface CustomerInfo {
  id: string;
  username: string;
  profile: CustomerProfile
}
interface Service {
  id: string;
  name: string;
}
interface upcommingService {
  id: string;
  date: string;
  amount: string;
  payment: string;
  customer: CustomerInfo;
  service: Service
}


const dateFormatter = (response: any) => {

  response.data.service.map((ser: any) => {
    const date = new Date(ser.date);
    const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  });
  ser.date = formattedDate
  })
  
}


const PastBooking = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [booking, setbookingdetail] = useState<upcommingService | null>(null);
  const [productData, setProductData] = useState<upcommingService[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<upcommingService[]>([]);
  const [loader, setLoader] = useState(true);
  const token = localStorage.getItem("authToken");

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/service/pastBookings", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      dateFormatter(response)
      setLoader(false);
      setProductData(response.data.service);
      setFilteredProducts(response.data.service);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoader(false);
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
        product.date.toLowerCase().includes(term) || product.service.name.toLowerCase().includes(term) || product.payment.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleDetails = (service: upcommingService) => {
    setbookingdetail(service)
   
    open();
  }

  // const handleComplete = (service: upcommingService) => {
  //   setService(null);
  

  // };

  // const handleReject = (service: upcommingService) => {
  //   setService(service);
    
  // };

  

  return (
    <motion.div
      className="bg-mine-shaft-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Full-Screen Loader with Blur */}
      {loader && (
        <div className="fixed inset-0 flex items-center justify-center bg-mine-shaft-950 bg-opacity-50 backdrop-blur-lg z-50">
          <Loader color="blue" size="xl" />
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Bookings List</h2>
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
      {productData.length === 0 && !loader ? (
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
                 Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                 Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map((product: upcommingService) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹{product.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-semibold">{product.payment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Button variant="light" color="lime" onClick={() => handleDetails(product)}>Details</Button></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  Status
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <Divider mx="md" mb="xl" />
        </div>
      )}

    

    </motion.div>
  );
};

export default PastBooking;
