import nodemailer from 'nodemailer'
import twilio from "twilio";
import dotenv from "dotenv";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";


dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});




const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOTPPhone = async (phoneNumber: string, otp: string) => {
  phoneNumber = '+91' + phoneNumber

  try {
    const message = await client.messages.create({
      body: `Your OTP for Phone Verification is: ${otp}. It is valid for 24 hours.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    return message;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};







