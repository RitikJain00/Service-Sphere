import Relevance from "../Fiters/Relevance";
import ServiceCard from "./ServiceCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from '@mantine/core';



const Jobs = () => {


  const location = useLocation();
  const ServiceType = location.pathname.slice(1);
  const [Data , setData] = useState([])
  const [loader , setLoader] = useState(true);

  

  useEffect(() => {
    axios.get("http://localhost:3000/shopService/allService", {
      params: { category: ServiceType } // Send category as query param
    })
    .then((response) => {
      setLoader(false)
      setData(response.data.service); 
    })
    .catch((error) => console.error("Error fetching services:", error));
  }, [ServiceType]); 


  return <div className="mx-4">
    <div className="flex justify-between items-center">
      <div className="text-4xl text-mine-shaft-300 font-semibold m-4"> Recommeded Job</div>
      <Relevance></Relevance>
    </div>

    {/* All the Services */}
    {loader || Data.length === 0 ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          {loader ? <Loader color="blue" size="xl" /> : <div className="text-2xl text-mine-shaft-300">No Service Available</div>}
        </div>
      ) : (
        <div className="px-8 ">
          {Data.map((job, index) => (
            <ServiceCard key={index} job={job} />
          ))}
        </div>
      )}
   
    
   
    
  </div>
}

export default Jobs;