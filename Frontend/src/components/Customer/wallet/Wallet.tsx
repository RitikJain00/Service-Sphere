import React, { useState } from 'react'
import { Modal, TextInput, Button} from '@mantine/core';
import { IconCurrencyRupee } from '@tabler/icons-react';

import { useProfile } from '../../../Context/ProfileContext';
import { useCart } from '../../../Context/CartContext';

import axios from 'axios';

interface WalletProps {
  opened: boolean; // Whether the modal is open
  close: () => void; // Function to close the modal

}


const Wallet: React.FC<WalletProps> = ({ opened, close}) => {

  const [amount , setAmount] = useState(0);
  const [error , setError] = useState<string | null>(null)
  const {basic, contact, handleWalletMoney} = useProfile()
  const token = localStorage.getItem('authToken')
  const {  setLoading,loading } = useCart()

  const handleAmountChange = (e: any) => {
    setError(null);
    setAmount(e.target.value);
    
  }

  const handleWalletRecharge = async () => {
    if(!amount || amount <= 0 || isNaN(amount) ) {
      setError('Enter valid Amount');
      return
    }

    try {
      // Get Razorpay key
      setLoading(true)
      const { data } = await axios.get("https://service-sphere-j7vd.onrender.com/payment/getKey");
      const key = data.key;
     

      // Create an order in the backend
      const { data: orderData } = await axios.post(
        "https://service-sphere-j7vd.onrender.com/payment/process",
        { Grandtotal: amount },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );


      if (!orderData.success) {
        alert("Failed to create payment order");
        return;
      }

      const { order } = orderData;
    

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
          handleWalletMoney(amount)
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
    } finally{
      setLoading(false)
    }
  };

  return (

      <Modal opened={opened} onClose={close}  centered>

    <div className='flex flex-col gap-4'>
      <div className='text-bright-sun-400 text-3xl font-bold text-center mb-2'>
    Add Money
      </div>
     
              <div className="flex flex-col gap-2 mt-2">
                   <label className="text-mine-shaft-100" htmlFor="name">Amount <span className='text-red-500'>*</span></label>
                   <TextInput
                      leftSectionPointerEvents="none"
                      leftSection={<IconCurrencyRupee stroke={2} />}
                      color='mine-shaft.3'
                      placeholder="Service Name"
                      name='name'
                      onChange={handleAmountChange}
                       />
                    </div>

    </div>

    {error && <div className="text-red-500 text-sm text-center mt-4">{error}</div>}

    <div className='flex justify-center w-full mt-4'>
    <Button onClick={handleWalletRecharge} disabled={loading}  variant="light" color="lime">Add Amount</Button>
    </div>

   
    
    </Modal>

  )
}

export default Wallet