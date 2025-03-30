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

    // Calculate GST and discount
    const gst = (18 / 100) * price;
    const discount = (10 / 100) * price;

    await prisma.$transaction(async (prisma) => {
      // Fetch the current cart if it exists
      const existingCart = await prisma.cart.findUnique({
        where: { customerId: userId },
        select: { total: true, gst: true, discount: true },
      });

      if (existingCart) {
        // Update existing cart
        await prisma.cart.update({
          where: { customerId: userId },
          data: {
            services: {
              connect: { id: id },
            },
            total: existingCart.total + price,
            gst: existingCart.gst + gst,
            discount: existingCart.discount + discount,
          },
        });
      } else {
        // Create new cart
        await prisma.cart.create({
          data: {
            customerId: userId,
            total: price,
            gst: gst,
            discount: discount,
            services: {
              connect: { id: id },
            },
          },
        });
      }
    });

    res.status(200).json({ message: "Service added to cart successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add service to cart" });
  }
});



router.put("/deleteFromCart", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.customerId;
    const { id, price } = req.body;

    // Calculate GST and discount
    const gst = (18 / 100) * price;
    const discount = (10 / 100) * price;

    await prisma.$transaction(async (prisma) => {
      // Fetch existing cart details
      const existingCart = await prisma.cart.findUnique({
        where: { customerId: userId },
        select: { total: true, gst: true, discount: true, services: true },
      });

      if (!existingCart) {
        throw new Error("Cart not found");
      }

      // Ensure the service exists in the cart before attempting to remove
      const isServiceInCart = existingCart.services.some(service => service.id === id);
      if (!isServiceInCart) {
        throw new Error("Service not found in cart");
      }

      // Update the cart
      await prisma.cart.update({
        where: { customerId: userId },
        data: {
          services: {
            disconnect: { id: id },
          },
          total: existingCart.total > price ? { decrement: price } : 0,
          gst: existingCart.gst > gst ? { decrement: gst } : 0,
          discount: existingCart.discount > discount ? { decrement: discount } : 0,
        },
      });
    });

    res.status(200).json({ message: "Service deleted from cart successfully" });
  } catch (error) {
    console.error("Error in deleting from cart:", error);
    res.status(500).json({ error: error|| "Failed to delete service from cart" });
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
    const { id } = req.body;
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

res.status(200).json({ message: "Favorate Items Fetch successfully", favorateInfo: data });

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

router.get("/PastOrders",LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
  const userId = (req as any).user.customerId;
  
  const data = await prisma.pastOrders.findMany({
    where: {customerId: userId}, 
    select: {
      id: true,
      slotDate: true,
      completionDate: true,
      amount: true,
      status: true,
      payment: true,
      service: true,
    }
  })

res.status(200).json({ message: "PastOrders Fetch successfully", PastOrders: data });
}catch(error){
console.error("Error in fetching PastOrders:", error);
res.status(500).json({ error: "Error in fetching PastOrders" });
}
});

router.get("/Orders",LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
  const userId = (req as any).user.customerId;
  
  const data = await prisma.orders.findMany({
    where: {customerId: userId}, 
    orderBy: {
      bookedDate: "desc"
    },
    select: {
      id: true,
     total: true,
     gst: true,
     discount: true,
     grandTotal: true,
     payment:    true,
     bookedDate: true,

      services: {
        select: {
          date: true,
          service: true
          }
        }
      }
    })

res.status(200).json({ message: "Orders Fetch successfully", Orders: data });
}catch(error){
console.error("Error in fetching Orders:", error);
res.status(500).json({ error: "Error in fetching Orders:" });
}
});



export default router;
