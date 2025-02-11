import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface BasicInfo { name: string; about: string; }
interface ContactInfo { email: string, phone: string; }
interface AddressInfo { home: string; city: string; pin: string; country: string; }

interface ProfileContextType {
  edit: boolean[];
  basic: BasicInfo;
  contact: ContactInfo;
  address: AddressInfo;

  handleBasicChange: (field: string, value: string) => void;
  handleContactChange: (field: string, value: string) => void;
  handleAddressChange: (field: string, value: string) => void;
  handleClick: (index: number) => void;
  saveProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps { 
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [edit, setEdit] = useState([false, false, false, false]);
  const [basic, setBasic] = useState<BasicInfo>({ name: '', about: '' });
  const [contact, setContact] = useState<ContactInfo>({email: '', phone: '' });
  const [address, setAddress] = useState<AddressInfo>({ home: '', city: '', pin: '', country: '' });

 const type = localStorage.getItem('Type') 
    const token = localStorage.getItem('authToken')
    const apiUrl = type === 'Customer' 
      ? 'http://localhost:3000/customerprofile/profile' 
      : 'http://localhost:3000/professionalprofile/profile';

  useEffect(() => {

    axios({
      method: 'get',
      url: apiUrl,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        const data = response.data;
        setBasic({ name: data.name, about: data.description });
        setContact({email: data.username, phone: data.phone });
        setAddress({ home: data.address, city: data.city, pin: data.pincode, country: data.country });
      })
      .catch(error => console.error("Error fetching profile:", error));
  }, [token,type]);

  const handleBasicChange = (field: string, value: string) => setBasic(prev => ({ ...prev, [field]: value }));
  const handleContactChange = (field: string, value: string) => setContact(prev => ({ ...prev, [field]: value }));
  const handleAddressChange = (field: string, value: string) => setAddress(prev => ({ ...prev, [field]: value }));


  const handleClick = (index: number) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };

  const saveProfile = () => {
    console.log(token)
    axios({
      method: 'put',
      url: apiUrl,
      headers: {Authorization: `Bearer ${token}`},
        data: {basic, contact, address}
    })
      .then(() => alert("Profile updated successfully!"))
      .catch(error => console.error("Error updating profile:", error));
  };

  return (
    <ProfileContext.Provider value={{ edit, basic, contact, address, handleBasicChange, handleContactChange, handleAddressChange,  handleClick, saveProfile }}>
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
