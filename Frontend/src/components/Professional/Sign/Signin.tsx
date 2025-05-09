import { useState } from 'react';
import { TextInput, rem, PasswordInput, Button } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { IconAt, IconLock } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import { signinSchema } from '@craiber/servicesphere-common';;
import { useProfile } from '../../../Context/ProfileContext';
import { useStat } from '../../../Context/StatsProvider';
import { useCart } from '../../../Context/CartContext';
import ForgotPassword from '../../Verification/ForgotPassword';

const Signin = () => {

  const navigate = useNavigate()
  const [data , setData] = useState({username: '', password: ''});
  const [error, setError] = useState<string | null>(null);
  const {updateAuth} = useProfile()
  const {fetchStatsProfessional} = useStat()

  const [opened, { open, close }] = useDisclosure(false);
 
  const {loading,setLoading } = useCart()

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
       
      try{
        setLoading(true)
        const response = await axios({
          method: 'post',
          url: 'https://service-sphere-j7vd.onrender.com/professionalsign/signin',
          data: data,
          withCredentials: true,
        });
        localStorage.setItem("authToken", response.data.token)
        localStorage.setItem("Type" , 'Professional')
        fetchStatsProfessional()
        navigate('/DashBoard')
        updateAuth(response.data.token,"Professional")
      } catch(err : any) {
        setError(err.response?.data.msg || "Something went wrong!");
      }finally{
        setLoading(false)
      }

  }


  return <div className="w-full  md-mx:w-full md:w-1/2 px-32 xl-mx:px-20 bs-mx:px-10 sm-mx:px-5 flex flex-col  bg-mine-shaft-950">
    
  <div className="text-3xl bs:text-4xl text-bright-sun-400 mt-24 font-semibold text-center  hover:scale-110 transition-all duration-300">Professional Account</div>

  <div className=" flex flex-col gap-8 w-auto  mt-20 " >
                 

                    <div>
                    <TextInput
                    variant="unstyled"
                    required
                      leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                      name='username'
                     label="Email"
                     placeholder="Your Email"
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
                    </div>


                    <div>
                    <PasswordInput
                   variant="unstyled"
                   leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                   name='password'
                   label="Password"
                   onChange={handleChange}
                   value={data.password}
                   withAsterisk
                   placeholder="Password"
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
                    </div>

                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                    <Button variant="filled" color="yellow"  styles={{
                          label: {
                            fontSize: '20px',
                            color: '#454545',
                          },
                        }}
                        onClick={handleSignIn}
                        disabled={loading}
                        >
                          Login Account
                          </Button>
                      

                    <div className='text-mine-shaft-400 text-center text-lg  hover:scale-110 transition-all duration-300'>
                      Don't Have An Account ?  <Link className='text-bright-sun-400 ml-2 hover:border-b-2 border-bright-sun-500' to={'/ProfessionalSignup'}>Sign Up</Link>
                    </div>

                    <div  className='text-mine-shaft-400 text-center text-lg  hover:scale-110 transition-all duration-300'>
                     <span onClick={() => open()} className='text-bright-sun-400 ml-2 hover:border-b-2 border-bright-sun-500 cursor-pointer' >Forgot Password ?</span>
                    </div>
                    
                    {<ForgotPassword  opened={opened} close={close} user={'Professional'} />}
                                  
          </div>           
  </div>
}

export default Signin