import { motion } from "framer-motion";
import { Edit, Search, } from "lucide-react";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Divider } from "@mantine/core";

import axios from "axios";
import { IconCheck, IconCaretUpDown } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import ServiceHandler from "./Service";

import { useStat } from "../../../Context/StatsProvider";
import { useCart } from "../../../Context/CartContext";
import PaginatedList from "../../Services/JobCards/Pagetable";

interface Service {
  id: string;
  name: string;
  company: string;
  description: string;
  category: string;
  expireince: number;
  location: string;
  price: number;
  isActive: string;
}

const ProductsTable = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [service, setService] = useState<Service | null>(null);
  const [editService, setEditService] = useState(false);
  const [productData, setProductData] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Service[]>([]);
  const token = localStorage.getItem("authToken");
  const {fetchStatsProfessional } = useStat()
  const {loading,setLoading } = useCart()

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await axios.get("https://service-sphere-j7vd.onrender.com/service/allService", {
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

  // Handle Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = productData.filter(
      (product) =>
        product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term) || product.isActive.toLowerCase().includes(term) || product.price.toString().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleAdd = () => {
    setService(null);
    setEditService(true);
    open();
  };

  const handleEdit = (service: Service) => {
    setService(service);
    setEditService(true);
    open();
  };

  const handleStatusChange = async (service: Service) => {
    if (window.confirm("Are you sure you want to Change the Status of the service")) {
    try {
      await axios.put(
        "https://service-sphere-j7vd.onrender.com/service/statusChange",
        { id: service.id, status: service.isActive }, // ✅ Send data correctly
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Headers should be in the 3rd parameter
          withCredentials: true,
        }
      );

      fetchData();
      fetchStatsProfessional()
      showNotification({
        title: "Service Status Changed",
        message: "Your Service Status Changed Successfully!",
        color: "teal",
        icon: <IconCheck size={20} />,
      });
    } catch (error) {
      console.error("Error in changing status of the service:", error);
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
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
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
      {productData.length === 0 && !loading ? (
        <div className="flex justify-center items-center min-h-[20vh] text-2xl text-mine-shaft-300">
          No Service Available
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
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                 Status
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
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹ {product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.expireince} </td>
                  <td
                    className={` whitespace-nowrap px-6 py-4 text-md  font-semibold 
                    ${product.isActive === "Active" ? "text-green-400 " : "text-red-500"}`}
                      >
                    {product.isActive}
                </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button onClick={() => handleEdit(product)} className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={22} />
                    </button>
                    <button onClick={() => handleStatusChange(product)} className="text-red-500 hover:text-red-300">
                      <IconCaretUpDown size={22} />
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

      <div className="w-full flex justify-center">
        <Button disabled={loading} onClick={handleAdd} variant="light" color="lime">
          Add Service
        </Button>
      </div>

      {editService && <ServiceHandler opened={opened} close={close} fetchAgain={fetchData} service={service} />}
    </motion.div>
  );
};

export default ProductsTable;
