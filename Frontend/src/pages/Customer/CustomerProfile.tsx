import Header from "../../components/Customer/Header/Header";
import Footer from "../../components/Footer";


import { IconPhone, IconHome, IconBuildings, IconFlag, IconMapPinCode, IconUser  } from '@tabler/icons-react';
import { IconMail } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { Divider } from '@mantine/core';


import { TextInput, rem  } from '@mantine/core';
import { useProfile } from '../../Context/ProfileContext';

const CustomerProfile = () => {

    const Detail = useProfile();
    return  <div className="min-h-[100vh] font-['poppins'] bg-mine-shaft-950 ">

        <Header></Header>
         <Divider mx="md" mb='xl' />


         <div className="mx-32">
      
      {/*   Image Section */}

        <div  className="w-full relative">
          <img className='rounded-t-2xl w-full ' src="/Profile/ServiceSphereBanner.png" alt="" />
          <img className="w-48 h-48 rounded-full absolute -bottom-24 left-4 border-mine-shaft-900 border-8" src="/Home/avatar-9.png" alt="" />
        </div>

      {/* Basic Detail */}

        <div className="mt-28 px-8 w-full flex justify-between">

          {Detail.edit[0] ? 
          <div className='flex flex-col gap-2 '>
            
            <div className='w-full'>
            <TextInput
              className='w-96'
              leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
              label="Full Name"
              withAsterisk
              placeholder="Name"
              value={`${Detail.basic.name}`}
              onChange={(e) => Detail.handleBasicChange("name", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="About"
              withAsterisk
              placeholder="Tell us About Yourself"
              value={`${Detail.basic.about}`}
              onChange={(e) => Detail.handleBasicChange("about", e.target.value)}
            />
            </div>

          </div> :  
          <div className=" flex flex-col gap-2">

        <div className="text-5xl font-semibold items-center flex hover:text-bright-sun-400 transition-all duration-300">
        { Detail.basic.name }
        </div>

        <div className='text-xl text-mine-shaft-500'>
        { Detail.basic.about }
        </div>

</div>
}
  
           <ActionIcon variant="subtle" color="yellow" aria-label="Settings" size='xl' onClick={() => Detail.handleClick(0)}>
            
            { Detail.edit[0] ? <div onClick={() => Detail.saveProfile()} >Save</div>  : <  IconPencil stroke={2} /> }
            </ActionIcon> 
    </div>

    <Divider mx="md" my='xl' />

    {/* Contact Details */}

    <div className='px-8 w-full flex justify-between'>
        <div className='flex flex-col gap-4'>
   
        <div className='text-4xl mb-4 font-semibold text-bright-sun-400'>Contact Details :</div>

            
        { Detail.edit[1] ? 
          <div className='flex flex-col gap-2 '>
            
            <div className='w-full'>
            <TextInput
              className='w-96'
              leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}
              label="Your Email"
              disabled
              withAsterisk
              placeholder="Email"
              value={`${Detail.contact.email}`}
              onChange={(e) => Detail.handleContactChange("email", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="Mobile No"
              leftSection={<IconPhone style={{ width: rem(16), height: rem(16) }} />}
              withAsterisk
              placeholder="Mobile"
              value={`${Detail.contact.phone}`}
              onChange={(e) => Detail.handleContactChange("phone", e.target.value)}
            />
            </div>

          </div> : 
            <div>
            <div className='flex gap-16 text-2xl'>
              <div className='w-32'>Email:</div>
              <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center ">
              <div><IconMail stroke={2} /></div>
              {Detail.contact.email}</div>
              </div>


            <div className='flex gap-16  text-2xl'>
            <div className='w-32'>Mobile:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-cente  ">
            <IconPhone stroke={2} />
            {Detail.contact.phone}</div>
        </div>
        </div>
}
</div>

   <ActionIcon variant="subtle" color="yellow" aria-label="Settings" size='xl'  onClick={() => Detail.handleClick(1)}>
              { Detail.edit[1] ? <div onClick={() => Detail.saveProfile()}>Save</div>  : < IconPencil stroke={2} /> }
          </ActionIcon> 

    </div>

    <Divider mx="md" my='xl' />

    {/* Address Details */}

    <div className='px-8 w-full flex justify-between'>
        <div className='flex flex-col gap-4'>
   
        <div className='text-4xl mb-4 font-semibold text-bright-sun-400'>Address Details :</div>

        {Detail.edit[2] ? 
          <div className='flex flex-col gap-2 '>
            
            <div className='w-full'>
            <TextInput
              className='w-96'
              leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
              label="Your Address"
              withAsterisk
              placeholder="Address"
              value={`${Detail.address.home}`}
              onChange={(e) => Detail.handleAddressChange("home", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="Your City"
              leftSection={<IconBuildings style={{ width: rem(16), height: rem(16) }} />}
              withAsterisk
              placeholder="City"
              value={`${Detail.address.city}`}
              onChange={(e) => Detail.handleAddressChange("city", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="Your PinCode"
              leftSection={<IconMapPinCode style={{ width: rem(16), height: rem(16) }} />}
              withAsterisk
              placeholder="PinCode"
              value={`${Detail.address.pin}`}
              onChange={(e) => Detail.handleAddressChange("pin", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="Your Country"
              leftSection={<IconFlag style={{ width: rem(16), height: rem(16) }} />}
              withAsterisk
              placeholder="Country"
              value={`${Detail.address.country}`}
              onChange={(e) => Detail.handleAddressChange("country", e.target.value)}
            />
            </div>

          </div> :  <>
            <div className='flex gap-16 text-2xl'>
              <div className='w-32'>Address:</div>
              <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
              <IconHome stroke={2} />
              { Detail.address.home }</div>
              </div>
       

        <div className='flex gap-16 text-2xl'>
            <div className='w-32'>City:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
            <IconBuildings  stroke={2} />
            { Detail.address.city }</div>
        </div>

        <div className='flex gap-16 text-2xl'>
            <div className='w-32'>Pin Code:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
            <IconMapPinCode stroke={2} />
            {Detail.address.pin} </div>
        </div>

        <div className='flex gap-16 text-2xl'>
            <div className='w-32'>Country:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
            <IconFlag stroke={2} />
            {Detail.address.country} </div>
        </div>
        </>
}
</div>

   <ActionIcon variant="subtle" color="yellow" aria-label="Settings" size='xl' onClick={() => Detail.handleClick(2)}>
          { Detail.edit[2] ? <div onClick={() => Detail.saveProfile()}>Save</div>  :  < IconPencil stroke={2} /> }
          </ActionIcon> 
          
    </div>



    <Divider mx="md" my='xl' />

    <div className='px-8 w-full flex justify-between'>
        <div className='flex flex-col gap-4'>
   
        <div className='text-4xl mb-4 font-semibold text-bright-sun-400'>Upcoming Bookings :</div>

        <div className='text-2xl'>No Booking Schedule</div> 

    
        </div>
    
        </div>

        <Divider mx="md" my='xl' />

<div className='px-8 w-full flex justify-between'>
    <div className='flex flex-col gap-4'>

    <div className='text-4xl mb-4 font-semibold text-bright-sun-400'>Discount Coupons :</div>

    <div className='text-2xl'>No Coupons you have</div> 


    </div>

    </div>

        <Divider mx="md" my='xl' />

    <div className='px-8 w-full flex justify-between'>
        <div className='flex flex-col gap-4'>
   
        <div className='text-4xl mb-4 font-semibold text-bright-sun-400'>Your Reviews :</div>

        <div className='text-2xl'>No Reviews Yet</div> 

    
        </div>
    
        </div>

        </div>

         <Footer></Footer>
</div>

}

export default CustomerProfile;