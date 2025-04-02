import React  from "react";
import { createContext, useContext, useState,useEffect, ReactNode } from "react";
import { Loader } from "@mantine/core";
import axios from "axios";

import { StatsContextType, StatsProfessional, StatsAdmin } from "../Type/Type";

 const StatContext = createContext<StatsContextType | undefined>(undefined);

 interface StatProviderProps {
  children: ReactNode; // Explicitly define the type for children
}

 export const StatProvider: React.FC<StatProviderProps> =  ({ children } ) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [categoryProfessional, setCategoryProfessional] = useState([{  category: '', totalBookings: 0}])
  const [statsProfessional, setStatsProfessional] = useState<StatsProfessional>({
    wallet: {
      Total: 0,
      Pending: 0,
      Pay: 0,
      Gst: 0
    },
    _count: {
      services: 0,
      UpcommingBookings: 0,
      PastBookings: 0
    },
    activeServices: 0,
    completedPastBookings: 0,
    rejectedPastBookings: 0,
    newCustomers: 0,
    serviceCategories: 0
  })

  const [statsAdmin, setStatsAdmin] = useState<StatsAdmin>({
    totalCustomers: 0,
    totalProfessionals: 0,
    totalUpcomingBookings: 0,
    totalPastBookings: 0,
    totalCompletedBookings: 0,
    totalCancelledBookings: 0,
    totalRejectedBookings: 0,
    totalServices: 0,
    adminWallet: {
      wallet:  0,
      recieve:  0,
      pay:  0,
      totalGst: 0,
    },
    newCustomers: 0,
  newProfessionals: 0,
  })

  const fetchStatsProfessional = async () => {
    const token = localStorage.getItem('authToken')
    if(!token) return

    setLoading(true); 
    try{
      const response = await axios({
        method: 'get',
        url: 'https://service-sphere-j7vd.onrender.com/statistics/statsProfessional',
        headers: {Authorization: `Bearer ${token}`}
      })
     
      setStatsProfessional(response.data.stats)
      
    } catch(error){
      console.log('Error in Fetching Cart', error)
    }
    setLoading(false);      
  }
  
  useEffect(() => {
    fetchStatsProfessional();
  }, [])


  const fetchCategoryDataProfessional = async () => {
    const token = localStorage.getItem('authToken')
    if(!token) return

    setLoading(true); 
    try{
      const response = await axios({
        method: 'get',
        url: 'https://service-sphere-j7vd.onrender.com/statistics/categoryChartProfessional',
        headers: {Authorization: `Bearer ${token}`}
      })
     
      setCategoryProfessional(response.data.formattedData)
      
    } catch(error){
      console.log('Error in Fetching Cart', error)
    }
    setLoading(false);      
  }
  
  useEffect(() => {
    fetchCategoryDataProfessional();
  }, [])



  const fetchStatsAdmin = async () => {
    const token = localStorage.getItem('authToken')
    if(!token) return

    setLoading(true); 
    try{
      const response = await axios({
        method: 'get',
        url: 'https://service-sphere-j7vd.onrender.com/statistics/statsAdmin',
        headers: {Authorization: `Bearer ${token}`}
      })
     
      setStatsAdmin(response.data.stats)
      
    } catch(error){
      console.log('Error in Fetching Cart', error)
    }
    setLoading(false);      
  }
  
  useEffect(() => {
    fetchStatsAdmin();
   
  }, [])


  

  return (
    <StatContext.Provider value= {{ statsProfessional,statsAdmin, loading, categoryProfessional, fetchStatsProfessional, fetchStatsAdmin }}>
      {loading && (  
    <div className="fixed top-0 left-0 w-full h-screen  bg-mine-shaft-500 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-[9999]">
    <Loader color="blue" size="xl" />
    </div>
  )}

      {children}
    </StatContext.Provider>
  );
};

export const useStat = (): StatsContextType => {
const context = useContext(StatContext);
if (!context) {
  throw new Error("useStat must be used within a StatProvider");
}
return context;
};