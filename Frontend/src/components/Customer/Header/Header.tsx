import { IconPlant2, IconShoppingCart } from '@tabler/icons-react';

import { IconMapPin } from '@tabler/icons-react';
import { Indicator } from '@mantine/core';
import MenuItem from './MenuItem';
import { useCart } from '../../../Context/CartContext';
import {  useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

import { Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';
import { Link, useLocation} from 'react-router-dom';


const Header = () => {
  
 
  const  { cart }  = useCart();
  const navigate = useNavigate();
const [opened, { open, close }] = useDisclosure(false);
const location = useLocation(); 

const links = [
  {name: 'Home', url: '/home'},
  {name: 'Professional', url: '/ProfessionalLogin'},
  {name: 'Contact', url: '/contact'},
  {name: 'About Us', url: '/about'},
  // {name: 'Customer', url: '/CustomerLogin'}
]

  const [user, setUser] = useState<{ token: string | null; type: string | null }>({
    token: localStorage.getItem("authToken"),
    type: localStorage.getItem("Type")
  });
 
  useEffect(() => {
    if (!user.token) return; 
  
    axios
      .get("http://localhost:3000/customersign/checkLogin", {
        headers: { Authorization: `Bearer ${user.token}` },
        withCredentials: true,
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          setUser({ token: null, type: null }); 
          localStorage.removeItem("authToken");
          localStorage.removeItem("Type");
        }
      });
  
  }, []); 


   
    return(
      <div className="w-full h-24 px-6  bg-mine-shaft-950 flex justify-between items-center  text-cyan-50 ">

        {/* Logo */}
         <div className='flex gap-3 items-center text-amber-400'>
         <IconPlant2 stroke={1.8} className='h-10 w-10'/>
          <div className='text-2xl font-semibold'>Service Sphere</div>
          </div>

          {/* Navbar */}
          <div className='hidden md:flex gap-8  text-mine-shaft-300 h-full  items-center'>
          {links.map((link,index) => 
             <div key = {index} className={`${location.pathname ==  link.url ? `border-bright-sun-400 text-bright-sun-400` : 'border-transparent'} border-t-2 h-full flex items-center`}>
                <Link  to = {link.url}>{link.name}</Link> 
            </div>
           )
            }
          </div>


          {/* Location */}
          <div className='hidden lg:flex gap-3 p-2 w-48 h-8 rounded items-center cursor-pointer text-mine-shaft-300 '>
          <IconMapPin stroke={2} />
          <div>Location</div>
            </div>

            <div className='flex gap-8 items-center'>
          { (user.type === 'Customer' && user.token )? 
        
          ( <div className='flex gap-4 items-center'>
        
           <MenuItem setUser={setUser} ></MenuItem>

            

            <Indicator label={cart.length} size={20} color="bright-sun.7" offset={6}>
                <div onClick={() => navigate('/Cart')} className='p-2 rounded-full bg-mine-shaft-900 cursor-pointer'>
                <IconShoppingCart stroke={2} />
               
                </div>
               </Indicator>
      
         
         </div>) :  <Button variant="light" color="yellow" onClick={() => navigate('/CustomerLogin')}>Login</Button>
         }
           

<Burger className='md:hidden' opened={opened} onClick={open} aria-label="Toggle navigation" />

<Drawer 
  size="xs" 
  opened={opened} 
  onClose={close} 
  overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} 
  position="right"
  // Prevents scrolling
>
  <div className="flex flex-col items-center gap-8">
  
  <div className="flex gap-3 items-center text-amber-400 pb-4">
      <IconPlant2 stroke={1.8} className="h-10 w-10" />
      <div className="text-2xl font-semibold">Service Sphere</div>
    </div>


    <div className="flex flex-col gap-5 items-center flex-grow overflow-auto">
      {links.map((link, index) => (
        <div key={index} className="flex items-center">
          <Link className="text-xl hover:text-bright-sun-400" to={link.url}>
            {link.name}
          </Link>
        </div>
      ))}
    </div>

    {/* Bottom Section - Branding */}
 
  </div>
</Drawer>


      </div>

      </div>
     
 
    ) 
}

export default Header;