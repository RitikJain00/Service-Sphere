import Header from "../../components/Customer/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Button, Divider  } from '@mantine/core';
import { contactUsSchema } from '@craiber/servicesphere-common';


import { useCart } from "../../Context/CartContext";
import { useState } from 'react';
import axios from "axios";

const Contact = () => {
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
    <div className="min-h-[100vh] w-full bg-mine-shaft-950">
      <Header />
      <Divider mx="md" mb='xl' />

      <div className="w-full h-full flex justify-center items-end mt-8 px-4 md:px-8 relative">
        <div className="flex flex-col bs:flex-row bg-mine-shaft-900 border-rounded p-8 gap-16 rounded-lg hover:shadow-[0_0_5px_2px_black] !shadow-bright-sun-300 border-2 border-mine-shaft-700">

          <div className="flex flex-col gap-4">
            <div className="text-bright-sun-400 text-4xl font-bold">Get In Touch</div>
            <div className="text-mine-shaft-400">We are here for you! How can we help</div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-mine-shaft-100" htmlFor="name">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={handleChange}
                className="bg-mine-shaft-800 p-1 pl-2 border-0 outline-none text-mine-shaft-200"
                name="name"
                type="text"
                placeholder="Ritik Jain"
                value={data.name}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-mine-shaft-100" htmlFor="email">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                onChange={handleChange}
                className="bg-mine-shaft-800 p-1 pl-2 border-0 outline-none text-mine-shaft-200"
                name="email"
                type="email"
                placeholder="ritikjain123@gmail.com"
                value={data.email}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-mine-shaft-100" htmlFor="message">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                onChange={handleChange} // Fixed `onChange`
                className="bg-mine-shaft-800 w-96 h-40 p-1 pl-2 border-0 outline-none text-mine-shaft-200"
                name="message"
                placeholder="Enter Your Message"
                value={data.message}
              ></textarea>
            </div>

            <div className="w-96 mt-4">
              <Button onClick={handleSubmit} fullWidth size="md" variant="filled" color="orange">
                Submit
              </Button>
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          </div>

          {/* Right Side: Image and Contact Details */}
          <div>
            <div>
              <img className="max-w-full h-72" src="Contact/contactUs.jpg" alt="Contact Us" />
            </div>

            <div className="flex flex-col gap-6 mt-12 ml-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex justify-center items-center">
                  <img className="w-8 h-8" src="Contact/maps.png" alt="Location" />
                </div>
                <div className="items-center text-mine-shaft-400">
                  <div>ITPL Road Whitefield, Bangalore</div>
                  <div>Karnataka, PIN 560066, India</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex justify-center items-center">
                  <img className="w-8 h-8" src="Contact/phone.png" alt="Phone" />
                </div>
                <div className="text-mine-shaft-400">+91-7836086508</div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex justify-center items-center">
                  <img className="w-8 h-8" src="Contact/mail.png" alt="Email" />
                </div>
                <div className="text-mine-shaft-400">ServiceSphere@gmail.com</div>
              </div>
            </div>
          </div>


        </div>

        {/* Social Media Links */}
        <div className="w-12 bg-bright-sun-400 flex flex-col gap-2 justify-center items-center p-2 pb-4 rounded-br-3xl">
          <a href="#"><img className="w-8 h-8" src="Social/whatsapp.png" alt="WhatsApp" /></a>
          <a href="#"><img className="w-8 h-8" src="Social/facebook.png" alt="Facebook" /></a>
          <a href="https://www.instagram.com/__ritikjainn/"><img className="w-8 h-8" src="Social/instagram.png" alt="Instagram" /></a>
          <a href="#"><img className="w-8 h-8" src="Social/twitter.png" alt="Twitter" /></a>
          <a href="https://www.linkedin.com/in/ritikjain00/"><img className="w-8 h-8" src="Social/linkedin.png" alt="LinkedIn" /></a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
