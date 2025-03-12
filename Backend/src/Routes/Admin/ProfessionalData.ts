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
            Pay: true,
            Gst: true,
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


router.get("/professionalPendingPayment",LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    
    const professionalPendingPayment = await prisma.professional.findMany({
      where: {
        wallet: {
          Pending: {
            gt: 0, 
          },
        },
      },
      orderBy: {
        wallet: {
          Pending: 'desc', // Sort by Pending amount in descending order
        },
      },
      select: {
        id: true,
        username: true,

        profile: {
          select: {
            name: true,
            phone: true,
          }
        },
        wallet: {
          select: {
            Pending: true,
          }
        },
      }
  
  });

    res.status(200).json({ msg: "Professional List sent successfully", professional: professionalPendingPayment});
  } catch (error) {
    console.error("Error in fetching Professional Payment Pending List:", error);
    res.status(500).json({ msg: "Error in fetching Professional Payment Pending List", error });
  }
});


router.post("/professionalPayment", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const { amount, professionalId } = req.body;

  try {
    await prisma.$transaction(async (prisma) => {
      // 1. Update Professional Wallet
      await prisma.professionalWallet.upsert({
        where: { professionalId: professionalId },
        update: {
          Pending: 0,
          Total: {
            increment: amount,
          },
        },
        create: {
          professionalId: professionalId,
          Pending: 0,
          Total: amount,
        },
      });

      // 2. Update Admin Wallet
      await prisma.admin.update({
        where: { id: 1 },
        data: {
          
          wallet: {
            decrement: amount, 
          },
          pay: {
            decrement: amount, 
          },
        },
      });
    });

 
    res.json({ success: true, msg: "Payment processed successfully!" });

  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ success: false, msg: "Something went wrong during payment processing." });
  }
});

export default router;