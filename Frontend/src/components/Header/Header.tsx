import { IconPlant2, IconShoppingCart } from '@tabler/icons-react';
import { IconBellRinging } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { IconMapPin } from '@tabler/icons-react';
import { Indicator } from '@mantine/core';
import Navlinks from './Navlinks';
import MenuItem from './MenuItem';

const Header = () => {
    return(
      <div className="w-full h-24 px-6  bg-mine-shaft-950 flex justify-between items-center  text-cyan-50 ">

        {/* Logo */}
         <div className='flex gap-3 items-center text-amber-400'>
         <IconPlant2 stroke={1.8} className='h-10 w-10'/>
          <div className='text-2xl font-semibold'>Service Sphere</div>
          </div>

          {/* Navbar */}
          <div className='flex gap-8 text-mine-shaft-300 h-full  items-center'>
          <Navlinks></Navlinks>
          </div>


          {/* Location */}
          <div className=' flex gap-3 p-2 w-48 h-8 rounded items-center cursor-pointer text-mine-shaft-300 '>
          <IconMapPin stroke={2} />
          <div>Location</div>
            </div>


          {/* Profile, setting, notification */}
          <div className='flex gap-4 items-center'>
              <MenuItem></MenuItem>

               <Indicator inline processing color="red"  offset={6} size={8}>
               <div className='p-2 rounded-full bg-mine-shaft-900 cursor-pointer'>  
                    <IconBellRinging stroke={2} />
               </div>
               </Indicator>

               <Indicator label="0" size={12} color="red" offset={6}>
                   <div className='p-2 rounded-full bg-mine-shaft-900 cursor-pointer'>
                   <IconShoppingCart stroke={2} />
                   
                   </div>
                  </Indicator>
         
            
            </div>
      </div>
     
 
    ) 
}

export default Header;