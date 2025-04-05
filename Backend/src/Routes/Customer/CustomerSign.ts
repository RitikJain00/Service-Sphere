import express, { Request, Response }  from 'express'
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { signinSchema, signupSchema } from '@craiber/servicesphere-common';

import LoginStatus from '../../Middleware/CheckLoginStatus';
import { transporter } from '../../Verification/Verification';
import { sendOTPPhone } from '../../Verification/Verification';



const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "RitikJain"



router.post('/signup' , async (req : Request , res: Response) => {

  const {name, username, password } = req.body;

  const validateData = signupSchema.safeParse(req.body);

  if(!validateData.success){
    res.json({msg: "Invalid Input"})
    return
  }
  try{
    const existingCustomer = await prisma.customer.findUnique({
      where: {username}
     })

     if(existingCustomer) {
      res.status(400).json({
        msg: "User Already Exist Please Sign in"
      })
      return
     }

     const hashedPassword = await bcrypt.hash(password,10)
      
   
      const newCustomer = await prisma.customer.create({
        data: { 
          username: username,
           password:  hashedPassword,
          profile: {
            create: {
              name: name,
              description: null! as string,
              image: null! as string, 
              phone: null! as string,
              address: null! as string,    
              city: null! as string,     
              pincode: null! as string,    
              country: null! as string,
          
            }
          },
        },
      })

      const cart = await prisma.cart.create({
        data: {
          customerId:  newCustomer.id, 
        }
      });
  
      const favorate = await prisma.favorite.create({
        data: {
          customerId:  newCustomer.id, 
        }
      });

      const wallet = await prisma.customerWallet.create({
        data: {
          customerId:  newCustomer.id, 
        }
      });

     
      const token = jwt.sign({customerId: newCustomer.id,username: newCustomer.username }, JWT_SECRET, {
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
        subject: 'Welcome to Service Sphere – Your One-Stop Solution for Home Services!',
        text: `Dear ${name},

        Welcome to Service Sphere! 🎊 We're thrilled to have you on board.
        
        At Service Sphere, we make it easy for you to find and book trusted electricians, plumbers, carpenters, pest control experts, painters, house cleaners, and many other professionals—all in one place.
        
        What's Next?
        ✅ Explore Services - Browse and book services tailored to your needs.
        ✅ Manage Bookings - Track your orders and upcoming appointments seamlessly.
        ✅ Secure Payments - Enjoy hassle-free transactions with multiple payment options.
        
        💡 Need help? Our support team is here for you! Contact us anytime at ${process.env.SENDER_EMAIL}.
        
        Thank you for choosing Service Sphere! We look forward to making your life easier.
        
        Best regards,
        The Service Sphere Team`
      }

      await transporter.sendMail(mailOptions)    // send the mail

      res.status(201).json({
        msg: "Signup successful",
        token,
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ msg: "Internal server error" });
    }

});


////////////////////////////  SignIn   ///////////////////////////////////////////

router.post('/signin' , async (req,res) => {

  const {username , password} = req.body;

  const validateData = signinSchema.safeParse(req.body);

  if(!validateData.success){
    res.json({msg: "Invalid Input"})
    return
  }

  try{
    const existingCustomer = await prisma.customer.findUnique({
      where: {username}
     })

     if(!existingCustomer) {
      res.status(400).json({
        msg: "User Does'nt Exist. Please Sign Up"
      })
      return;
     }

     const isPasswordValid = await bcrypt.compare(password, existingCustomer.password );
      
     if(!isPasswordValid){
      res.status(401).json({msg: "Invalid Username or Password"})
      return
    }
   
    const token = jwt.sign({customerId: existingCustomer.id,username: existingCustomer.username }, JWT_SECRET, {
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
      professional: { customerId: existingCustomer.id, username: existingCustomer.username },
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
  const userId = (req as any).user.customerId;
  const username = (req as any).user.username
  const { emailOrphone }= req.body


  const existingCustomer = await prisma.customer.findUnique({
    where: {username}
   })

  if(emailOrphone === 'Email' && existingCustomer?.isEmailVerified){
    res.status(500).json({success: false, msg: 'Email is alredy verified'})
    return
  }
  
  if(emailOrphone === 'Phone' && existingCustomer?.isPhoneVerified){
    res.status(500).json({success: false, msg: 'Phone is alredy verified'})
    return
  }

  const otp = String(Math.floor(Math.random()*900000 + 100000) )
 
  
 const customer =  await prisma.customer.update({
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
      text: `Dear ${customer.profile?.name},
  
      Your OTP is ${otp}. Verify your Account using this OTP. This OPT is Valid for 24 hours from now onowrds.
      Thank you for choosing Service Sphere! We look forward to making your life easier.
      
      Best regards,
      The Service Sphere Team`
    }
    
    await transporter.sendMail(mailOptions)    // send the mail
    res.status(200).json({success: true, msg: "Verify Otp send Successfull"})
  }else {
    const phoneNumberObj = await prisma.customerProfile.findUnique({
      where: { customerId: userId },
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
  const userId = (req as any).user.customerId;
  const { otp } = req.body; // ✅ Extract OTP properly
 
  if (!otp) {
    res.status(400).json({ success: false, msg: "OTP is not present" });
    return;
  }

  try {
    const existingCustomer = await prisma.customer.findUnique({
      where: {id: userId },
    });
  

    if (!existingCustomer) {
      res.status(400).json({ msg: "User doesn't exist. Please sign up" });
      return;
    }

    if (!existingCustomer.verifyOtp || existingCustomer.verifyOtp !== otp) { // ✅ Fix string comparison
      res.status(400).json({ success: false, msg: "Invalid OTP" });
      return;
    }

  

    if (new Date(existingCustomer.verifyOtpExpireAt) < new Date()) { // ✅ Fix timestamp comparison
      res.status(400).json({ success: false, msg: "OTP Expired" });
      return;
    }

    await prisma.customer.update({
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

  const userId = (req as any).user.customerId;

  const {  otp } = req.body;
 
  // Fetch OTP from DB/Cache (implement this function)
  const storedOTP = await prisma.customer.findUnique({
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
  await prisma.customer.update({
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
    const existingCustomer = await prisma.customer.findUnique({
      where: { username:  email }
    });

    if (!existingCustomer) {
      res.status(400).json({ msg: "User doesn't exist. Please sign up." });
      return;
    }

    const otp = String(Math.floor(Math.random() * 900000 + 100000));

    await prisma.customer.update({
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
      text: `Dear Customer,

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
    const existingCustomer = await prisma.customer.findUnique({
      where: { username }
    });

    if (!existingCustomer) {
       res.status(400).json({ msg: "User doesn't exist. Please sign up." });
       return
    }

    if (!otp || existingCustomer.resetOtp !== otp) {
       res.status(400).json({ success: false, msg: "Invalid OTP" });
       return
    }

    if (new Date(existingCustomer.resetOtpExpireAt).getTime() < Date.now()) {
       res.status(400).json({ success: false, msg: "OTP expired" });
       return
    }

    
    await prisma.customer.update({
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
    const existingCustomer = await prisma.customer.findUnique({
      where: { username }
    });

    if (!existingCustomer) {
       res.status(400).json({ msg: "User doesn't exist. Please sign up." });
       return
    }


    if (!existingCustomer.resetOtpVerified) {
       res.status(400).json({ success: false, msg: "OTP verification required" });
       return
    }


    const hashedPassword = await bcrypt.hash(newpassword, 10);

    await prisma.customer.update({
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








router.get('/checkLogin', LoginStatus, async (req,res) => {
  res.status(200).json({msg: "Logged In"})
})





export default router;