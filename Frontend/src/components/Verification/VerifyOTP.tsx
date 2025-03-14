import React, { useState, useRef } from "react";
import { Modal, Button } from "@mantine/core";
import { useCart } from "../../Context/CartContext";
import { useProfile } from "../../Context/ProfileContext";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";

import PasswordChange from "./PasswordChange";

interface VerifyOtpProps {
  opened: boolean;
  close: () => void;
  type: string;
  email: string;
  user: string;
  closeAllModals:  () => void;
}

const VerifyOTP: React.FC<VerifyOtpProps> = ({ opened, close, type, email, closeAllModals, user}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setLoading } = useCart();
  const [otpValues, setOtpValues] = useState<string[]>(new Array(6).fill(""));
  const { fetchProfile } = useProfile()

  const [changePassword, { open, close: closeOTPModal }] = useDisclosure(false);


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otpValues];
    newOtp[index] = e.target.value;
    setOtpValues(newOtp);

    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerification = async () => {
    const token = localStorage.getItem("authToken");
    const otp = otpValues.join(""); 

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const apiUrl =
      user === "Customer"
        ? `http://localhost:3000/customersign/VerifyOtp${type}`
        : `http://localhost:3000/professionalsign/VerifyOtp${type}`;
      setLoading(true);
      await axios.post(
        apiUrl, 
        {username: email, otp },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      if(type === 'forgotPassword') alert(`OTP Verified Successfully`);
      else alert(`${type} Verified Successfully`);
      
      
      if(type === 'forgotPassword'){
        open()
      }
      else{
        fetchProfile()
        close();
      }
      
    } catch (error) {
      console.log("OTP Verification Failed:", error);
      alert("OTP Verification Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <div className="flex flex-col gap-3">
        <div className="text-bright-sun-400 text-3xl font-bold text-center mb-2">
          {type === 'forgotPassword'? `Reset Password OTP` : `${type} Verify OTP`}
        </div>
        <div className="text-red-500 text-sm text-center">
        {type === 'Phone'? `Enter 6-digit code sent to your {type}` : `Enter 6-digit code sent to your Email`} 
        </div>
      </div>

      <div className="flex justify-between my-8">
        {otpValues.map((_, index) => (
          <input
            key={index}
            className="w-12 h-12 text-bright-sun-400 text-center text-xl rounded-md bg-mine-shaft-950 border border-gray-700 focus:border-yellow-500 focus:outline-none"
            type="text"
            maxLength={1}
            value={otpValues[index]}
            onChange={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>

      <Button
        radius="lg"
        variant="gradient"
        gradient={{ from: "yellow", to: "orange", deg: 90 }}
        fullWidth
        onClick={handleVerification}
      >
        {type === 'forgotPassword'? <span className="text-xl font-bold">Verify OTP</span> 
        :
        <span className="text-xl font-bold">Verify {type}</span> }
        
      </Button>

      <PasswordChange opened={changePassword} close={closeOTPModal} otp={otpValues.join("")} email={email} closeAllModals={closeAllModals} user={user} closeOTPModal={close} />
    </Modal>
  );
};

export default VerifyOTP;
