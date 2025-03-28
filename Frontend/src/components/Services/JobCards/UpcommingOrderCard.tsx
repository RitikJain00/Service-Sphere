
import { Divider } from "@mantine/core"
import { IconMapPin,  IconRecharging,IconBriefcase, IconClock, IconCreditCardPay } from "@tabler/icons-react";
import { Button } from '@mantine/core';
import axios from "axios";
import { useCart } from "../../../Context/CartContext";


const UpcommingOrder = (   {job }  : any) => {

  const {fetchUpcommingBookings, fetchUpcommingOrders, setLoading} = useCart()
  const token = localStorage.getItem('authToken')

const handleCancel = async () => {

  if (window.confirm("Are you sure you want to cancel the service")) {
    try{
      setLoading(true)
       await axios.post("http://localhost:3000/service/cancelBooking", 
        { 
          id: job.id,
          amount: job.amount,
          payment: job.payment,
          date: job.date,
          serviceId: job.service.id,
          professionalId: job.service.professionalId,
          servicePrice: job.service.price

        },
        {
          headers: { Authorization: `Bearer ${token}` }, 
          withCredentials: true,
        }
      );
      alert('Service Cancelled Successfully');
      fetchUpcommingBookings();
      fetchUpcommingOrders()

    } catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
}

  return <div className='min-w-max mt-8  p-4  bg-mine-shaft-900 rounded-xl hover:scale-105 hover:shadow-[0_0_5px_2px_black] transition duration-300 !shadow-bright-sun-300'>

    <div className='flex flex-col gap-4'>

      {/* Head Section */}

      <div className="flex justify-between gap-4">
    
          <div className="flex gap-4">
            <img className='w-20 h-20' src={job.image} alt="" />
        <div className="ml-4">
          <div className='text-2xl font-semibold text-mine-shaft-300 font-[poppins]'>{job.service.name}</div>
          <div className='mt-1'>{job.service.company} &#x2022; &#x2B50; 4.26</div>
        </div>
        </div>
        <Button onClick={handleCancel} variant="light" color="red">Cancel</Button>
         
      </div>

      {/* Feature */}
      <div className='flex gap-8 text-sm mt-2'>
            <div className='bg-mine-shaft-800 text-bright-sun-300 rounded-lg px-2 py-1 flex gap-2 w-auto'>
            <IconBriefcase size={20}  stroke={2} />
            <div>{job.service.expireince}</div>
               </div>
            <div className='bg-mine-shaft-800 text-bright-sun-300 rounded-lg px-2 py-1 flex gap-2'>
            <IconMapPin size={20} stroke={2} />
            <div>{job.service.location}</div>
              </div>
            <div className='bg-mine-shaft-800 text-bright-sun-300 rounded-lg px-2 py-1 flex gap-2'>
            <IconRecharging size={20} stroke={2} />
            <div>{job.service.booking}</div>
            </div>
            <div className='bg-mine-shaft-800 text-bright-sun-300 rounded-lg px-2 py-1 flex gap-2'>
            <IconCreditCardPay size={20} stroke={2} />
            <div>{job.payment}</div>
            </div>
        </div>

    <div >
    {job.service.description}
    </div>
      
     {/* Info and image */}
    
  
      <Divider mx="md" color='mine-shaft.7'/>

      {/* Price and Time */}
      <div className='flex justify-between '>
        <div className='font-semibold text-xl text-mine-shaft-200'>&#8377; {job.amount}</div>
        <div className='flex gap-1 items-center text-sm text-mine-shaft-300'><IconClock size={20} stroke={2} /> {job.date}</div>
      </div>

    </div>
  </div>
}

export default UpcommingOrder