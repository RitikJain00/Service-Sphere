import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";

const router = express.Router();
const prisma = new PrismaClient();


router.get("/allCustomers",LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    
    const Customers = await prisma.customer.findMany({
      select: {
        id: true,
        username: true,

        profile: {
          select: {
            name: true,
            image: true,
            phone: true,
            address: true,
            city: true,
            pincode: true,
            country: true
          }
        },
        wallet: {
          select: {
            Pending: true,
          }
        },

        // Count only active services
        _count: {
          select: {
            orders: true
          }
        }
      }
    });

    // Get completed and rejected booking counts for each professional
    const customersWithCounts = await Promise.all(
      Customers.map(async (customer) => {
        const completedCount = await prisma.pastOrders.count({
          where: {
            customerId: customer.id,
            status: "Completed",
          }
        });

        const rejectedCount = await prisma.pastOrders.count({
          where: {
            customerId: customer.id,
            status: "Cancelled",
          }
        });

        return {
          ...customer,
          completedPastBookings: completedCount,
          rejectedPastBookings: rejectedCount
        };
      })
    );

    res.status(200).json({ msg: "Customer List sent successfully", service: customersWithCounts });
  } catch (error) {
    console.error("Error in fetching Customer List:", error);
    res.status(500).json({ msg: "Error in fetching Customer List", error });
  }
});

export default router;