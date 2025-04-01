
import { Modal, Button,TextInput} from '@mantine/core';
import { Select } from '@mantine/core';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { createService } from '../../../../../Shared/Validation/ServiceSchema'
import {  IconCheck } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { useStat } from '../../../Context/StatsProvider';

import { IconBrandSlack,IconBriefcase, IconCategory2 , IconCurrencyRupee, IconFileDescription  } from '@tabler/icons-react';


interface CheckOutProps {
  opened: boolean; // Whether the modal is open
  close: () => void; // Function to close the modal
  fetchAgain: () => void;
  service?: any;
}



const ServiceHandler: React.FC<CheckOutProps>  = ({ opened, close, fetchAgain, service}) => {

const isEditMode = Boolean(service);
const [error, setError] = useState<string | null>(null);
const [data , setData] = useState({id: '',name: '',  description: '', category: '', expireince: '',price: undefined});

const {fetchStatsProfessional } = useStat()

useEffect(() => {
  if (service) {
    setData({
      id: service.id || '',
      name: service.name || '',
      description: service.description || '',
      category: service.category || '',
      expireince: service.expireince || '',
      price: service.price || ''
    });
  } else {
    setData({id: '', name: '', description: '', category: '', expireince: '', price: undefined });
  }
}, [service, opened]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 
  setData({...data, [e.target.name]: e.target.value})
  setError(null);
}

const token = localStorage.getItem('authToken')

const  handleServiceSubmit = async () => {
  
  try {
    const professional =  await axios ({     // to get the location and company name
      method: 'get',
      url: 'http://localhost:3000/professionalprofile/profile',
      headers: {Authorization: `Bearer ${token}`},
    })

    const proffessionalData = professional.data.userProfile.profile
    
    if (!proffessionalData.name ) {
      setError('Update Company Name in your Profile first');
      return;
    }

    if (!proffessionalData.city ) {
      setError('Update Location in your Profile first');
      return;
    }
    
   
    const updatedData = {
      ...data,
      company: proffessionalData.name,
      location: proffessionalData.city,
      price: Number(data.price) || 0, 
    };


    const checkSchema = createService.safeParse(updatedData);
    if (!checkSchema.success) {
      setError(checkSchema.error.errors[0].message);
      return;
    }

    const apiUrl = isEditMode
        ? 'http://localhost:3000/service/editService'
        : 'http://localhost:3000/service/createservice';
      const method = isEditMode ? 'put' : 'post';


    const response = await axios ({
      method: method,
      url: apiUrl,
      headers: {Authorization: `Bearer ${token}`},
      data: updatedData
    })
    
    if(response){
    fetchAgain()
    fetchStatsProfessional()
      close();

    showNotification({
     title: isEditMode ? 'Service Edited' : 'Service Added',
     message: `Your service has been ${isEditMode ? 'edited' : 'added'} successfully!`,
     color: "teal",
     icon: <IconCheck size={20} />,
   });
    }
   
  } catch (error) {
    console.error(error);
    setError('Internal server error');
  }
};


  return <>
  <div className='flex'>
  <Modal opened={opened} onClose={close}  centered>
    <div className='flex flex-col gap-3'>
      <div className='text-bright-sun-400 text-3xl font-bold text-center mb-2'>
      {isEditMode ? 'Edit Service' : 'Add Service'}
      </div>

       {error && <div className="text-red-500 text-sm text-center">{error}</div>}
     
              <div className="flex flex-col gap-2 mt-2">
                   <label className="text-mine-shaft-100" htmlFor="name">Service Name <span className='text-red-500'>*</span></label>
                   <TextInput
                      leftSectionPointerEvents="none"
                      leftSection={<IconBrandSlack stroke={2} />}
                      color='mine-shaft.3'
                      placeholder="Service Name"
                      name='name'
                      value={data.name}
                      onChange={handleChange}
                       />
                   
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                   <label className="text-mine-shaft-100" htmlFor="name">Description <span className='text-red-500'>*</span></label>
                   <TextInput
                      leftSectionPointerEvents="none"
                      leftSection={<IconFileDescription  stroke={2} />}
                      color='mine-shaft.3'
                      placeholder="Description"
                      name='description'
                      value={data.description}
                      onChange={handleChange}
                     
                    
                       />
                   
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                   <label className="text-mine-shaft-100" htmlFor="name">Category<span className='text-red-500'>*</span></label>
                   <Select
                    leftSection={<IconCategory2  stroke={2} />}
                    placeholder="Pick value"
                    data={['Electrician', 'Contractor', 'Plumber', 'Carpenter','Painter', 'Technician', 'PestControl', 'HouseKeeping', 'Other']}
                    name='category'
                    value={data.category}
                    onChange={(value) => {
                      setData((prev: any) => ({ ...prev, category: value })); 
                      setError(null);
                    }}
                     />
                   
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                   <label className="text-mine-shaft-100" htmlFor="name">Expirence<span className='text-red-500'>*</span></label>
                   <Select
                    leftSection={<IconBriefcase stroke={2} />}
                    placeholder="Pick value"
                    data={['1+ Years', '3+ Years', '5+ Years', '10+ Years', '20+ Years', '30+ Years']}

                    name='expirence'
                    value={data.expireince}
                    onChange={(value) => {
                      setData((prev: any) => ({ ...prev, expireince: value })); 
                      setError(null);
                    }}
                     />
                   
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                   <label className="text-mine-shaft-100" htmlFor="name"> Price<span className='text-red-500'>*</span></label>
                   <TextInput
                      leftSectionPointerEvents="none"
                      leftSection={< IconCurrencyRupee stroke={2} />}
                      color='mine-shaft.3'
                      placeholder="500"
                      name='price'
                      value={data.price}
                      onChange={handleChange}
                       />
                   
                    </div>


                     <div onClick={handleServiceSubmit} className='w-full  mt-4'>

                      <Button  fullWidth  size='md'variant="filled" color="lime" >
                      <span className='text-xl font-bold'>
                      {isEditMode ? 'Update' : 'Add'}
                      </span>
                   </Button>
                </div>

              

    </div>
    </Modal>

  </div>

  </>
}

export default ServiceHandler