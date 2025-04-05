import { useState } from 'react';
import { TextInput, rem, PasswordInput, Button } from '@mantine/core';
import { IconAt, IconUserCircle,IconLock } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios";
import { signupSchema } from '@craiber/servicesphere-common';;
import { useProfile } from '../../../Context/ProfileContext';
import { useStat } from '../../../Context/StatsProvider';
import { useCart } from '../../../Context/CartContext';


const Signup = () => {

  const navigate = useNavigate()
  const [data , setData] = useState({name: '', username: '', password: '', confirmPassword: ''});
  const [error, setError] = useState<string | null>(null);
  const {updateAuth} = useProfile()
  const {loading,setLoading } = useCart()
  const {fetchStatsProfessional} = useStat()
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, [e.target.name]: e.target.value})
    setError(null);
  }

  const handleSignUp = async () => {

       const checkSchema =  signupSchema.safeParse(data);

       if(!checkSchema.success){
        setError(checkSchema.error.errors[0].message);
        return;
       }
       
      if(data.password !== data.confirmPassword){
        setError("Password does'nt Match");
        return;
      }
      
      try{
        setLoading(true)

        const response = await axios({
          method: 'post',
          url: 'https://service-sphere-j7vd.onrender.com/professionalsign/signup',
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

  
  return <div className="w-1/2 md-mx:w-full px-32 xl-mx:px-20 bs-mx:px-10 sm-mx:px-5 flex flex-col  bg-mine-shaft-950">
    
    <div className="text-3xl bs:text-4xl text-bright-sun-400 mt-24 font-semibold text-center  hover:scale-110 transition-all duration-300">Professional Account</div>

    <div className="flex flex-col gap-6 mt-16" >

 
                      <div>
                      <TextInput
                      variant="unstyled"
                      required
                        leftSection={<IconUserCircle style={{ width: rem(16), height: rem(16) }} />}
                       label="Company Name"
                       placeholder="Company Name"
                       name='name'
                       value={data.name}
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
                      </div>


                      <div>
                      <PasswordInput
                     variant="unstyled"
                     leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                     label="Password"
                     withAsterisk
                     placeholder="Password"
                     name='password'
                     value={data.password}
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
                  }}/>
                      </div>

                      <div>
                      <PasswordInput
                     variant="unstyled"
                     leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                     label="Confirm Password"
                     withAsterisk
                     placeholder="Confirm Password"
                     name='confirmPassword'
                     value={data.confirmPassword}
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
                  }}/>
                      </div>

                      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                      <Button variant="filled" color="yellow"  styles={{
                          label: {
                            fontSize: '20px',
                            color: '#454545',
                          },}}
                          onClick={handleSignUp}
                          disabled={loading}
                          >Create Account</Button>

                      <div className='text-mine-shaft-400 text-center text-lg  hover:scale-110 transition-all duration-300'>
                        Have An Account  <Link className='text-bright-sun-400 ml-2 hover:border-b-2 border-bright-sun-500' to={'/ProfessionalLogin'}>Login</Link>
                      </div>       
            </div>                           
    </div>
  
}

export default Signup