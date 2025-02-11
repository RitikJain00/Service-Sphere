import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/createservice", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const { name, company, description, category, expireince, location, price } = req.body;


  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

  try {
    const userId = (req as any).user.professionalId; // Extract user ID from token

    const newService = await prisma.services.create({
      data: {
        name,
        company,
        description,
        category,
        expireince,
        location,
        price,
        rating: 4.5,
        booking: "0",
        professionalId: userId, 
        time: currentDate, 
      },
    });

    res.status(201).json({ msg: "Service created successfully", service: newService }); // No return statement needed
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ msg: "Error creating service", error });
  }
});


router.get("/allService", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  
  try {
    const userId = (req as any).user.professionalId; // Extract user ID from token

    const Services = await prisma.services.findMany({
      where: {professionalId: userId},
      select: {
        id: true,
        name: true,
        company: true,
        description: true,
        category: true,
        expireince: true,
        location: true,
        price: true,
        rating: true,
        booking: true,
        time: true, 
      },
    });

    res.status(201).json({ msg: "Services send successfully", service: Services });
  } catch (error) {
    console.error("Error in Fetching service:", error);
    res.status(500).json({ msg: "Error in Fetching service", error });
  }
});

router.put("/allService", LoginStatus, async (req: Request, res: Response): Promise<void> => {

  console.log(req.body)
  const {id, name, company, description, category, expireince, location, price } = req.body;
  try {
    
    const Services = await prisma.services.update({
      where: {id: id},
      data: {
        name,
        company,
        description,
        category,
        expireince,
        location,
        price,
      }
      
    })

    res.status(201).json({ msg: "Services updated successfully", service: Services});
  } catch (error) {
    console.error("Error in Updating service:", error);
    res.status(500).json({ msg: "Error in Updating service", error });
  }
});


router.delete("/allService", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  
  try {
    
    const id = (req as any).body.id;

    const Services = await prisma.services.delete({
      where: {id: id}
    })

    res.status(201).json({ msg: "Services deleted successfully", service: Services});
  } catch (error) {
    console.error("Error in Deleting service:", error);
    res.status(500).json({ msg: "Error in Deleting service", error });
  }
});

export default router;
