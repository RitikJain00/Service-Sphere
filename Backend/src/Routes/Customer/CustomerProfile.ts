import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";

const router = express.Router();
const prisma = new PrismaClient();

// GET Profile
router.get("/profile", LoginStatus, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.customerId; // Extract user ID from request
    const email = (req as any).user.username;
    
    const userProfile = await prisma.customerProfile.findUnique({
      where: { customerId: userId },
      select: {
        name: true,
        description: true,
        phone: true,
        address: true,
        city: true,
        pincode: true,
        country: true,
      },
    });
    console.log(userProfile)
    if (!userProfile) {
       res.status(404).json({ msg: "User profile not found" });
       return
    }
      res.json({ ...userProfile, username: email }); 
     
  } catch (error) {
    console.error("Error fetching profile:", error);
     res.status(500).json({ msg: "Internal server error" });
     return
  }
});

// UPDATE Profile
router.put("/profile", LoginStatus, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.customerId; // Extract user ID
    const { basic, contact, address} = req.body;

    const updatedProfile = await prisma.customerProfile.update({
      where: { customerId: userId },
      data: {
        name: basic.name,
        description: basic.about,
        phone: contact.phone,
        address: address.home,
        city: address.city,
        pincode: address.pin,
        country: address.country,
      },
    });

    res.json({ msg: "Profile updated successfully", updatedProfile });
    return 
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ msg: "Internal server error" });
    return 
  }
});

export default router;
