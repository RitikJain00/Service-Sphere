
import { Modal, Button,TextInput} from '@mantine/core';
import { useProfile } from '../Context/ProfileContext';
import { IconUserCircle, IconMail,  IconPhone, IconHome, IconBuildings, IconFlag, IconMapPinCode,  } from '@tabler/icons-react';

import SlotAndPaymentModal from './SlotAndPaymentModal';
import { useState } from 'react';

interface CheckOutProps {
  opened: boolean; // Whether the modal is open
  close: () => void; // Function to close the modal
}

const CheckOut: React.FC<CheckOutProps> = ({ opened, close}) => {
 
  const Detail = useProfile();

  const [slotModalOpen, setSlotModalOpen] = useState(false);
  const [error, setError] = useState<string | null>('Check Your Details');

  const handleClick = () => {

   if(Detail.contact.phone === null){
      setError('Update Your Phone No in Profile First')
   } 
   else if( Detail.address.home === null || Detail.address.city === null || Detail.address.pin === null || Detail.address.country === null){
      setError('Update Your Address in Profile First')
   }
   else setSlotModalOpen(true)
  }
  

  return (
 

    <>
    <div className='flex'>
    <Modal opened={opened} onClose={close}  centered>
      <div className='flex flex-col gap-2'>
        <div className='text-bright-sun-400 text-3xl font-bold text-center '>Check Out</div>
        {error && <div className="text-red-500 text-sm text-center ">{error}</div>}    
       
                <div className="flex flex-col gap-2 mt-2">
                     <label className="text-mine-shaft-100" htmlFor="name">Your Name <span className='text-red-500'>*</span></label>
                     <TextInput
                        leftSectionPointerEvents="none"
                        leftSection={<IconUserCircle stroke={2} />}
                        color='mine-shaft.3'
                        disabled
                        placeholder="Your Name"
                        value={Detail.basic.name}
                       
                        
                         />
                     
                      </div>

                      <div className="flex flex-col gap-2 mt-2">
                     <label className="text-mine-shaft-100" htmlFor="name">Your Email <span className='text-red-500'>*</span></label>
                     <TextInput
                        leftSectionPointerEvents="none"
                        leftSection={<IconMail stroke={2} />}
                        color='mine-shaft.3'
                        disabled
                        placeholder="Your Name"
                        value={Detail.contact.email}
                      
                         />
                     
                      </div>

                      <div className="flex flex-col gap-2 mt-2">
                     <label className="text-mine-shaft-100" htmlFor="name">Your Phone <span className='text-red-500'>*</span></label>
                     <TextInput
                        leftSectionPointerEvents="none"
                        leftSection={< IconPhone stroke={2} />}
                        color='mine-shaft.3'
                        disabled
                        placeholder="Your Name"
                        value={Detail.contact.phone}
                     
                         />
                     
                      </div>

                      <div className="flex flex-col gap-1 mt-2">
                     <label className="text-mine-shaft-100" htmlFor="name">Your Address <span className='text-red-500'>*</span></label>
                     <TextInput
                        leftSectionPointerEvents="none"
                        leftSection={< IconHome stroke={2} />}
                        color='mine-shaft.3'
                        disabled
                        placeholder="Your Name"
                        value={Detail.address.home}
                      
                         />
                
                 
                     <TextInput
                        leftSectionPointerEvents="none"
                        leftSection={< IconBuildings stroke={2} />}
                        color='mine-shaft.3'
                        disabled
                        placeholder="Your Name"
                        value={Detail.address.city}
                      
                         />
                     
                     
                 
                     <TextInput
                        leftSectionPointerEvents="none"
                        leftSection={< IconMapPinCode stroke={2} />}
                        color='mine-shaft.3'
                        disabled
                        placeholder="Your Name"
                        value={Detail.address.pin}
                       
                         />
                     
                     
                    
                     <TextInput
                        leftSectionPointerEvents="none"
                        leftSection={< IconFlag stroke={2} />}
                        color='mine-shaft.3'
                        disabled
                        placeholder="Your Name"
                        value={Detail.address.country}
                       
                         />
                     
                      </div>
                    

                       <div className='w-full  mt-4'>

                        <Button  fullWidth  size='md'variant="filled" color="lime" 
                         onClick={handleClick}>
                        <span className='text-xl font-bold'>Book Slot</span>
                     </Button>
                  </div>

      </div>
      </Modal>

      {slotModalOpen && <SlotAndPaymentModal opened={slotModalOpen} close={() => setSlotModalOpen(false)}  />}
  
    </div>
      

     
    </>
  );
}

export default CheckOut