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
      const existingAdmin = await prisma.admin.findUnique({
        where: { username },
      });

      if (existingAdmin) {
        res.status(400).json({ msg: "Admin already exists. Please sign in." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password,10)

      const newAdmin = await prisma.admin.create({
        data: { 
          username,
          password: hashedPassword,
          name: name
          }
      });
      

      const token = jwt.sign({AdminId: newAdmin.id,username: newAdmin.username }, JWT_SECRET, {
        expiresIn: "7d"
      });
      res.status(201).json({
        msg: "Signup successful",
        Admin: { AdminId: newAdmin.id, username: newAdmin.username},
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
      const existingAdmin = await prisma.admin.findUnique({
        where: {username}
      })

      if(!existingAdmin){
        res.status(400).json({ msg: "Admin Does'nt Exist. Please Contact Support Team" })
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, existingAdmin.password );

      if(!isPasswordValid){
        res.status(401).json({msg: "Invalid Username or Password"})
        return
      }

      const token = jwt.sign({ AdminId: existingAdmin.id, username: existingAdmin.username }, JWT_SECRET, {
        expiresIn: "7d", // Token expires in 1 day
      });
  
      res.status(200).json({
        msg: "Signin successful",
        Admin: { AdminId: existingAdmin.id, username: existingAdmin.username },
        token,
      });
    } catch (error) {
      console.error("Error during signin:", error);
      res.status(500).json({ msg: "Internal server error" });
    }

  });


export default router;
