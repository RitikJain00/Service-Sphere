import React  from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { Job } from "../Data/Job";


interface CartContextType {
  cart : Job[],
  total: number,
  addToCart: (job: Job) => void,
  removeFromCart: (index: number) => void
 }

 const CartContext = createContext<CartContextType | undefined>(undefined);

 interface CartProviderProps {
  children: ReactNode; // Explicitly define the type for children
}

 export const CartProvider: React.FC<CartProviderProps> =  ({ children } ) => {

    const [cart, setCart] = useState<Job[]>([]);
    const [total, setTotal] = useState<number>(0);

    const addToCart = (job: Job) => {
      setCart((prevCart) => [...prevCart, job]);
      setTotal((prevTotal) => prevTotal + parseInt(job.Price)); 
    };
  
    // Remove job from the cart
    const removeFromCart = (index: number) => {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((_, i) => i !== index);
        const newTotal = updatedCart.reduce((sum, item) => sum + parseInt(item.Price), 0); // Recalculate total
        setTotal(newTotal);
        return updatedCart;
      });
    
    };

    return (
      <CartContext.Provider value= {{cart,total, addToCart, removeFromCart}}>
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


