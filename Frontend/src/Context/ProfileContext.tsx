import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import {BasicInfo,ContactInfo,AddressInfo,verificationInfo, ProfileContextType } from '../Type/Type';
import { BasicDetail, Contact, Address } from "../../../Shared/Validation/ProfileSchema";
import { Loader } from "@mantine/core";



const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps { 
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [edit, setEdit] = useState([false, false, false, false]);
  const [image, setImage] = useState('')
  const [basic, setBasic] = useState<BasicInfo>({ name: '', about: '' });
  const [contact, setContact] = useState<ContactInfo>({email: '', phone: '' });
  const [address, setAddress] = useState<AddressInfo>({ home: '', city: '', pin: '', country: '' });
  const [verify, setVerify] = useState<verificationInfo>({email: false, phone: false})
  const [walletAmount , setWalletAmount] = useState<number>(0);
  const [errorBasic, setErrorBasic] = useState<string | null>(null)
  const [errorContact, setErrorContact] = useState<string | null>(null)
  const [errorAddress, setErrorAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false);

  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [type, setType] = useState(localStorage.getItem("Type"));

   
  const updateAuth = (newToken: string, newType: string) => {
    setToken(newToken);
    setType(newType);
  };
   
  const fetchProfile = () => {
    if (!token || !type) return;

    const apiUrl =
      type === "Customer"
        ? "https://service-sphere-j7vd.onrender.com/customerprofile/profile"
        : "https://service-sphere-j7vd.onrender.com/professionalprofile/profile";
  
      axios({
        method: 'get',
        url: apiUrl,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          const data = response.data.userProfile;
         
          
          setImage(data.profile.image)
          setBasic({ name: data.profile.name, about: data.profile.description});
          setContact({email: data.username, phone: data.profile.phone });
          setAddress({ home: data.profile.address, city: data.profile.city, pin: data.profile.pincode, country: data.profile.country });
         setWalletAmount(data.wallet.Total)
          setVerify({email: data.isEmailVerified, phone: data.isPhoneVerified})
        })
        .catch(error => console.error("Error fetching profile:", error));
  }

  useEffect(() => {
    fetchProfile()
  }, [token,type]);



  const handleBasicChange = (field: string, value: string) =>{ 
    setBasic(prev => ({ ...prev, [field]: value } )) 
    setErrorBasic(null) 
  };
  const handleContactChange = (field: string, value: string) =>{
     setContact(prev => ({ ...prev, [field]: value }))
     setErrorContact(null)
  };
  const handleAddressChange =(field: string, value: string) =>{
      setAddress(prev => ({ ...prev, [field]: value }))
     setErrorAddress(null)
  }


  const handleWalletMoney = async (amount: number) => {
    try {
      const response = await axios.put(
        'https://service-sphere-j7vd.onrender.com/customerprofile/wallet',
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        alert("Payment Added to Wallet Successfully");
  
        setWalletAmount((prevWallet) => prevWallet + Number(amount));
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error updating wallet:", error);
      alert("Failed to add money to wallet");
    }
  };
  


  const handleClick = (index: number) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };

  const saveProfile = (change: number) => {

  

    if(change === 0){
      let  checkSchema =  BasicDetail.safeParse(basic)
      if(!checkSchema.success){
      setErrorBasic(checkSchema.error.errors[0].message);
      return;
     }
    }
    else if(change === 1){
      let  checkSchema =  Contact.safeParse(contact)
      if(!checkSchema.success){
      setErrorContact(checkSchema.error.errors[0].message);
      return;
      }
    }
    else if(change === 2){
    let  checkSchema =  Address.safeParse(address)
      if(!checkSchema.success){
      setErrorAddress(checkSchema.error.errors[0].message);
      return;
      }
    }

    setLoading(true)
    if (!token || !type) return;
      const apiUrl =
      type === "Customer"
      ? "https://service-sphere-j7vd.onrender.com/customerprofile/profile"
      : "https://service-sphere-j7vd.onrender.com/professionalprofile/profile";
    axios({
      method: 'put',
      url: apiUrl,
      headers: {Authorization: `Bearer ${token}`},
        data: {basic, contact, address}
    })
      .then(() => {
      alert("Profile updated successfully!")
      setLoading(false)
  })
      .catch(error => console.error("Error updating profile:", error));
      
  };

  return (
    <ProfileContext.Provider value={{ edit,image, basic, contact, address,verify, handleBasicChange, handleContactChange, handleAddressChange,  handleClick,handleWalletMoney, saveProfile, updateAuth, walletAmount, fetchProfile, errorBasic,errorContact,errorAddress}}>
      {loading && (  
      <div className="fixed top-0 left-0 w-full h-screen  bg-mine-shaft-500 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <Loader color="blue" size="xl" />
      </div>
      )}
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
