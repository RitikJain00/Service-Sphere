import express, { Request, Response } from "express";
import Razorpay from "razorpay";
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";

const router = express.Router();
const prisma = new PrismaClient();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY as string,
  key_secret: process.env.RAZORPAY_API_SECRET as string,
  
});

router.get("/getKey", async (req: Request, res: Response) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

router.post("/process", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.customerId;
    const username = (req as any).user.username;
    const { Grandtotal } = req.body;

    if (!Grandtotal || isNaN(Grandtotal) || Grandtotal <= 0) {
      res.status(400).json({ message: "Invalid Grandtotal amount" });
      return;
    }


    // Fetch user details
    const customer = await prisma.customerProfile.findUnique({
      where: { customerId: userId },
      select: { name: true, phone: true },
    });

    if (!customer) {
      res.status(400).json({ message: "Complete your profile first" });
      return;
    }

    // Define Razorpay order options
    const options = {
      amount: Grandtotal * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${userId}_${Date.now()}`,
      notes: { customerId: userId, email: username },
    };

    // Create order
    const order = await instance.orders.create(options);


    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Error processing payment" });
  }
});

export default router;
