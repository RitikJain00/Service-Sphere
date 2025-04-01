import { useState } from 'react'

import { IconPhone, IconHome, IconBuildings, IconFlag, IconMapPinCode, IconUser, IconMail,IconPencil,IconArrowLeft  } from '@tabler/icons-react';

import { ActionIcon, Divider,  Button, TextInput, rem, Indicator, Avatar, FileInput   } from '@mantine/core';
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





    const handleFileChange = async (file: File | null) => {
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file); // 🔥 Ensure the field name is exactly 'image'
      formData.append("type", 'Professional');
      try {
        const { data } = await axios.post('http://localhost:3000/uploadImage/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("authToken")}` },
          
        });
        Detail.fetchProfile()
        console.log("Uploaded Image URL:", data.imageUrl);
      } catch (err) {
        console.error('Error uploading image', err);
      }
    };
    
    
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

<div className="xs-mx:mx-2 md-mx:mx-8 lg-mx:mx-16 xl-mx:mx-24 mx-32">
      
      {/*   Image Section */}

        <div  className="w-full relative">
          <img className='rounded-t-2xl w-full ' src="/Profile/ServiceSphereBanner.png" alt="" />

          <div className='absolute left-3 -bottom-1/3 sm-mx:-bottom-1/4 xs-mx:-bottom-1/5 xsm-mx:-bottom-1/6 '>
          <Indicator className='[&_.mantine-Indicator-indicator]:!border-4 [&_img]:hover:opacity-80' inline autoContrast size={45} offset={30} label={<IconPencil className='w-4/5 h-4/5 [&_img]:hover:opacity-80' />} position="bottom-end" color="bright-sun.4" withBorder>
          <Avatar
          className='
            !w-48 !h-48 
            md-mx:!w-40 md-mx:!h-40 
            sm-mx:!w-32 sm-mx:!h-32 
            xs-mx:!w-28 xs-mx:!h-28 
            xsm-mx:!w-24 xsm-mx:!h-24,
            border-mine-shaft-900 border-8 rounded-full
          '
          src={Detail.image || "Model/user.png"}
          alt=''
        />

            <FileInput
              className='absolute bottom-2 right-2 z-[201] w-12 [&-div]:text-transparent'
              size='lg'
              radius={'xl'}
              accept="image/png,image/jpeg"
              variant="unstyled"
              onChange={handleFileChange}
            />
    </Indicator>
          </div>
        </div>

      {/* Basic Detail */}
      <div className="xs-mx:mt-12 sm-mx:mt-20 md-mx:mt-28 xl-mx:mt-36 mt-40  md:px-8 w-full flex justify-between">

          {Detail.edit[0] ? 
          <div className='flex flex-col gap-2 '>
            
            <div className='w-full'>
            <TextInput
              className='w-96 xs-mx:w-72'
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
         <div className=" flex flex-col md-mx:px-8 gap-2">

        <div className="xs-mx:text-3xl md-mx:text-4xl text-5xl font-semibold items-center flex hover:text-bright-sun-400 transition-all duration-300">
        { Detail.basic.name }
        </div>

        <div className='md-mx:text-lg text-xl text-mine-shaft-500'>
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

    <div className='px-8 md-mx:px-2 w-full flex justify-between'>
        <div className='flex flex-col gap-4'>
   
        <div className='xs-mx:text-2xl  md-mx:text-3xl text-4xl mb-4 font-semibold text-bright-sun-400'>Contact Details :</div>

            
        { Detail.edit[1] ? 
          <div className='flex flex-col gap-2 '>
            
            <div className='w-full'>
            <TextInput
              className='w-96 xs-mx:w-72'
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
            <div className="flex flex-col md-mx:px-4">
            <div className="flex xs-mx:flex-col justify-between gap-12 xs-mx:gap-2 bs-mx:gap-6">
            <div className='flex sm-mx:flex-col justify-center item-center gap-16 bs-mx:gap-8 sm-mx:gap-2  bs-mx:text-xl xs-mx:text-base  text-2xl '>
              <div className='w-32 md-mx:w-16 '>Email:</div>
              <div  className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center ">
              <div><IconMail stroke={2} /></div>
              {Detail.contact.email}</div>
              </div>
              {Detail.verify.email===false && Detail.contact.email !== '' && 
              <Button variant="light" color="orange"  onClick={() => { 
                handleSendOTP("Email")
              }}>Verify </Button>}
              </div>

            <div className="flex xs-mx:flex-col justify-between mt-4 xs-mx:gap-2">
            <div  className='flex sm-mx:flex-col gap-16 bs-mx:gap-8 sm-mx:gap-2  bs-mx:text-xl xs-mx:text-base text-2xl'>
            <div  className='w-32 md-mx:w-16 '>Mobile:</div>
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

    <div className='px-8 md-mx:px-2 w-full flex justify-between'>
        <div className='flex flex-col gap-4'>
   
        <div className='xs-mx:text-2xl  md-mx:text-3xl text-4xl mb-4 font-semibold text-bright-sun-400'>Address Details :</div>

        {Detail.edit[2] ? 
          <div className='flex flex-col gap-2 '>
            
            <div className='w-full'>
            <TextInput
              className='w-96 xs-mx:w-72'
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

          </div> :   <>
            <div className='flex gap-16 sm-mx:text-lg bs-mx:text-xl text-2xl'>
              <div className='w-32 shrink-0 '>Address:</div>
              <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
              <IconHome style={{ minWidth: "24px", minHeight: "24px" }} stroke={2} />
              { Detail.address.home }</div>
              </div>
       

        <div className='flex gap-16 sm-mx:text-lg bs-mx:text-xl text-2xl'>
            <div className='w-32'>City:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
            <IconBuildings  stroke={2} />
            { Detail.address.city }</div>
        </div>

        <div className='flex gap-16 sm-mx:text-lg bs-mx:text-xl text-2xl'>
            <div className='w-32'>Pin Code:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
            <IconMapPinCode stroke={2} />
            {Detail.address.pin} </div>
        </div>

        <div className='flex gap-16 sm-mx:text-lg bs-mx:text-xl text-2xl'>
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