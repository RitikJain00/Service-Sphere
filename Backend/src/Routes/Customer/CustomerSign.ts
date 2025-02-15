import express, { Request, Response }  from 'express'
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { signupSchema, signinSchema } from "../../../../Shared/Validation/AuthSchema";


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
     
      const token = jwt.sign({customerId: newCustomer.id,username: newCustomer.username }, JWT_SECRET, {
        expiresIn: "7d"
      });

      res.status(201).json({
        msg: "Signup successful",
        professional: { customerId: newCustomer.id, username: newCustomer.username },
        token,
        Cart: {id: cart.id ,cid: cart.customerId},
        favorateId: {id: favorate.id ,cid: favorate.customerId}
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ msg: "Internal server error" });
    }

});

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



export default router;