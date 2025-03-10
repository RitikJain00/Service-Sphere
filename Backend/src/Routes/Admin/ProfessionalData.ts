import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";

const router = express.Router();
const prisma = new PrismaClient();


router.get("/allProfessionals",LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    
    const Professionals = await prisma.professional.findMany({
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
            services: {
              where: {
                isActive: "Active"
              }
            }
          }
        }
      }
    });

    // Get completed and rejected booking counts for each professional
    const professionalsWithCounts = await Promise.all(
      Professionals.map(async (pro) => {
        const completedCount = await prisma.pastBookings.count({
          where: {
            professionalId: pro.id,
            status: "Completed",
          }
        });

        const rejectedCount = await prisma.pastBookings.count({
          where: {
            professionalId: pro.id,
            status: "Rejected",
          }
        });

        return {
          ...pro,
          completedPastBookings: completedCount,
          rejectedPastBookings: rejectedCount
        };
      })
    );

    res.status(200).json({ msg: "Professional List sent successfully", service: professionalsWithCounts });
  } catch (error) {
    console.error("Error in fetching Professional List:", error);
    res.status(500).json({ msg: "Error in fetching Professional List", error });
  }
});

export default router;