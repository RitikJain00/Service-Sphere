import React  from "react";
import { createContext, useContext, useState,useEffect, ReactNode } from "react";
import { Job, UpcommingBookingCustomer, CartContextType  } from "../Type/Type";
import { showNotification } from '@mantine/notifications';
import { IconX, IconCheck,IconAlertTriangle } from '@tabler/icons-react';
import axios from "axios"
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";



 const CartContext = createContext<CartContextType | undefined>(undefined);

 interface CartProviderProps {
  children: ReactNode; // Explicitly define the type for children
}

 export const CartProvider: React.FC<CartProviderProps> =  ({ children } ) => {

    
    const [cart, setCart] = useState<Job[]>([]);
    const [upcommingBooking, setUpCommingBooking] = useState<UpcommingBookingCustomer[]>([]);
    const [pastBooking, setPastBooking] = useState<UpcommingBookingCustomer[]>([]);
    const [upcommingOrders, setUpCommingOrders] = useState<UpcommingBookingCustomer[]>([]);
    const [orders, setOrders] = useState<Job[]>([]);
    const [Favorate, setFavorate] = useState<Job[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [gst, setGst] = useState<number>(0.0);
    const [discount, setDiscount] = useState<number>(0.0);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()


      //  Fetching Cart
    const fetchCartItem = async () => {
      const token = localStorage.getItem('authToken')
      if(!token) return

      setLoading(true); 
      try{
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3000/shopService/cartItems',
          headers: {Authorization: `Bearer ${token}`}
        })
       
        setCart(response.data.cartInfo.services);  // Uddate Cart 
        setTotal(response.data.cartInfo.total);    // Upadte Total
        setGst(response.data.cartInfo.gst);
        setDiscount(response.data.cartInfo.discount);
        
      } catch(error){
        console.log('Error in Fetching Cart', error)
      }
      setLoading(false);      
    }
    
    useEffect(() => {
      fetchCartItem();
    }, [])

     //  Fetching Favorate
    const fetchFavorateItem = async () => {
      const token = localStorage.getItem('authToken')
        if(!token) return
      setLoading(true); 

      try{
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3000/shopService/favorateItems',
          headers: {Authorization: `Bearer ${token}`}
        })
        setFavorate(response.data.favorateInfo.services);  // Update  Favorate
      } catch(error){
        console.log('Error in Fetching favorate', error)
      }
      setLoading(false); 
  }

  useEffect(() => {
    fetchFavorateItem();
  }, [])

  const fetchUpcommingBookings = async () => {
    const token = localStorage.getItem('authToken')
      if(!token) return
    setLoading(true); 

    try{
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/service/allBookings',
        headers: {Authorization: `Bearer ${token}`}
      })
      setUpCommingBooking(response.data.UpcommingBookingInfo.services);  // Update  Favorate
    } catch(error){
      console.log('Error in Fetching UpcommingBookings', error)
    }
    setLoading(false); 
}

useEffect(() => {
  fetchUpcommingBookings();
}, [])

const fetchUpcommingOrders = async () => {
  const token = localStorage.getItem('authToken')
    if(!token) return
  setLoading(true); 

  try{
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3000/shopService/UpcommingOrders',
      headers: {Authorization: `Bearer ${token}`}
    })

    setUpCommingOrders(response.data.UpcommingBookingInfo);  
  
  } catch(error){
    console.log('Error in Fetching UpcommingOrders', error)
  }
  setLoading(false); 
}

useEffect(() => {
  fetchUpcommingOrders();
}, [])
  
  
   

    const addToCart = async(job: Job) => {
      const token = localStorage.getItem('authToken')
          if(!token) {
           navigate('/CustomerLogin')
            return
          }
        
      const exists = cart.some((item) => item.id === job.id);  // if item already in cart
      if (exists) {
        showNotification({
          title: 'This Service Already in Cart',
          icon: <IconX size={16} />,
          message: `The "${job.name}" is already in your cart.`,
          color: 'red', // Notification color
          radius: 'md', // Optional: corner radius
        });
      }
      else {

        setLoading(true); 

        try{
           await axios({      // add item in cart
            method: 'post',
            url: 'http://localhost:3000/shopService/addToCart',
            headers: {Authorization: `Bearer ${token}`},
            data: job
          })
          await fetchCartItem();  // Fetch again the cart

          showNotification({
            title: 'This Service Added in the Cart',
            icon: <IconCheck size={16} />,
            message: `The service "${job.name}" has been added to your cart.`,
            color: 'green', 
            radius: 'md', 
          });
          } catch(error){
          console.error('Error adding to cart:', error);

          showNotification({
           title: 'Error Adding Service',
           message: 'There was a problem adding the service to your cart. Please try again.',
           color: 'red',
           icon: <IconAlertTriangle size={16} />,
          });
        } 
        setLoading(false); 
      }}
  
    
    const removeFromCart = async (job: Job) => {
      const token = localStorage.getItem('authToken')
        if(!token) return
        setLoading(true); 

      try{
        await axios({         // Remove item from cart
          method: 'put',
          url: 'http://localhost:3000/shopService/deleteFromCart',
          headers: {Authorization: `Bearer ${token}`},
          data: job
        })
        await fetchCartItem();
      }catch(error){
        console.log('Error in removing from cart:',error);
        showNotification({
          title: 'Error in Removing Service',
          message: 'There was a problem in removing the service from your cart. Please try again.',
          color: 'red',
          icon: <IconAlertTriangle size={16} />,
          });
      }

         showNotification({
          title: 'This Service Removed From Cart',
          icon: <IconCheck size={16} />,
          message: `The "${job.name}" is already in your cart.`,
          color: 'green', // Notification color
          radius: 'md', // Optional: corner radius
        });
        setLoading(false); 
      };

      const BookServices = async (paymentMode: string, selectedDate: { [key: number]: Date | null }) => {
        const token = localStorage.getItem('authToken')
        if(!token) return

        const updatedCart = cart.map(service => ({
          ...service,
          bookingDate: selectedDate[service.id] || null, // Assign the correct date to the service
        }));
       
        try{
          await axios({
            method: 'post',
            url: 'http://localhost:3000/booking/order',
            headers: {Authorization: `Bearer ${token}`},
            data: {cart: updatedCart, paymentMode,total,gst,discount}
          })
          alert('Booking confirmed!');
          fetchUpcommingOrders()
          fetchCartItem();
        }catch(error){
          console.log(error)
          alert('Booking not confirmed!')
        }

        return Promise.resolve();
      }


    const addToFavorate = async (job: Job) => {
      const token = localStorage.getItem('authToken')
      console.log(job)
      if(!token) {
        navigate('/CustomerLogin')
         return
       }
      setLoading(true); 

      try{
         await axios({        // Add item to favorates list
          method: 'post',
          url: 'http://localhost:3000/shopService/addToFavorate',
          headers: {Authorization: `Bearer ${token}`},
          data: job
        })
        await fetchFavorateItem();
      } catch(error){
        console.log('Error adding to favorate:', error);

        showNotification({
          title: 'Error Adding Service in favorate',
          message: 'There was a problem adding the service to your favorates. Please try again.',
          color: 'red',
          icon: <IconAlertTriangle size={16} />,
        })
      }
          showNotification({
            title: 'Added to favorate',
            icon: <IconCheck size={16} />,
            message: `"${job.name}" is now in your favorate list.`,
            color: 'green', // Notification color
            radius: 'md', // Optional: corner radius
          });
          setLoading(false); 
      };
  
  
   

    const removeFromFavorate = async (job: Job) => {
      const token = localStorage.getItem('authToken')
      if(!token) return
      setLoading(true); 
      try{
       await axios({          // Remove item from Favorate List
          method: 'put',
          url: 'http://localhost:3000/shopService/deleteFromFavorate',
          headers: {Authorization: `Bearer ${token}`},
          data: job
        })
        await fetchFavorateItem();
      }catch(error){
        console.log(error);
        showNotification({
          title: 'Error in Removing Service',
          message: 'There was a problem in removing the service from your favorates. Please try again.',
          color: 'red',
          icon: <IconAlertTriangle size={16} />,
        });
      }

      showNotification({
        title: 'Removed From  favorate',
        icon: <IconCheck size={16} />,
        message: `"${job.name}" is now removed from your favorate list.`,
        color: 'green', // Notification color
        radius: 'md', // Optional: corner radius
      });
      setLoading(false); 
      };

    return (
      <CartContext.Provider value= {{cart, upcommingOrders,fetchUpcommingBookings,orders, upcommingBooking, pastBooking,  BookServices, Favorate, total,gst, discount, loading,setLoading, addToCart, removeFromCart ,addToFavorate,removeFromFavorate,fetchCartItem,fetchFavorateItem, fetchUpcommingOrders 
       }}>
        {loading && (  
      <div className="fixed top-0 left-0 w-full h-screen  bg-mine-shaft-500 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <Loader color="blue" size="xl" />
      </div>
    )}
  
        {children}
      </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};


