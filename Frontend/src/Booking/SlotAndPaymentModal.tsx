import { Modal, Button,  Radio,Group  } from '@mantine/core';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DateInput } from '@mantine/dates';
import { useCart } from '../Context/CartContext';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';



interface SlotAndPaymentProps {
  opened: boolean;
  close: () => void;
  total: number;
}



const SlotAndPaymentModal: React.FC<SlotAndPaymentProps> = ({ opened, close, total }) => {

  const [selectedDate, setSelecteddate] = useState<{ [key: number]: Date | null }>({})
  const [paymentMode, setPaymentMode] = useState<'online' | 'offline' | ''>('');

  const { cart } = useCart()

  const handlePayment = () => {
    const allDatesSelected = cart.every((service) => selectedDate[service.id] !== undefined && selectedDate[service.id] !== null);

    if (!allDatesSelected) {
      alert('Please select a date for all services before confirming the booking.');
      return;
    }

    if (paymentMode === 'online') {
      alert('Redirecting to online payment...');
    } else if(paymentMode === 'offline') {
      
      alert('Booking confirmed! Pay at the time of service.');
      close();
    }
    else {
      alert('Please Choose a Payment Mode')
    }
    
  };

  const handleDateChange = (serviceId: number, date: Date | null) => {
    setSelecteddate((prev) => ({
      ...prev,
      [serviceId]: date,
    }));
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <div className='flex flex-col gap-3'>
        <div className='text-bright-sun-400 text-3xl font-bold text-center mb-2'>Select Slot & Payment</div>

        {cart.map((service) => <div className='flex justify-between items-center mb-4'>
          <div key={service.id} className='text-xl font-semibold text-mine-shaft-300'>{service.name}</div>
          <div> <DateInput
             minDate={new Date()}
             maxDate={dayjs(new Date()).add(2, 'month').toDate()}
             value={selectedDate[service.id] || null}
             onChange={(date) => handleDateChange(service.id, date)}
             withAsterisk
              valueFormat="DD/MM/YYYY"
              label="Select a Date"
               placeholder="Date"
           /></div>
          </div>)}

        
        {/* Payment Mode Selection */}
      
        <Radio.Group 
        label="Select Payment Mode" 
        withAsterisk
         size='md'
          value={paymentMode} 
          onChange={(value: string) => setPaymentMode(value as "online" | "offline" | "")}  >
             <Group mt="md" gap={96}>
             <Radio value="offline" size='md' label="Pay in Cash" />
             <Radio value="online" size='md' label="Pay Online" />
             </Group>
     
        </Radio.Group>
      
       

        {/* Confirm Payment Button */}
        <Button className='mt-2' fullWidth size='md' variant="filled" color="lime" onClick={handlePayment}>
          Confirm Booking &#8377;{total}
        </Button>
      </div>
    </Modal>
  );
};


export default SlotAndPaymentModal