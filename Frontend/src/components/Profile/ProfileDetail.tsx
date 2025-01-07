
import { IconPhone, IconHome, IconBuildings, IconFlag, IconMapPinCode, IconCreditCardPay , IconCalendarMonth, IconUser  } from '@tabler/icons-react';
import { IconMail } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { Divider } from '@mantine/core';
import { useState } from 'react'

import { TextInput, rem  } from '@mantine/core';

const ProfileDetail = () => {

  const [edit, setEdit] = useState([false,false,false,false]);

  const [basic , setBasic] = useState({
    name: 'Ritik Jain',
    about: 'Your comfort, our commitment! We are here to serve you better every day.'
  })

  const [contact , setContact] = useState({
    email: 'ritikjain590@gmail.com',
    phone: '7836086508'
  })

  const [address , setAddress] = useState({
    home: 'B/22 Street No - 7 New Modern Shahdara',
    city: 'New Delhi',
    pin: '110032',
    country: 'India'
  })

  const [payment , setPayment] = useState({
    number: '0000 0000 0000 0000',
    date: '09/29',
    cvv: '8 1 2',
    name: 'Ritik Jain'
  })


  const handleBasicChange = (field: string, value: string) => {
    setBasic((prev) => ({
      ...prev, 
      [field]: value, 
    }));
  };

  const handleContactChange = (field: string, value: string) => {
   
    setContact((prev) => ({
      ...prev, 
      [field]: value, 
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
   
    setAddress((prev) => ({
      ...prev, 
      [field]: value, 
    }));
  };

  const handlePaymentChange = (field: string, value: string) => {
   
    setPayment((prev) => ({
      ...prev, 
      [field]: value, 
    }));
  };

  const handleClick = (index: number) => {
    const newEdit = [...edit]; 
    newEdit[index] = !newEdit[index]; 
    setEdit(newEdit); 
    
  }

    return  <div>

      {/* Basic Detail */}

        <div className="mt-28 px-8 w-full flex justify-between">

          {edit[0] ? 
          <div className='flex flex-col gap-2 '>
            
            <div className='w-full'>
            <TextInput
              className='w-96'
              leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
              label="Full Name"
              withAsterisk
              placeholder="Name"
              value={`${basic.name}`}
              onChange={(e) => handleBasicChange("name", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="About"
              withAsterisk
              placeholder="Tell us About Yourself"
              value={`${basic.about}`}
              onChange={(e) => handleBasicChange("about", e.target.value)}
            />
            </div>

          </div> :  
          <div className=" flex flex-col gap-2">

        <div className="text-5xl font-semibold items-center flex hover:text-bright-sun-400 transition-all duration-300">
        { basic.name }
        </div>

        <div className='text-xl text-mine-shaft-500'>
        { basic.about }
        </div>

</div>
}
  
           <ActionIcon variant="subtle" color="yellow" aria-label="Settings" size='xl' onClick={() => handleClick(0)}>
            
            { edit[0] ? <div>Save</div>  : <  IconPencil stroke={2} /> }
            </ActionIcon> 
    </div>

    <Divider mx="md" my='xl' />

    {/* Contact Details */}

    <div className='px-8 w-full flex justify-between'>
        <div className='flex flex-col gap-4'>
   
        <div className='text-4xl mb-4 font-semibold text-bright-sun-400'>Contact Details :</div>

            
        { edit[1] ? 
          <div className='flex flex-col gap-2 '>
            
            <div className='w-full'>
            <TextInput
              className='w-96'
              leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}
              label="Your Email"
              withAsterisk
              placeholder="Email"
              value={`${contact.email}`}
              onChange={(e) => handleContactChange("email", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="Mobile No"
              leftSection={<IconPhone style={{ width: rem(16), height: rem(16) }} />}
              withAsterisk
              placeholder="Mobile"
              value={`${contact.phone}`}
              onChange={(e) => handleContactChange("phone", e.target.value)}
            />
            </div>

          </div> : 
            <div>
            <div className='flex gap-16 text-2xl'>
              <div className='w-32'>Email:</div>
              <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center ">
              <div><IconMail stroke={2} /></div>
              {contact.email}</div>
              </div>


            <div className='flex gap-16  text-2xl'>
            <div className='w-32'>Mobile:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-cente  ">
            <IconPhone stroke={2} />
            {contact.phone}</div>
        </div>
        </div>
}
</div>

   <ActionIcon variant="subtle" color="yellow" aria-label="Settings" size='xl'  onClick={() => handleClick(1)}>
              { edit[1] ? <div>Save</div>  : < IconPencil stroke={2} /> }
          </ActionIcon> 

    </div>

    <Divider mx="md" my='xl' />

    {/* Address Details */}

    <div className='px-8 w-full flex justify-between'>
        <div className='flex flex-col gap-4'>
   
        <div className='text-4xl mb-4 font-semibold text-bright-sun-400'>Address Details :</div>

        {edit[2] ? 
          <div className='flex flex-col gap-2 '>
            
            <div className='w-full'>
            <TextInput
              className='w-96'
              leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
              label="Your Address"
              withAsterisk
              placeholder="Address"
              value={`${address.home}`}
              onChange={(e) => handleAddressChange("home", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="Your City"
              leftSection={<IconBuildings style={{ width: rem(16), height: rem(16) }} />}
              withAsterisk
              placeholder="City"
              value={`${address.city}`}
              onChange={(e) => handleAddressChange("city", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="Your PinCode"
              leftSection={<IconMapPinCode style={{ width: rem(16), height: rem(16) }} />}
              withAsterisk
              placeholder="PinCode"
              value={`${address.pin}`}
              onChange={(e) => handleAddressChange("pin", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="Your Country"
              leftSection={<IconFlag style={{ width: rem(16), height: rem(16) }} />}
              withAsterisk
              placeholder="Country"
              value={`${address.country}`}
              onChange={(e) => handleAddressChange("country", e.target.value)}
            />
            </div>

          </div> :  <>
            <div className='flex gap-16 text-2xl'>
              <div className='w-32'>Address:</div>
              <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
              <IconHome stroke={2} />
              { address.home }</div>
              </div>
       

        <div className='flex gap-16 text-2xl'>
            <div className='w-32'>City:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
            <IconBuildings  stroke={2} />
            { address.city }</div>
        </div>

        <div className='flex gap-16 text-2xl'>
            <div className='w-32'>Pin Code:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
            <IconMapPinCode stroke={2} />
            {address.pin} </div>
        </div>

        <div className='flex gap-16 text-2xl'>
            <div className='w-32'>Country:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
            <IconFlag stroke={2} />
            {address.country} </div>
        </div>
        </>
}
</div>

   <ActionIcon variant="subtle" color="yellow" aria-label="Settings" size='xl' onClick={() => handleClick(2)}>
          { edit[2] ? <div>Save</div>  :  < IconPencil stroke={2} /> }
          </ActionIcon> 
          
    </div>


    <Divider mx="md" my='xl' />

    {/* Payment Details */}

    <div className='px-8 w-full flex justify-between'>
        <div className='flex flex-col gap-4'>
   
        <div className='text-4xl mb-4 font-semibold text-bright-sun-400'>Payment Details :</div>

        {edit[3] ? 
          <div className='flex flex-col gap-2 '>
            
            <div className='w-full'>
            <TextInput
              className='w-96'
              leftSection={<IconCreditCardPay style={{ width: rem(16), height: rem(16) }} />}
              label="Card Number"
              withAsterisk
              placeholder="Card Number"
              value={`${payment.number}`}
              onChange={(e) => handlePaymentChange("number", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="Expiry Date MM/YY"
              leftSection={<IconCalendarMonth style={{ width: rem(16), height: rem(16) }} />}
              withAsterisk
              placeholder="MM/YY"
              value={`${payment.date}`}
              onChange={(e) => handlePaymentChange("date", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="CVV"
              leftSection={<IconMapPinCode style={{ width: rem(16), height: rem(16) }} />}
              withAsterisk
              placeholder="CVV"
              value={`${payment.cvv}`}
              onChange={(e) => handlePaymentChange("cvv", e.target.value)}
            />
            </div>

            <div>
            <TextInput
              label="Your Name"
              leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
              withAsterisk
              placeholder="Name"
              value={`${payment.name}`}
              onChange={(e) => handlePaymentChange("name", e.target.value)}
            />
            </div>

          </div> :
          <>
            <div className='flex gap-16 text-2xl'>
              <div className='w-32'>Card No:</div>
              <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
              < IconCreditCardPay stroke={2} />
              {payment.number}</div>
              </div>


       

        <div className='flex gap-16 text-2xl'>
            <div className='w-32'>Date </div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
            <IconCalendarMonth  stroke={2} />
            {payment.date} </div>
        </div>

        <div className='flex gap-16 text-2xl'>
            <div className='w-32'>CVV:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
            <IconMapPinCode stroke={2} />
            {payment.cvv} </div>
        </div>

        <div className='flex gap-16 text-2xl'>
            <div className='w-32'>Name:</div>
            <div className="text flex gap-2 text-mine-shaft-400 hover:text-bright-sun-400  transition-all duration-300 items-center justify-center">
            <IconUser stroke={2} />
            {payment.name} </div>
        </div>
        </>
}
</div>

   <ActionIcon variant="subtle" color="yellow" aria-label="Settings" size='xl' onClick={() => handleClick(3)} >
            { edit[3] ? <div>Save</div>  : < IconPencil stroke={2} />}   
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

}

export default ProfileDetail;