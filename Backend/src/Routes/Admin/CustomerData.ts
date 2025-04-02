import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";

const router = express.Router();
const prisma = new PrismaClient();

import { transporter } from '../../Verification/Verification';

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


router.get("/customersPendingPayment",LoginStatus, async (req: Request, res: Response): Promise<void> => {
  try {
    
    const customersPendingPayment = await prisma.customer.findMany({
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

    res.status(200).json({ msg: "Customer List sent successfully", customers: customersPendingPayment});
  } catch (error) {
    console.error("Error in fetching Customer Payment Pending List:", error);
    res.status(500).json({ msg: "Error in fetching Customer Payment Pending List", error });
  }
})


router.post("/customersPayment", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const { amount, customerId,email,name } = req.body;

  try {
    await prisma.$transaction(async (prisma) => {
      // 1. Update Customer Wallet
      await prisma.customerWallet.upsert({
        where: { customerId: customerId },
        update: {
          Pending: 0,
          Total: {
            increment: amount + amount * 0.18 - amount * 0.10,
          },
        },
        create: {
          customerId: customerId,
          Pending: 0,
          Total: amount + amount * 0.18 - amount * 0.10,
        },
      });

      // 2. Update Admin Wallet
      await prisma.admin.update({
        where: { id: 1 },
        data: {
          totalGst: {
            decrement: Math.max(amount * 0.18, 0), 
          },
          wallet: {
            decrement: Math.max(amount - amount * 0.10, 0), 
          },
          pay: {
            decrement: Math.max(amount + amount * 0.18 - amount * 0.10, 0), 
          },
        },
      });
    });


    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: ' Your Refund Has Been Added to Your Service Sphere Wallet!',
      text: `Dear ${name},

      We wanted to let you know that your refund has been successfully processed and added to your Service Sphere Wallet. 🎉
      
      Refund Details:
      Amount Refunded: ₹${amount + amount * 0.18 - amount * 0.10}
      
      Expected Reflection Time: Within 24 hours
      
      You can use this balance for future bookings on our platform. To check your wallet balance, simply log in to your account and navigate to the Profile section where you find balance in your wallet.
      
      💡 Need Assistance? Our support team is here to help! If you have any questions, feel free to contact us at ${process.env.SENDER_EMAIL}.
      
      Thank you for choosing Service Sphere! We look forward to serving you again.
      
      Best regards,
      The Service Sphere Team`
    }

    await transporter.sendMail(mailOptions)    // send the mail

 
    res.json({ success: true, msg: "Payment processed successfully!" });

  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ success: false, msg: "Something went wrong during payment processing." });
  }
});


export default router;