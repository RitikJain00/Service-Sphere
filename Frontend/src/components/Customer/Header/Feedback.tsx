import { useState } from 'react';
import { Modal, Button, Radio, Group  } from '@mantine/core';

import { contactUsSchema } from "../../../../../Shared/Validation/AuthSchema";
import { useCart } from "../../../Context/CartContext";

import axios from "axios";

interface FeedbackProps {
  opened: boolean; // Whether the modal is open
  close: () => void; // Function to close the modal
}

const Feedback: React.FC<FeedbackProps> = ({ opened, close }) => {
  const { setLoading } = useCart();
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(null);
   
  };

  const handleSubmit = async () => {
    const checkSchema = contactUsSchema.safeParse(data);
    if (!checkSchema.success) {
      setError(checkSchema.error.errors[0].message);
      return;
    }

    try {
      setLoading(true);
      await axios.post(`https://service-sphere-j7vd.onrender.com/adminContact/contactUsMessage`, 
      data,
       {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Message submitted");
      setData({ name: "", email: "", message: "" }); 
    } catch (error) {
      console.error("Message submission failed:", error);
      alert("Message submission failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal opened={opened} onClose={close}  centered>
      <div className='flex flex-col gap-4'>
        <div className='text-bright-sun-400 text-2xl text-center mb-2'>Feedback Form</div>

        <Radio.Group
      name="Feedback Type"
      label="Feedback Type"
      withAsterisk
    >
      <Group mt="xs" gap={'xl'}>
        <Radio value="Comments" label="Comments" color="orange" />
        <Radio value="Suggestions" label="Suggestions" color="orange" />
        <Radio value="Questions" label="Questions"  color="orange"/>
      
      </Group>
    </Radio.Group>


        <div className="flex flex-col gap-2">
                         <label className="text-mine-shaft-100"  htmlFor="message">Your Feedback <span className='text-red-500'>*</span></label>
                         <textarea onChange={handleChange} className="bg-mine-shaft-950 w-96 h-40 p-1 pl-2 s border-0 outline-none text-mine-shaft-200" name="message"   id=""  placeholder="Enter Your Message"></textarea>
                       </div>

                       <div className="flex flex-col gap-2 mt-2">
                     <label className="text-mine-shaft-100" htmlFor="name">Your Name <span className='text-red-500'>*</span></label>
                     <input onChange={handleChange}  className="bg-mine-shaft-950 p-1 pl-2 border-0 outline-none text-mine-shaft-200" name='name' type="text"  placeholder="Name"/>
                      </div>

                       <div className="flex flex-col gap-2">
                         <label className="text-mine-shaft-100" htmlFor="email">Your Email <span className='text-red-500'>*</span></label>
                         <input onChange={handleChange}  className="bg-mine-shaft-950 p-1 pl-2 border-0 outline-none text-mine-shaft-200" name='email' type="email"  placeholder="Email"/>
                       </div>

                       <div className='w-full  mt-4'>

                        <Button onClick={handleSubmit}  fullWidth  size='md'variant="filled" color="orange">
                        Submit
                     </Button>
                  </div>

                  {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      </div>
    </Modal>
  );
};

export default Feedback;
