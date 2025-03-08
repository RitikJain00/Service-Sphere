
import { Divider } from "@mantine/core"
import { IconMapPin,  IconRecharging,IconBriefcase, IconClock } from "@tabler/icons-react";


const UpcommingBooking = (   {job }  : any) => {

  const date = new Date(job.date);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  });

  return <div className=' mt-8  p-4  bg-mine-shaft-900 rounded-xl hover:scale-105 hover:shadow-[0_0_5px_2px_black] transition duration-300 !shadow-bright-sun-300'>

    <div className='flex flex-col gap-4'>

      {/* Head Section */}

      <div className="flex gap-8">
    
          <div><img className='w-12 h-12' src={job.image} alt="" /></div>
        
        <div className="">
          <div className='text-2xl font-semibold text-mine-shaft-300 font-[poppins]'>{job.service.name}</div>
          <div className='mt-1'>{job.service.company} &#x2022; &#x2B50; 4.26</div>
        </div>
        <div><img className="w-8 h-8 cursor-pointer" src="/cancel.png" alt="" /></div>
         
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
        </div>

    <div >
    {job.service.description}
    </div>
      
     {/* Info and image */}
    

        
     
  
      <Divider mx="md" color='mine-shaft.7'/>

      {/* Price and Time */}
      <div className='flex justify-between '>
        <div className='font-semibold text-xl text-mine-shaft-200'>&#8377; {job.amount}</div>
        <div className='flex gap-1 items-center text-sm text-mine-shaft-300'><IconClock size={20} stroke={2} /> {formattedDate}</div>
      </div>

    </div>
  </div>
}

export default UpcommingBooking