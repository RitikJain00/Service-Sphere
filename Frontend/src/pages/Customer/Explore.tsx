import Header from "../../components/Customer/Header/Header"
import Footer from "../../components/Footer/Footer"
import { Divider } from "@mantine/core"
import SearchBox from "../../components/Services/Fiters/SearchBox"
import Cart from "../../components/Services/Others/Cart"
import Offer from "../../components/Services/Others/Offers"
import Promise from "../../components/Services/Others/OurPromise"
import Jobs from "../../components/Services/JobCards/Jobs"

import { Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';

import { IconPlant2 } from '@tabler/icons-react';



const Explore = () => {

  const [opened, { open, close }] = useDisclosure(false);


  
  return <div className="min-h-[100vh] bg-mine-shaft-950">
   <Header></Header>
    <Divider mx="md" mb='xl' />

      {/* Filters */}
      <div className="flex justify-between  bs:mx-16 md:mx-24 lg:mx-32">

      <Burger className='md:hidden mx-8  xs:mr-2 sm:mr-6 ' opened={opened} onClick={open} aria-label="Toggle navigation" />
      <Drawer size={`xs`} opened={opened} onClose={close} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} 
    >
      <div className="flex flex-col gap-16">
      <div className='flex gap-3 items-center text-amber-400 mt-6 '>
         <IconPlant2 stroke={1.8} className='h-10 w-10'/>
          <div className='text-2xl font-semibold'>Service Sphere</div>
          </div>
      
          <SearchBox ></SearchBox>
      
      </div>
 
          </Drawer>
        <div className="mt-4 hidden w-80 sticky top-[30px] h-[calc(100vh-100px)] md:block">
          <SearchBox ></SearchBox>
        </div>

        {/* Services */}
        <div>
          <Jobs></Jobs>
        </div>


        {/* Cart & offers */}
        <div className="sticky  top-[30px] h-[calc(100vh-100px)] overflow-y-auto hidden lg:block 2xl:block">
            <Cart></Cart> 
            <Offer></Offer>
            <Promise></Promise>
        </div>
      </div>
    <Footer></Footer>

  </div>
}

export default Explore