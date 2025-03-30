import Relevance from "../Fiters/Relevance";
import { useCart } from "../../../Context/CartContext";


import ServiceCard from "./ServiceCard";



const Jobs = () => {
 
  const { filteredServices,} = useCart()

  


  return (
    <div className="mx-4">
      <div className="flex justify-between items-center">
        <div className="text-3xl bs:text-4xl text-mine-shaft-300 font-semibold m-4">Recommended Jobs</div>
        <Relevance />
      </div>

          { filteredServices.length === 0 ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-2xl text-mine-shaft-300">No Service Available</div>
          </div>
        ) : (
          <div className="px-8">
            {filteredServices.map((job) => (
              <ServiceCard key={job.id} job={job} />
            ))}
          </div>
        )}


    </div>
  );
};

export default Jobs;
