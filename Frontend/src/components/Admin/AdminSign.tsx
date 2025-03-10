import React from 'react'
import { useState } from 'react';
import { Modal,Button, TextInput,rem} from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { signinSchema } from "../../../../Shared/Validation/AuthSchema";
import { PasswordInput} from '@mantine/core';

interface SigninProps {
  opened: boolean; // Whether the modal is open
  close: () => void; // Function to close the modal

}
const AdminSign: React.FC<SigninProps> = ({ opened, close}) => {

  const navigate = useNavigate()
  const [data , setData] = useState({username: '', password: ''});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    setData({...data, [e.target.name]: e.target.value})
    setError(null);
  }

  const handleSignIn = async () => {

       const checkSchema =  signinSchema.safeParse(data);

       if(!checkSchema.success){
        setError(checkSchema.error.errors[0].message);
        return;
       }

       try {
        const response = await axios({
          method: "post",
          url: "http://localhost:3000/adminsign/signin",
          data: data,
          withCredentials: true,
        });
    
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem("Type", "Admin");
        close();
        navigate("/Admin");
         
      
      }  catch(err : any) {
        setError(err.response?.data.msg || "Something went wrong!");
      }

  }

  return (
   <Modal opened={opened} onClose={close}  centered>

<div className='text-bright-sun-400 text-3xl font-bold text-center mb-2'>Admin Login</div>

          <div className='flex flex-col gap-4'>
          <TextInput
                    variant="unstyled"
                    required
                      leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                     label="Email"
                     placeholder="Your Email"
                     name='username'
                     value={data.username}
                     onChange={handleChange}
                   styles={{
                        input: {
                         backgroundColor: '#2d2d2d', 
                         border: '1px solid #5d5d5d', 
                         padding: '1rem 2rem',
                         outline: 'none',
                         color: '#d1d1d1',
                         borderRadius: '4px', 
                         '::placeholder': {
                          color: '#666666', // Set your placeholder color here
                          opacity: 1, // Ensure the color appears as defined
                        },
          
                         },
                         label: {
                          color: '#e7e7e7',
                          fontSize: '16px', // Optional: Adjust font size if needed
                         
                         }
                    }} />
               

                    <PasswordInput
                   variant="unstyled"
                   leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                   label="Password"
                   withAsterisk
                   placeholder="Password"
                   name='password'
                   onChange={handleChange}
                   value={data.password}
                   styles={{
                    input: {
                     backgroundColor: '#2d2d2d', 
                     border: '1px solid #5d5d5d', 
                     padding: '1rem 2rem',
                     outline: 'none',
                     color: '#d1d1d1',
                     borderRadius: '4px', 
                     '::placeholder': {
                      color: '#666666', // Set your placeholder color here
                      opacity: 1, // Ensure the color appears as defined
                    },
      
                     },
                     label: {
                      color: '#e7e7e7',
                      fontSize: '16px', // Optional: Adjust font size if needed
                     
                     }
                }}/>
                    

                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                    <Button variant="filled" color="yellow"  styles={{
                          label: {
                            fontSize: '20px',
                            color: '#454545',
                          },}}
                          onClick={handleSignIn}
                          >Login Account
                    </Button>
          </div>
            
                   

   
    
    </Modal>
  )
}

export default AdminSign