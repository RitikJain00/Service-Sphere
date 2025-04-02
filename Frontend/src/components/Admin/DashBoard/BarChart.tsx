import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const COLORS = ["#10B981","#F59E0B", "#8B5CF6", "#EC4899",  "#6366F1"];

interface props {
	DATA: {
	name: string |"",
	value: number | 0
	}[]
}


const SalesChannelChart = ({ DATA = [] }: props) => {

	return (
		<motion.div
  className="w-full bg-mine-shaft-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
>
  <h2 className="text-lg font-medium mb-4 text-gray-100">Overview</h2>

  <div className="w-full h-80">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
        <XAxis dataKey="name" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(31, 41, 55, 0.8)",
            borderColor: "#4B5563",
          }}
          itemStyle={{ color: "#E5E7EB" }}
        />
        <Legend />
        <Bar dataKey="value" fill="#8884d8">
          {DATA.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</motion.div>
	);
};
export default SalesChannelChart;