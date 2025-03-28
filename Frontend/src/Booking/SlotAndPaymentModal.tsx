import { Modal, Button,  Radio,Group  } from '@mantine/core';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DateInput } from '@mantine/dates';
import { useCart } from '../Context/CartContext';
import { useProfile } from '../Context/ProfileContext';
import axios from 'axios';
import { Loader } from '@mantine/core';


import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

interface SlotAndPaymentProps {
  opened: boolean;
  closeCheckOut: () => void;
  close: () => void;
}

const SlotAndPaymentModal: React.FC<SlotAndPaymentProps> = ({ opened, close, closeCheckOut}) => {

  const [selectedDate, setSelecteddate] = useState<{ [key: number]: Date | null }>({})
  const [paymentMode, setPaymentMode] = useState<'Online' | 'COD' |'Wallet' | ''>('');
  const [loader, setLoader] = useState(false);
  const { cart,total,gst,discount, BookServices, setLoading } = useCart()
  const {basic, contact, walletAmount, fetchProfile} = useProfile()
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
          name: basic?.name || "User Name",
          email: contact?.email || "user@example.com",
          contact: contact?.phone || "0000000000",
        },
        theme: {
          color: "#F37254",
        },
      
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();


      rzp.on("payment.failed", function (response: any) {
      console.error("Payment Failed:", response.error);
     alert("Payment Failed. Try Again.");
});

    } catch (error) {
      console.error("Payment error:", error);
      alert("Error in processing payment");
    }
  };

  const handleWalletPayment = async() => {
    try {
      setLoader(true)
      await axios.put(
        "http://localhost:3000/customerprofile/walletOrder",
        { Grandtotal: (total + gst - discount) },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      await BookServices(paymentMode,selectedDate)
      close(); 
    }catch(error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  }

  const handlePayment = async() => {
    const allDatesSelected = cart.every((service) => selectedDate[service.id] !== undefined && selectedDate[service.id] !== null);

    if (!allDatesSelected) {
      alert('Please select a date for all services before confirming the booking.');
      return;
    }

    if (paymentMode === 'Online') {
      alert('Redirecting to online payment...');
      setLoading(true)
      await handleOnlinePayment()
      setTimeout(() => {
        closeCheckOut(); 
      }, 300); 
    
    } else if(paymentMode === 'COD') {
      setLoading(true)
      BookServices(paymentMode,selectedDate) 
      close();
      setTimeout(() => {
        closeCheckOut(); 
      }, 300); 
    }
    else if(paymentMode === 'Wallet'){
      if((total + gst - discount) > walletAmount) {
        alert('Insufficient Balance')
        return
      }
      setLoading(true)
      await handleWalletPayment()
      setTimeout(() => {
        closeCheckOut(); 
      }, 300); 
    }
    else {
      alert('Please Choose a Payment Mode')
    }
    setLoading(false)
    fetchProfile()
    
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
        <div className='text-bright-sun-400 text-2xl sm:text-3xl font-bold text-center mb-2'>Select Slot & Payment</div>

        {cart.map((service) => <div key={service.id} className='flex flex-col gap-2 xs:flex-row xs:justify-between xs:items-center mb-4'>
          <div className='text-lg sm:text-xl font-semibold text-mine-shaft-300'>{service.name}</div>
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
          onChange={(value: string) => setPaymentMode(value as "Online" | "COD" | "Wallet" | "")}  >
             <Group  mt="md" gap={16}>
             <Radio value="COD" size='md' label="Pay By Cash" />
             <Radio value="Wallet" size='md' label="Pay By Wallet " />
             <Radio value="Online" size='md' label="Pay Online" />
            
             </Group>
     
        </Radio.Group>
      
       

        {/* Confirm Payment Button */}
        <Button className='mt-2' fullWidth size='md' variant="filled" color="lime" onClick={handlePayment}>
          Confirm Booking &#8377;{total + gst - discount}
        </Button>
      </div>

      {loader && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-[9999]">
    <Loader color="blue" size="xl" />
     </div>
      )}

    </Modal>
  );
};


export default SlotAndPaymentModal