import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";
import { subDays } from "date-fns"; // For date calculations

const router = express.Router();
const prisma = new PrismaClient();


router.get("/statsProfessional", LoginStatus, async (req: Request, res: Response): Promise<void> => {

  const professionalId = (req as any).user.professionalId;
  const email = (req as any).user.username;

  try{
    const stats = await prisma.professional.findUnique({
      where: { id: professionalId, username: email},
      select: {
      wallet: {
        select: {
          Total: true,   // Total earnings
          Pending: true, // Pending earnings
          Pay: true,
          Gst: true
        }
      },
      _count: {
        select: {
          services: true, 
          UpcommingBookings: true, 
          PastBookings: true,
        }
      }
    }
    });

      // Count only Active services separately
  const activeServicesCount = await prisma.services.count({
    where: { professionalId, isActive: "Active" }
  });

  const totalCategories = await prisma.services.groupBy({
    by: ["category"],
    where: { professionalId },
    _count: {
      category: true
    }
  });
  

  // Count completed & rejected past bookings separately
  const completedPastBookingsCount = await prisma.pastBookings.count({
    where: { professionalId, status: "Completed" }
  });

  const rejectedPastBookingsCount = await prisma.pastBookings.count({
    where: { professionalId, status: "Rejected" }
  });

  // Count distinct new customers
  const newCustomers = await prisma.pastBookings.findMany({
    where: { professionalId },
    select: { customerId: true },
    distinct: ["customerId"]
  });
  
  

  const formattedStats = {
    ...stats,
    activeServices: activeServicesCount,
    completedPastBookings: completedPastBookingsCount,
    rejectedPastBookings: rejectedPastBookingsCount,
    newCustomers: newCustomers.length,
    serviceCategories: totalCategories.length
  };

  res.status(200).json({ msg: "Professional stats fetched successfully", stats: formattedStats });

  } catch (error) {
    console.error("Error fetching professional stats:", error);
    res.status(500).json({ msg: "Error fetching professional stats", error });
  }
});





router.get("/statsAdmin", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    // Define date range for new customers and professionals (last 30 days)
    const last30Days = subDays(new Date(), 30);

    // Fetch total counts
    const totalCustomers = await prisma.customer.count();
    const totalProfessionals = await prisma.professional.count();
    const totalUpcomingBookings = await prisma.upcommingBookings.count();
    const totalPastBookings = await prisma.pastBookings.count();
    const totalServices = await prisma.services.count();

    // Fetch new customers and professionals (created in the last 30 days)
    const newCustomers = await prisma.customer.count({
      where: { createdAt: { gte: last30Days } },
    });

    const newProfessionals = await prisma.professional.count({
      where: { createdAt: { gte: last30Days } },
    });

    // Fetch booking statuses separately
    const totalCompletedBookings = await prisma.pastBookings.count({
      where: { status: "Completed" },
    });

    const totalCancelledBookings = await prisma.pastBookings.count({
      where: { status: "Cancelled" },
    });

    const totalRejectedBookings = await prisma.pastBookings.count({
      where: { status: "Rejected" },
    });

    // Fetch admin wallet details
    const adminWallet = await prisma.admin.findFirst({
      where: { id: 1 },
      select: { wallet: true, recieve: true, pay: true, totalGst: true },
    });

    // Send response
    res.status(200).json({
      status: "success",
      stats: {
        totalCustomers,
        totalProfessionals,
        newCustomers,
        newProfessionals,
        totalUpcomingBookings,
        totalPastBookings,
        totalServices,
        totalCompletedBookings,
        totalCancelledBookings,
        totalRejectedBookings,
    
      adminWallet: {
        wallet: adminWallet?.wallet || 0,
        recieve: adminWallet?.recieve || 0,
        pay: adminWallet?.pay || 0,
        totalGst: adminWallet?.totalGst || 0,
      }
      
    }});

  } catch (error) {
    console.error("Error fetching Admin stats:", error);
    res.status(500).json({ status: "error", msg: "Error fetching Admin stats", error });
  }
});






export default router;