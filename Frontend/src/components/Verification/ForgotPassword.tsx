import React, { useState } from "react";
import { Modal, Button, TextInput, rem } from "@mantine/core";
import { useCart } from "../../Context/CartContext";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { IconAt } from "@tabler/icons-react";
import { emailSchema } from '@craiber/servicesphere-common';;
import VerifyOTP from "./VerifyOTP";



interface ForgotPasswordProps {
  opened: boolean;
  close: () => void;
  user: string
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ opened, close, user }) => {
  const { setLoading } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  // Correct use of useDisclosure
  const [forgotPassword, { open, close: closeVerifyModal }] = useDisclosure(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSendOTP = async () => {
    // Validate email
    const checkSchema = emailSchema.safeParse(email);
    if (!checkSchema.success) {
      setError(checkSchema.error.errors[0].message);
      return;
    }

    try {
      const apiUrl =
      user === "Customer"
        ? "https://service-sphere-j7vd.onrender.com/customersign/forgotPassword"
        : "https://service-sphere-j7vd.onrender.com/professionalsign/forgotPassword";
      setLoading(true);
      await axios.post( apiUrl, {
        email, // Send email in request body
      });

      alert("OTP sent to your Email");
      open(); // Open OTP verification modal
      
    } catch (error) {
      console.log("Password Reset OTP Send Failed", error);
      alert("Password Reset OTP Send Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <div className="flex flex-col gap-3">
        <div className="text-bright-sun-400 text-3xl font-bold text-center mb-2">
          Forgot Password
        </div>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <TextInput
          variant="unstyled"
          required
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="Email"
          placeholder="Your Email"
          name="username"
          value={email}
          onChange={handleChange}
          styles={{
            input: {
              backgroundColor: "#2d2d2d",
              border: "1px solid #5d5d5d",
              padding: "1rem 2rem",
              outline: "none",
              color: "#d1d1d1",
              borderRadius: "4px",
              "::placeholder": {
                color: "#666666",
                opacity: 1,
              },
            },
            label: {
              color: "#e7e7e7",
              fontSize: "16px",
            },
          }}
        />

        <Button
          className="mt-2"
          radius="lg"
          variant="gradient"
          gradient={{ from: "yellow", to: "orange", deg: 90 }}
          fullWidth
          onClick={handleSendOTP}
        >
          <span className="text-xl font-bold">Send OTP</span>
        </Button>
      </div>

      {/* OTP Verification Modal */}
      <VerifyOTP opened={forgotPassword} close={closeVerifyModal} type="forgotPassword" email={email} closeAllModals={close} user={user} />
    </Modal>
  );
};

export default ForgotPassword;
