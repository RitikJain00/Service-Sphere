import { motion } from "framer-motion";
import {SquareCheckBig, Search, BadgeX } from "lucide-react";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Divider } from "@mantine/core";
import axios from "axios";

import { showNotification } from "@mantine/notifications";

import { Loader } from '@mantine/core';
import ProfessionalDetails from "./ProfessionalDetails";



interface Profile {
  name: string;
  phone: string;
  image: string;
  city: string
}
interface service{
  services: number
}

interface ProfessionalData {
  id: string;
  username: string;
  wallet: number;
  profile: Profile;
  _count: service;
  completedPastBookings: number;
  rejectedPastBookings: number
}





const PastBooking = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [booking, setbookingdetail] = useState<ProfessionalData | null>(null);
  const [professionalData, setProfessionalData] = useState<ProfessionalData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfessional, setFilteredProfessionals] = useState<ProfessionalData[]>([]);
  const [loader, setLoader] = useState(true);
  const token = localStorage.getItem("authToken");

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/adminsDashboard/professional/allProfessionals", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
 
      setLoader(false);
      setProfessionalData(response.data.service);
      setFilteredProfessionals(response.data.service);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(professionalData)
  }, []);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(professionalData)
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = professionalData.filter(
      (professional) =>
        professional.profile.city.toLowerCase().includes(term) || professional.profile.name.toLowerCase().includes(term) 
    );
    setFilteredProfessionals(filtered);
  };

  const handleDetails = (service: ProfessionalData) => {
    setbookingdetail(service)
    open();
  }

  const handlePayment = (service: ProfessionalData) => {
    
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
        <h2 className="text-xl font-semibold text-gray-100">Professional List</h2>
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
      {professionalData.length === 0 && !loader ? (
        <div className="flex justify-center items-center min-h-[20vh] text-2xl text-mine-shaft-300">
          No Professional Available
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
                  Profile
                </th>
               
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Services
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Completed Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Rejected Bookings
                </th>
              
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Balance
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                 Payment
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                 Status
                </th>
               
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProfessional.map((product: ProfessionalData) => (
                <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                    <img
                      src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60"
                      alt="Product img"
                      className="size-10 rounded-full"
                    />
                   {product.profile.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Button variant="light" color="orange" onClick={() => handleDetails(product)}>Details</Button></td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-lg text-gray-300">{product._count.services}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-lg text-gray-300">{product.completedPastBookings}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-lg text-gray-300">{product.rejectedPastBookings}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-lg text-gray-300 font-semibold">{product.wallet}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Button variant="light" color="lime" onClick={() => handlePayment(product)}>Pay</Button></td>
                  
                  {/* <td
                    className={` whitespace-nowrap text-md  font-semibold 
                    ${product.status === "Completed" ? "text-green-400" : "text-red-500"}`}
                      >
                    {product.status}
                </td> */}

                </motion.tr>
              ))}
            </tbody>
          </table>
          <Divider mx="md" mb="xl" />
        </div>
      )}

{ booking && <ProfessionalDetails opened={opened} close={close}  booking={booking} /> }

    </motion.div>
  );
};

export default PastBooking;
