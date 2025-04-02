import { motion } from "framer-motion";
import { Search} from "lucide-react";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Divider, Loader } from "@mantine/core";

import axios from "axios";
import CustomerDetails from "../Bookings/CustomerDetails";
import { pastBookingService } from "../../../Type/Type";
import PaginatedList from "../../Services/JobCards/Pagetable";



const PastBooking = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [booking, setbookingdetail] = useState<pastBookingService | null>(null);
  const [productData, setProductData] = useState<pastBookingService[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<pastBookingService[]>([]);
  const [loader, setLoader] = useState(true);
  const token = localStorage.getItem("authToken");

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await axios.get("https://service-sphere-j7vd.onrender.com/service/pastBookings", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
 
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
        product.slotdate.toLowerCase().includes(term) ||  product.completionDate.toLowerCase().includes(term) ||  product.service.name.toLowerCase().includes(term) || product.payment.toLowerCase().includes(term) || product.amount.toString().includes(term) || product.status.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleDetails = (service: pastBookingService) => {
    setbookingdetail(service)
    open();
  }

 

  

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
                  Slot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Completion
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
                 Status
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.slotdate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.completionDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹{product.service.price + (product.service.price*0.18) - (product.service.price*0.10) }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                     ₹{product.status === "Completed" ? product.amount || 0 : 0}
                      </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-semibold">{product.payment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <Button variant="light" color="lime" onClick={() => handleDetails(product)}>Details</Button></td>
                  <td
                    className={` whitespace-nowrap text-md  font-semibold 
                    ${product.status === "Completed" ? "text-green-400" : "text-red-500"}`}
                      >
                    {product.status}
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

export default PastBooking;
