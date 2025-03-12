import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


import { signinSchema, signupSchema } from "../../../../Shared/Validation/AuthSchema";

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


export default router;
