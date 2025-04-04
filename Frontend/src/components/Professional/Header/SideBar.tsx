import { IconPlant2 } from '@tabler/icons-react';
import { Avatar } from '@mantine/core';
import Navlinks from './NavLinks';
import { useProfile } from '../../../Context/ProfileContext';


const SideBar = () => {
  const Detail = useProfile();

  return <div className="min-w-48 w-1/5 min-h-full bg-mine-shaft-900 flex flex-col items-center">
    
    {/* Logo */}
    <div className='flex gap-3 items-center text-amber-400 mt-6 mx-3'>
         <IconPlant2 stroke={1.8} className='h-10 w-10'/>
          <div className='text-2xl font-semibold'>Service Sphere</div>
          </div>

          <div className='mt-12 p-1 bg-white rounded-full shadow-xl '>
          <Avatar size={'xl'}  src={Detail.image || "Model/user.png"} alt="it's me" />
          </div>
          <span className='text-xl mt-2 text-mine-shaft-300'>{Detail.basic.name}</span>


        
          <div className='mt-12 flex flex-col gap-8'>
           <Navlinks></Navlinks>
          </div>
  </div>

  
}

export default SideBar