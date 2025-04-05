import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import LoginStatus from '../../Middleware/CheckLoginStatus';

import { transporter } from '../../Verification/Verification';
import { sendOTPPhone } from '../../Verification/Verification';


import { signinSchema, signupSchema } from '@craiber/servicesphere-common';


const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "RitikJain"

router.post(
  "/signup",
  async (req: Request, res: Response): Promise<void> => {
    const {name, username, password } = req.body;


    const validateData = signupSchema.safeParse(req.body);

    if(!validateData.success){
      res.json({msg: "Invalid Input"})
      return
    }

    try {
      const existingProfessional = await prisma.professional.findUnique({
        where: { username },
      });

      if (existingProfessional) {
        res.status(400).json({ msg: "User already exists. Please sign in." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password,10)

      const newProfessional = await prisma.professional.create({
        data: { 
          username,
          password: hashedPassword,
          profile: {
            create: {
              name,
              description: null! as string,  // ✅ Force TypeScript to accept `null`
              image: null! as string,
              address: null! as string,    
              city: null! as string,       
              pincode: null! as string,     
              country: null! as string, 
            }
          }
        }
      });

      const wallet = await prisma.professionalWallet.create({
        data: {
          professionalId:  newProfessional.id, 
        }
      });
      

      const token = jwt.sign({professionalId: newProfessional.id,username: newProfessional.username }, JWT_SECRET, {
        expiresIn: "7d"
      });

      res.cookie('token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7*24*60*60*1000
      })

      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: username,
        subject: 'Welcome to Service Sphere! 🎉 We are excited to have you on board as a trusted service professiona',
        text: `Dear ${name},

        At Service Sphere, we connect skilled professionals like you with customers looking for reliable and high-quality services. Whether you're an electrician, plumber, carpenter, painter, house cleaner, or pest control expert, we provide you with a platform to grow your business and reach more clients effortlessly.

          Getting Started:
          ✅ Set Up Your Profile – Ensure your details are updated to attract potential customers.
          ✅ Manage Bookings – Accept and schedule appointments with ease.
          ✅ Get Paid Securely – Receive payments directly into your account through our secure system.

          Why Service Sphere?
          🚀 Increased Visibility – Expand your reach and get more job opportunities.
          💼 Flexible Work – Choose your preferred working hours and locations.
          💰 Timely Payments – Get paid on time for the services you provide.

          Need Assistance?
          Our support team is here to help you with any queries. Feel free to reach out to us at ${process.env.SENDER_EMAIL} for any assistance.

          We look forward to a successful partnership and helping you grow your business with Service Sphere!

          Best regards,
          The Service Sphere Team`
      }

      await transporter.sendMail(mailOptions)    // send the mail
      res.status(201).json({
        msg: "Signup successful",
        professional: { professionalId: newProfessional.id, username: newProfessional.username},
        token
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);


////////////////////////////  SignIn   ///////////////////////////////////////////

router.post(
  "/signin" , 
  async(req: Request,res: Response): Promise<void> => {
    const { username, password} = req.body;

    const validateData = signinSchema.safeParse(req.body);

    if(!validateData.success){
      res.json({msg: "Invalid Input"})
      return
    }

    try {
      const existingProfessional = await prisma.professional.findUnique({
        where: {username}
      })

      if(!existingProfessional){
        res.status(400).json({ msg: "User Does'nt Exist. Please Sign Up" })
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, existingProfessional.password );

      if(!isPasswordValid){
        res.status(401).json({msg: "Invalid Username or Password"})
        return
      }

      const token = jwt.sign({ professionalId: existingProfessional.id, username: existingProfessional.username }, JWT_SECRET, {
        expiresIn: "7d", // Token expires in 1 day
      });

      res.cookie('token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7*24*60*60*1000
      })
  
      res.status(200).json({
        msg: "Signin successful",
        professional: { professionalId: existingProfessional.id, username: existingProfessional.username },
        token,
      });
    } catch (error) {
      console.error("Error during signin:", error);
      res.status(500).json({ msg: "Internal server error" });
    }

  });

  router.post('/logout', (req,res)=> {
    try{
      res.clearCookie('token',{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7*24*60*60*1000
      })
      res.json({success: true, msg: "logout Successfull"})
    }catch(error){
       res.json({success: false, msg: "logout failed", error: error})
    }
  })




  //////////////////////////////// Send OTP /////////////////////////////////////////

router.post('/sendOtp' ,LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
  const userId = (req as any).user.professionalId;
  const username = (req as any).user.username
  const { emailOrphone }= req.body


  const existingProfessional = await prisma.professional.findUnique({
    where: {id: userId}
   })

  if(emailOrphone === 'Email' && existingProfessional?.isEmailVerified){
    res.status(500).json({success: false, msg: 'Email is alredy verified'})
    return
  }
  
  if(emailOrphone === 'Phone' && existingProfessional?.isPhoneVerified){
    res.status(500).json({success: false, msg: 'Phone is alredy verified'})
    return
  }

  const otp = String(Math.floor(Math.random()*900000 + 100000) )
 
  
 const professional =  await prisma.professional.update({
    where: {id: userId},
    data: {
      verifyOtp: otp,
      verifyOtpExpireAt: new Date(Date.now() + 24 * 60 * 60 * 1000) 
    },
    select: {
      profile: {
        select: {  name: true }
       
      }
    }
  })

 

  if(emailOrphone === 'Email'){
   
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: username,
      subject: 'Account Verification OTP',
      text: `Dear ${professional.profile?.name},
  
      Your OTP is ${otp}. Verify your Account using this OTP. This OPT is Valid for 24 hours from now onowrds.
      Thank you for choosing Service Sphere! We look forward to making your life easier.
      
      Best regards,
      The Service Sphere Team`
    }
    
    await transporter.sendMail(mailOptions)    // send the mail
    res.status(200).json({success: true, msg: "Verify Otp send Successfull"})
  }else {
    const phoneNumberObj = await prisma.professionalProfile.findUnique({
      where: { professionalId: userId },
      select: {
        phone: true
      }
    });
    
    const phoneNumber = phoneNumberObj?.phone; // Extract the phone number
    
    if (!phoneNumber) {
      res.status(500).json({ success: false, msg: "Phone Number is Not Valid" });
      return;
    }
    
  
    const message = await sendOTPPhone(phoneNumber, otp); // Pass the extracted phone number

    res.status(200).json({success: true, msg: "Verify Otp send Successfull", message:  message})
    
  }
  }catch(error){
    res.status(500).json({success: false, msg: "Verify Otp send Failed", error: error})
  }
})



//////////////////////////////////Verify OTP ///////////////////////////////////////////

router.post('/VerifyOtpEmail', LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.professionalId;
  const { otp } = req.body; // ✅ Extract OTP properly
 
  if (!otp) {
    res.status(400).json({ success: false, msg: "OTP is not present" });
    return;
  }

  try {
    const existingProfessional = await prisma.professional.findUnique({
      where: {id: userId },
    });
  

    if (!existingProfessional) {
      res.status(400).json({ msg: "User doesn't exist. Please sign up" });
      return;
    }

    if (!existingProfessional.verifyOtp || existingProfessional.verifyOtp !== otp) { // ✅ Fix string comparison
      res.status(400).json({ success: false, msg: "Invalid OTP" });
      return;
    }

  

    if (new Date(existingProfessional.verifyOtpExpireAt) < new Date()) { // ✅ Fix timestamp comparison
      res.status(400).json({ success: false, msg: "OTP Expired" });
      return;
    }

    await prisma.professional.update({
      where: { id: userId },
      data: {
        isEmailVerified: true,
        verifyOtp: '',
        verifyOtpExpireAt: new Date(0), // ✅ Store as DateTime
      },
    });

    res.status(200).json({
      success: true,
      msg: "Email Verified Successfully",
    });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, msg: "Verification Failed", error });
  }
});




router.post("/verifyOTPPhone",LoginStatus, async (req: Request, res: Response): Promise<void>  => {

  const userId = (req as any).user.professionalId;

  const {  otp } = req.body;
 
  // Fetch OTP from DB/Cache (implement this function)
  const storedOTP = await prisma.professional.findUnique({
    where: {id: userId},
    select: {
      verifyOtp: true
    }
  });



  if (!(storedOTP?.verifyOtp) || (storedOTP.verifyOtp) !== otp) {
     res.status(400).json({ msg: "Invalid or expired OTP" });
     return
  }

  // OTP is correct -> Verify user
  await prisma.professional.update({
    where: { id: userId },
    data: { 
      isPhoneVerified: true, 
      verifyOtp: '',
      verifyOtpExpireAt: new Date(0), 
      },
  });

  res.json({ msg: "Phone number verified successfully!" });
});


/////////////////////////sendPasswordReset OTP /////////////////////////

router.post('/forgotPassword', async (req, res) => {
  const { email } = req.body;

  try {
    const existingProfessional = await prisma.professional.findUnique({
      where: { username:  email }
    });

    if (!existingProfessional) {
      res.status(400).json({ msg: "User doesn't exist. Please sign up." });
      return;
    }

    const otp = String(Math.floor(Math.random() * 900000 + 100000));

    await prisma.professional.update({
      where: {username: email },
      data: {
        resetOtp: otp,
        resetOtpExpireAt: new Date(Date.now() + 15 * 60 * 1000) // ✅ Store as DateTime
      }
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Dear Professional,

      Your OTP is ${otp}. Reset your password using this OTP. This OTP is valid for 15 minutes.
      Thank you for choosing Service Sphere! We look forward to making your life easier.

      Best regards,
      The Service Sphere Team`
    };

    await transporter.sendMail(mailOptions); // ✅ Send email
    res.status(200).json({ success: true, msg: "Password reset OTP sent successfully" });

  } catch (error) {
    console.error("Error sending reset password OTP:", error);
    res.status(500).json({ success: false, msg: "resetPasswordOTP failed", error });
  }
});





///////////////////////////////   Reset Password ////////////////////////////////////////


router.post('/VerifyOtpforgotPassword', async (req, res): Promise<void>  => {
  const { username, otp } = req.body;

  try {
    const existingProfessional = await prisma.professional.findUnique({
      where: { username }
    });

    if (!existingProfessional) {
       res.status(400).json({ msg: "User doesn't exist. Please sign up." });
       return
    }

    if (!otp || existingProfessional.resetOtp !== otp) {
       res.status(400).json({ success: false, msg: "Invalid OTP" });
       return
    }

    if (new Date(existingProfessional.resetOtpExpireAt).getTime() < Date.now()) {
       res.status(400).json({ success: false, msg: "OTP expired" });
       return
    }

    
    await prisma.professional.update({
      where: { username },
      data: {
        resetOtp: '', 
        resetOtpVerified: true 
      }
    });

    res.status(200).json({ success: true, msg: "OTP verified successfully" });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, msg: "OTP verification failed", error });
  }
});


router.post('/resetPassword', async (req, res): Promise<void>  => {
  const { username, newpassword } = req.body;

  try {
    const existingProfessional = await prisma.professional.findUnique({
      where: { username }
    });

    if (!existingProfessional) {
       res.status(400).json({ msg: "User doesn't exist. Please sign up." });
       return
    }


    if (!existingProfessional.resetOtpVerified) {
       res.status(400).json({ success: false, msg: "OTP verification required" });
       return
    }


    const hashedPassword = await bcrypt.hash(newpassword, 10);

    await prisma.professional.update({
      where: { username },
      data: {
        password: hashedPassword,
        resetOtpVerified: false, // Clear OTP verification flag
        resetOtpExpireAt: new Date(0) // Reset OTP expiration
      }
    });

    res.status(200).json({ success: true, msg: "Password reset successful" });

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, msg: "Password reset failed", error });
  }
});


export default router;
