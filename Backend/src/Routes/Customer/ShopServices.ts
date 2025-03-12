import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";

const router = express.Router();
const prisma = new PrismaClient();



//  Services

router.get("/allService", async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceCategory = req.query.category as string || "Explore"; 
 
    const Services = await prisma.services.findMany({
      where: { 
        isActive: "Active",
        ...(serviceCategory !== "Explore" && { category: serviceCategory }),
      },
      select: {
        id: true,
        name: true,
        company: true,
        description: true,
        category: true,
        expireince: true,  // Ensure correct spelling
        location: true,
        price: true,
        rating: true,
        booking: true,
        time: true,       
    }
    });

    res.status(200).json({ msg: "Services sent successfully", service: Services });
  } catch (error) {
    console.error("Error in fetching services:", error);
    res.status(500).json({ msg: "Error in fetching services", error });
  }
});


// Cart Section

router.post("/addToCart", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.customerId;
    const { id, price } = req.body;
    
    const gst = (18 / 100) * price;
    const discount = (10 / 100) * price;

    const response = await prisma.cart.upsert({
      where: { customerId: userId },

      update: {
        services: {
          connect: { id: id },
        },
        total: {
          increment: price,
        },
        gst: {
          increment: gst, 
        },
        discount: {
          increment: discount, 
        }
      },

      create: {
        customerId: userId, 
        total: price, 
        gst: gst, 
        discount: discount, 
        services: {
          connect: { id: id }, 
        }
      }
    });

    res.status(200).json({ message: "Service added to cart successfully", response });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add service to cart" });
  }
});


router.put("/deleteFromCart",LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.customerId;
    const { id,price } = req.body;
    const gst = (18/100)*price;
    const discount = (10/100)*price;
    const response = await prisma.cart.update({
      where: {customerId: userId}, 
      data: {
        services: {
          disconnect: { id: id }, 
        },
        total: {
          decrement: price
        },
        gst: {
          decrement: gst
        },
        discount: {
          decrement: discount
        }
      }  
    })
    res.status(200).json({ message: "Service deleted from cart successfully", response });
  }catch(error){
    console.error("Error in deleting from cart:", error);
    res.status(500).json({ error: "Failed to delete service from cart" });
  }
});

router.get("/cartItems",LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.customerId;

    const data = await prisma.cart.findUnique({
      where: {customerId: userId}, 
      select: {
        services: true,
        total: true,
        gst: true,
        discount: true
      }
    })
    res.status(200).json({ message: "Service Fetch successfully", cartInfo: data });
  }catch(error){
    console.error("Error in fetching Cart:", error);
    res.status(500).json({ error: "Error in fetching Cart:" });
  }
});


// Favorate Section


router.post("/addToFavorate",LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.customerId;
    const { id, price } = req.body;
    const response = await prisma.cart.update({
      where: {customerId: userId}, 
      data: {
        services: {
          connect: { id: id }, 
        },

      }
      
    })

    res.status(200).json({ message: "Service added to Favorate successfully", response });
  }catch(error){
    console.error("Error adding to  Favorates:", error);
    res.status(500).json({ error: "Failed to add service in  Favorates" });
  }
});

router.put("/deleteFromFavorate",LoginStatus, async (req: Request, res: Response): Promise<void> => {
try {
const userId = (req as any).user.customerId;
const { id,price } = req.body;
const response = await prisma.cart.update({
  where: {customerId: userId}, 
  data: {
    services: {
      disconnect: { id: id }, 
    },
 
  }
  
})

res.status(200).json({ message: "Service deleted from  Favorates successfully", response });
}catch(error){
console.error("Error in deleting from  Favorates:", error);
res.status(500).json({ error: "Failed to delete service from  Favorates" });
}
});

router.get("/favorateItems",LoginStatus, async (req: Request, res: Response): Promise<void> => {
try {
const userId = (req as any).user.customerId;
const data = await prisma.cart.findUnique({
  where: {customerId: userId}, 
  select: {
    services: true,
  }
})

res.status(200).json({ message: "Favorate Items Fetch successfully", UpcommingBookingInfo: data });

}catch(error){
console.error("Error in fetching Favorate Items:", error);
res.status(500).json({ error: "Error in fetching Favorate Items:" });
}
});


router.get("/UpcommingOrders",LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
  const userId = (req as any).user.customerId;
  
  const data = await prisma.upcommingOrders.findMany({
    where: {customerId: userId}, 
    select: {
      id: true,
      date: true,
      amount: true,
      payment: true,
      service: true,
     
    }
  })

res.status(200).json({ message: "Upcomming Bookings Fetch successfully", UpcommingBookingInfo: data });
}catch(error){
console.error("Error in fetching Upcomming Bookings:", error);
res.status(500).json({ error: "Error in fetching Upcomming Bookings:" });
}
});



export default router;
