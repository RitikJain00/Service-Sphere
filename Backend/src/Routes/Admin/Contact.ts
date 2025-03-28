import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";

const router = express.Router();
const prisma = new PrismaClient();


router.get("/allMessage",LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await prisma.contactUs.findMany({
      
      select: {
        name: true,
        email: true,
        message: true,
        date: true
      },

      orderBy: {
        date: "desc", // Fetch newest messages first
      },
    })

    

    res.status(200).json({ msg: "Contact Us Data sent successfully", messages });
  }catch(error){
    console.error("Error in fetching Contact Us Data:", error);
    res.status(500).json({ msg: "Error in fetching Contact Us Data:", error});
  }
})


router.post("/contactUsMessage", async (req: Request, res: Response): Promise<void> => {
  const {name, email, message} = req.body
  try {
    const messageData = await prisma.contactUs.create({
      data: {
        name: name,
        email: email,
        message: message,
      }
    })

    res.status(200).json({ msg: " Message Recieved", messageData });
  }catch(error){
    console.error("Error in Submitting Message:", error);
    res.status(500).json({ msg: "Error in Submitting Message:", error});
  }
})

export default router