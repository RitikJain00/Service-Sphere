import React, { useState } from "react";
import { Modal, Button, TextInput, rem, PasswordInput } from "@mantine/core";
import { useCart } from "../../Context/CartContext";
import axios from "axios";
import { IconAt, IconLock } from "@tabler/icons-react";
import { passwordChangeSchema } from '@craiber/servicesphere-common';;

interface PasswordChangeProps {
  opened: boolean;
  close: () => void;
  otp: string;
  email: string;
  user: string;
  closeAllModals: () => void;
  closeOTPModal: ()=> void
}

const PasswordChange: React.FC<PasswordChangeProps> = ({ opened, close, otp, email, closeAllModals,closeOTPModal, user }) => {
  const { setLoading } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({ password: "", confirmPassword: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleChangePassword = async () => {
    const checkSchema = passwordChangeSchema.safeParse(data);
    if (!checkSchema.success) {
      setError(checkSchema.error.errors[0].message);
      return;
    }

    if(data.password !== data.confirmPassword){
      setError("Password Does'nt Match");
      return;
    }

    try {
      const apiUrl =
      user === "Customer"
        ? `https://service-sphere-j7vd.onrender.com/customersign/resetPassword`
        : `https://service-sphere-j7vd.onrender.com/professionalsign/resetPassword`;

      setLoading(true);
      await axios.post(apiUrl, {
        username: email,
        otp,
        newpassword: data.password,
      });

      alert("Password Changed Successfully");
      close()
      closeOTPModal()
      closeAllModals(); 
    } catch (error) {
      console.log("Password Reset Failed", error);
      alert("Password Reset Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <div className="flex flex-col gap-3">
        <div className="text-bright-sun-400 text-3xl font-bold text-center mb-2">
          Reset Password
        </div>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        {/* Email Input (Disabled) */}
        <TextInput
          variant="unstyled"
          required
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="Email"
          placeholder="Your Email"
          name="username"
          value={email}
          disabled
          styles={{
            input: {
              backgroundColor: "#2d2d2d",
              border: "1px solid #5d5d5d",
              padding: "1rem 2rem",
              color: "#d1d1d1",
              borderRadius: "4px",
            },
            label: {
              color: "#e7e7e7",
              fontSize: "16px",
            },
          }}
        />

        {/* Password Input */}
        <PasswordInput
          variant="unstyled"
          leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
          label="New Password"
          withAsterisk
          placeholder="Enter New Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          styles={{
            input: {
              backgroundColor: "#2d2d2d",
              border: "1px solid #5d5d5d",
              padding: "1rem 2rem",
              color: "#d1d1d1",
              borderRadius: "4px",
            },
            label: {
              color: "#e7e7e7",
              fontSize: "16px",
            },
          }}
        />

        {/* Confirm Password Input */}
        <PasswordInput
          variant="unstyled"
          leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
          label="Confirm Password"
          withAsterisk
          placeholder="Confirm New Password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          styles={{
            input: {
              backgroundColor: "#2d2d2d",
              border: "1px solid #5d5d5d",
              padding: "1rem 2rem",
              color: "#d1d1d1",
              borderRadius: "4px",
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
          onClick={handleChangePassword}
        >
          <span className="text-xl font-bold">Change Password</span>
        </Button>
      </div>
    </Modal>
  );
};

export default PasswordChange;
