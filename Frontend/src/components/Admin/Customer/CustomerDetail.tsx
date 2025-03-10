
import { Modal, TextInput, Textarea} from '@mantine/core';
import {  IconMail, IconPhone , IconMapPin } from '@tabler/icons-react';


interface CheckOutProps {
  opened: boolean; // Whether the modal is open
  close: () => void; // Function to close the modal
  booking?: any;
}



const CustomerDetails: React.FC<CheckOutProps>  = ({ opened, close, booking }) => {


  return <>
  <div className='flex'>
  <Modal opened={opened} onClose={close}  centered>
    <div className='flex flex-col gap-3'>
      <div className='text-bright-sun-400 text-3xl font-bold text-center mb-2'>
     Customer Details
      </div>

          <div className='mt-8 w-24 h-24  mx-auto'>
            <img src="/Model/user.png" alt="" />
          </div>
     
              <div className="flex flex-col gap-2 mt-2">
                   <label className="text-mine-shaft-100" htmlFor="name">Customer Email <span className='text-red-500'>*</span></label>
                   <TextInput
                      leftSectionPointerEvents="none"
                      leftSection={<IconMail stroke={2} />}
                      color='mine-shaft.3'
                      placeholder="Email"
                      name='name'
                      value={booking.username}
                      disabled
                       />
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                   <label className="text-mine-shaft-100" htmlFor="name">Customer Phone <span className='text-red-500'>*</span></label>
                   <TextInput
                      leftSectionPointerEvents="none"
                      leftSection={<IconPhone  stroke={2} />}
                      color='mine-shaft.3'
                      placeholder="Phone"
                      name='description'
                      disabled
                      value={booking.profile.phone}
                    
                       />
                   
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                   <label className="text-mine-shaft-100" htmlFor="name">Customer Address <span className='text-red-500'>*</span></label>
                   <Textarea
                      leftSectionPointerEvents="none"
                      leftSection={<IconMapPin  stroke={2} />}
                      autosize
                      minRows={4}
                      disabled
                      color='mine-shaft.3'
                      placeholder="Description"
                      name='description'
                      value={'Address:-     ' + booking.profile.address + '\n' + 'City:-            ' +  booking.profile.city + '\n' + 'PinCode:-    ' +  booking.profile.pincode + '\n' + 'Country:-     ' +   booking.profile.country}

                       />
                   
                    </div>

              

    </div>
    </Modal>

  </div>

  </>
}

export default CustomerDetails