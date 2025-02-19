import { Modal, Button,  Radio,Group  } from '@mantine/core';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DateInput } from '@mantine/dates';
import { useCart } from '../Context/CartContext';
import { useProfile } from '../Context/ProfileContext';
import axios from 'axios';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

interface SlotAndPaymentProps {
  opened: boolean;
  close: () => void;
}

const SlotAndPaymentModal: React.FC<SlotAndPaymentProps> = ({ opened, close}) => {

  const [selectedDate, setSelecteddate] = useState<{ [key: number]: Date | null }>({})
  const [paymentMode, setPaymentMode] = useState<'online' | 'offline' | ''>('');
  const { cart,total,gst,discount, BookServices } = useCart()
  const {basic, contact} = useProfile()
  const token = localStorage.getItem('authToken')


  const handleOnlinePayment = async () => {
    try {
      // Get Razorpay key
      const { data } = await axios.get("http://localhost:3000/payment/getKey");
      const key = data.key;
     

      // Create an order in the backend
      const { data: orderData } = await axios.post(
        "http://localhost:3000/payment/process",
        { Grandtotal: total + gst - discount },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );


      if (!orderData.success) {
        alert("Failed to create payment order");
        return;
      }

      const { order } = orderData;
      console.log(order)

      // Configure Razorpay payment
      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "Service Sphere",
        description: "Service Payment",
        order_id: order.id, 
        handler: function (response: any) {
          alert("Payment Successful! Transaction ID: " + response.razorpay_payment_id);
          BookServices(paymentMode, selectedDate);
          close();
        },
        prefill: {
          name: basic.name,
          email: contact.email,
          contact: contact.phone,
        },
        theme: {
          color: "#F37254",
        },
      
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error in processing payment");
    }
  };

  const handlePayment = async() => {
    const allDatesSelected = cart.every((service) => selectedDate[service.id] !== undefined && selectedDate[service.id] !== null);

    if (!allDatesSelected) {
      alert('Please select a date for all services before confirming the booking.');
      return;
    }

    if (paymentMode === 'online') {
      alert('Redirecting to online payment...');
      handleOnlinePayment()
    } else if(paymentMode === 'offline') {
      BookServices(paymentMode,selectedDate,) 
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

        {cart.map((service) => <div key={service.id} className='flex justify-between items-center mb-4'>
          <div className='text-xl font-semibold text-mine-shaft-300'>{service.name}</div>
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