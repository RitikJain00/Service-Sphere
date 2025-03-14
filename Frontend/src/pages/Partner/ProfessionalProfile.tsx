import { useState } from 'react'

import { IconPhone, IconHome, IconBuildings, IconFlag, IconMapPinCode, IconUser, IconMail,IconPencil,IconArrowLeft  } from '@tabler/icons-react';

import { ActionIcon, Divider,  Button, TextInput, rem  } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";

import { useProfile } from '../../Context/ProfileContext';
import { useCart } from '../../Context/CartContext';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import VerifyOTP from "../../components/Verification/VerifyOTP";

const ProfessionalProfile = () => {

    const Detail = useProfile();
    const navigate = useNavigate();

    const [verifyOpened, { open: openVerify, close: closeVerify }] = useDisclosure(false);
    const [verificationType, setVerificationType] = useState(""); // "email" or "phone"
    const {setLoading} = useCart();

    
  const handleSendOTP = async (verify: string) => {
    const token = localStorage.getItem('authToken')
    setVerificationType(verify)
    try {
      setLoading(true)
      await axios.post(
        "http://localhost:3000/professionalsign/sendOtp",
        { emailOrphone: verify },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      alert(`OTP send to your ${verify}`)
      openVerify(); 
    }catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


    return  <div className="min-h-[100vh] font-['poppins'] bg-mine-shaft-950 ">

<Button className='!absolute m-4 z-10' variant="light" color="yellow" onClick={() => navigate('/Dashboard')} leftSection={<IconArrowLeft size={14} />}> Back </Button>

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
        {Detail.errorBasic && <div className="text-red-500 text-sm text-center">{Detail.errorBasic}</div>}
</div>
}
  
           <ActionIcon variant="subtle" color="yellow" aria-label="Settings" size='xl' onClick={() => Detail.handleClick(0)}>
            
            { Detail.edit[0] ? <div onClick={() => Detail.saveProfile(0)}>Save</div>  : <  IconPencil stroke={2} /> }
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
              disabled
              leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}
              label="Your Email"
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
            <div className="flex justify-between gap-12">
            <div className='flex gap-16 text-2xl'>
              <div className='w-32'>Email:</div>
              <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center ">
              <div><IconMail stroke={2} /></div>
              {Detail.contact.email}</div>
              </div>
              {Detail.verify.email===false && Detail.contact.email !== '' && 
              <Button variant="light" color="orange"  onClick={() => { 
                handleSendOTP("Email")
              }}>Verify </Button>}
              </div>

            <div className="flex justify-between mt-4">
            <div className='flex gap-16  text-2xl'>
            <div className='w-32'>Mobile:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-cente  ">
            <IconPhone stroke={2} />
            {Detail.contact.phone}</div>
        </div>
        {Detail.verify.phone===false &&Detail.contact.phone !== '' && 
            <Button variant="light" color="orange" onClick={() => { 
              handleSendOTP("Phone")
            }}>Verify</Button>}

        </div>
        {Detail.errorContact && <div className="text-red-500 text-sm text-center mt-4">{Detail.errorContact}</div>}
        </div>
        
}
</div>

   <ActionIcon variant="subtle" color="yellow" aria-label="Settings" size='xl'  onClick={() => Detail.handleClick(1)}>
              { Detail.edit[1] ? <div onClick={() => Detail.saveProfile(1)}>Save</div>  : < IconPencil stroke={2} /> }
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
        {Detail.errorAddress && <div className="text-red-500 text-sm text-center">{Detail.errorAddress}</div>}
        </>
}
</div>

   <ActionIcon variant="subtle" color="yellow" aria-label="Settings" size='xl' onClick={() => Detail.handleClick(2)}>
          { Detail.edit[2] ? <div onClick={() => Detail.saveProfile(2)} >Save</div>  :  < IconPencil stroke={2} /> }
          </ActionIcon> 
          
    </div>

    
    {<VerifyOTP opened={verifyOpened} close={closeVerify} type={verificationType} email={Detail.contact.email} closeAllModals={close} user={'Professional'}/>}

    </div>

       
</div>

}

export default ProfessionalProfile;