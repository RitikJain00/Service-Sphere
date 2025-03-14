import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";

const router = express.Router();
const prisma = new PrismaClient();

// GET Profile
router.get("/profile", LoginStatus, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.customerId; // Extract user ID from request
  
    
    const userProfile = await prisma.customer.findUnique({
      where: { id: userId },
      select: {

        profile: {
          select: {
            name: true,
            description: true,
            image: true,
            phone: true,
            address: true,
            city: true,
            pincode: true,
            country: true,
          }
        },
        wallet: {
          select: {
            Total: true
          }
        },
        username: true,
        isEmailVerified: true,
        isPhoneVerified: true
       
      },
    });


      res.json({ msg: "Profile Fetch  Successfull",userProfile }); 
     
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


router.put("/wallet", LoginStatus, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.customerId; 
    const { amount } = req.body;

    const updatedWallet = await prisma.customerWallet.upsert({
      where: { customerId: userId },
      update: {
        Total: {
          increment: parseInt(amount), // Add the new amount
        },
      },
      create: {
        customerId: userId,
        Total: parseInt(amount), 
      },
    });

    res.status(200).json({ msg: "Wallet updated successfully", updatedWallet });
  } catch (error) {
    console.error("Error updating wallet", error);
    res.status(500).json({ msg: "Internal server error", error });
  }
});

router.put("/walletOrder", LoginStatus, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.customerId; 
    const { Grandtotal } = req.body;

    const updatedWallet = await prisma.customerWallet.update({
      where: { customerId: userId },

      data: {
        Total: {
         decrement: parseInt(Grandtotal), // Add the new amount
        },
      }
  
    });

    res.status(200).json({ msg: "Wallet updated successfully", updatedWallet });
  } catch (error) {
    console.error("Error updating wallet", error);
    res.status(500).json({ msg: "Internal server error", error });
  }
});

export default router;
