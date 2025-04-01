import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";

import { transporter } from '../../Verification/Verification';

const router = express.Router();
const prisma = new PrismaClient();

const dateFormatter = (slotdate: any) => {
  const date = new Date(slotdate);
  const formattedDate = date.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit"
})
  return formattedDate
}

router.post("/createservice", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const { name, company, description, category, expireince, location, price } = req.body;


  const currentDate = new Date();
  const formattedDate = dateFormatter(currentDate)

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
        professionalId: userId, 
        time: formattedDate , 
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
        isActive: true
      },
    });

    res.status(201).json({ msg: "Services send successfully", service: Services });
  } catch (error) {
    console.error("Error in Fetching service:", error);
    res.status(500).json({ msg: "Error in Fetching service", error });
  }
});

router.put("/editService", LoginStatus, async (req: Request, res: Response): Promise<void> => {

  
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


router.put("/statusChange", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  
  try {
    
    const id = (req as any).body.id;
    const status = (req as any).body.status
    
    const newStatus = (status === "Active" ? "Inactive" : "Active");

    const Services = await prisma.services.update({
      where: {id: id},
      data: {
        isActive: newStatus
      }
    })

    res.status(201).json({ msg: "Services deleted successfully", service: Services});
  } catch (error) {
    console.error("Error in Deleting service:", error);
    res.status(500).json({ msg: "Error in Deleting service", error });
  }
});

router.get("/allBookings", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  
  try {
    const userId = (req as any).user.professionalId; // Extract user ID from token
  

    const Services = await prisma.upcommingBookings.findMany({
      where: { professionalId: userId },
      orderBy: { date: "asc" },
      select: {
        id: true,
        date: true,
        amount: true,
        payment: true,

        customer: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                name: true,
                phone: true,
                address: true,
                city: true,
                pincode: true,
                country: true,
                image: true,
              }
            }
          }
        },
        service: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });

    res.status(201).json({ msg: "Bookings send successfully", service: Services });
  } catch (error) {
    console.error("Error in Fetching Bookings:", error);
    res.status(500).json({ msg: "Error in Fetching Bookings", error });
  }
});

router.get("/pastBookings", LoginStatus, async (req: Request, res: Response): Promise<void> => {
  
  try {
    const userId = (req as any).user.professionalId; // Extract user ID from token
  

    const Services = await prisma.pastBookings.findMany({
      where: { professionalId: userId },
      orderBy: { slotdate: "asc" },
      select: {
        id: true,
        slotdate: true,
        completionDate: true,
        amount: true,
        payment: true,
        status: true,

        customer: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                name: true,
                phone: true,
                address: true,
                city: true,
                pincode: true,
                country: true,
                image: true,
              }
            }
          }
        },
        service: {
          select: {
            id: true,
            name: true,
            price: true
          },
        },
      },
    });

    res.status(201).json({ msg: "PastBookings send successfully", service: Services });
  } catch (error) {
    console.error("Error in Fetching PastBookings:", error);
    res.status(500).json({ msg: "Error in Fetching PastBookings", error });
  }
});

router.post('/completeBooking', LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const currentDate = new Date();
  const formattedDate = dateFormatter(currentDate);

  try {
    const userId = (req as any).user.professionalId; // Extract user ID from token
    const { Orderid, date, customerId, serviceId, amount, servicePrice, payment } = req.body;

    await prisma.$transaction(async (prisma) => {
      // 1. Delete Upcoming Order
      await prisma.upcommingOrders.delete({
        where: { bookingId: Orderid },
      });

      // 2. Delete Upcoming Booking
      await prisma.upcommingBookings.delete({
        where: { id: Orderid },
      });

      // 3. Create Past Booking
      await prisma.pastBookings.create({
        data: {
          slotdate: date,
          completionDate: formattedDate,
          professionalId: userId,
          customerId: customerId,
          serviceId: serviceId,
          amount: amount,
          payment: payment,
          status: 'Completed',
        },
      });

      // 4. Create Past Order
      await prisma.pastOrders.create({
        data: {
          slotDate: date,
          completionDate: formattedDate,
          amount: amount,
          payment: payment,
          status: 'Completed',
          customerId: customerId,
          serviceId: serviceId,
        },
      });

      // 5. Maintain Cash Flow
      if (payment !== 'COD') {
        // Fetch the professional's current wallet balance
        const wallet = await prisma.professionalWallet.findUnique({
          where: { professionalId: userId },
          select: { Pending: true },
        });

        // Calculate the new pending balance
        const newPending = (wallet?.Pending || 0) + amount;

        // Update the professional's wallet balance
        await prisma.professionalWallet.upsert({
          where: { professionalId: userId },
          update: { Pending: newPending },
          create: { professionalId: userId, Pending: amount },
        });

        // Fetch current admin balance
        const admin = await prisma.admin.findUnique({
          where: { id: 1 },
          select: { pay: true, totalGst: true, wallet: true },
        });

        // Calculate the new values
        const newPay = (admin?.pay || 0) + amount;
        const newGst = (admin?.totalGst || 0) + serviceId * 0.18;
        const newWallet = (admin?.wallet || 0) + (serviceId - serviceId * 0.10);

        // Update the admin's balance
        await prisma.admin.update({
          where: { id: 1 },
          data: { pay: newPay, totalGst: newGst, wallet: newWallet },
        });
      } else {
        // Fetch the professional's wallet balance
        const wallet = await prisma.professionalWallet.findUnique({
          where: { professionalId: userId },
          select: { Pay: true, Gst: true, Total: true },
        });

        // Calculate the new values
        const newPay = (wallet?.Pay || 0) + servicePrice * 0.25;
        const newGst = (wallet?.Gst || 0) + servicePrice * 0.18;
        const newTotal = (wallet?.Total || 0) + servicePrice + servicePrice * 0.18 - servicePrice * 0.10;

        // Update the professional's wallet balance
        await prisma.professionalWallet.upsert({
          where: { professionalId: userId },
          update: { Pay: newPay, Gst: newGst, Total: newTotal },
          create: { professionalId: userId, Pay: newPay, Gst: newGst, Total: newTotal },
        });

        // Fetch admin balance
        const admin = await prisma.admin.findUnique({
          where: { id: 1 },
          select: { recieve: true },
        });

        // Calculate new receive amount
        const newReceive = (admin?.recieve || 0) + servicePrice * 0.25 + servicePrice * 0.18;

        // Update admin balance
        await prisma.admin.update({
          where: { id: 1 },
          data: { recieve: newReceive },
        });
      }
    });

    res.json({ msg: 'Service Completed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});


router.post('/rejectBooking', LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const currentDate = new Date();
  const formattedDate = dateFormatter(currentDate);

  try {
    const userId = (req as any).user.professionalId; // Extract user ID from token
    const { Orderid, date, customerId,customerName,customerEmail,serviceName,company, serviceId, servicePrice, amount, payment } = req.body;

    await prisma.$transaction(async (prisma) => {
      // 1. Delete Upcoming Order
      await prisma.upcommingOrders.delete({
        where: { bookingId: Orderid },
      });

      // 2. Delete Upcoming Booking
      await prisma.upcommingBookings.delete({
        where: { id: Orderid },
      });

      // 3. Create Past Booking (Mark as Rejected)
      await prisma.pastBookings.create({
        data: {
          slotdate: date,
          completionDate: formattedDate,
          professionalId: userId,
          customerId: customerId,
          serviceId: serviceId,
          amount: amount,
          payment: payment,
          status: 'Rejected',
        },
      });

      // 4. Create Past Order (Mark as Rejected)
      await prisma.pastOrders.create({
        data: {
          slotDate: date,
          completionDate: formattedDate,
          amount: amount,
          payment: payment,
          status: 'Rejected',
          customerId: customerId,
          serviceId: serviceId,
        },
      });

      // 5. Maintain Cash Flow
      if (payment !== 'COD') {
        // Fetch current admin balance
        const admin = await prisma.admin.findUnique({
          where: { id: 1 },
          select: { pay: true },
        });

        // Calculate new pay balance
        const newPay = (admin?.pay || 0) + (servicePrice + servicePrice * 0.18 - servicePrice * 0.10);

        // Update admin balance
        await prisma.admin.update({
          where: { id: 1 },
          data: { pay: newPay },
        });

        // Fetch customer wallet balance
        const customerWallet = await prisma.customerWallet.findUnique({
          where: { customerId: customerId },
          select: { Pending: true },
        });

        // Calculate new pending balance
        const newPending = (customerWallet?.Pending || 0) + servicePrice;

        // Update customer wallet balance
        await prisma.customerWallet.upsert({
          where: { customerId: customerId },
          update: { Pending: newPending },
          create: { customerId: customerId, Pending: servicePrice },
        });
      }
    });

 
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: customerEmail,
      Subject: 'Your Service Sphere Booking Has Been Rejected',
      text: `Dear ${customerName},

      We regret to inform you that your booking request for ${serviceName} - ${company} has been rejected by the professional.

      If you have already made a payment, a refund will be initiated and processed within 3-5 business days.
      
      We understand this may be inconvenient, and we encourage you to explore other available professionals on Service Sphere to find the right fit for your needs.
      
      💡 Need assistance? Our support team is always here to help! Contact us anytime at ${process.env.SENDER_EMAIL}.
      
      Thank you for choosing Service Sphere. We hope to assist you with another booking soon!
      
      Best regards,
      The Service Sphere Team`
    }

    await transporter.sendMail(mailOptions)    // send the mail

    res.json({ msg: 'Order Rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});


router.post('/cancelBooking', LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const currentDate = new Date();
  const formattedDate = dateFormatter(currentDate);

  try {
    const userId = (req as any).user.customerId; // Extract user ID from token
    const username = (req as any).user.username
    const { id, date, amount, payment, serviceId,serviceName,serviceCompany, professionalId, servicePrice } = req.body;

    await prisma.$transaction(async (prisma) => {
      // 1. Delete Upcoming Order
      const deletedOrder = await prisma.upcommingOrders.delete({
        where: { bookingId: id },
        select: { bookingId: true },
      });

      // 2. Delete Upcoming Booking
      await prisma.upcommingBookings.delete({
        where: { id: deletedOrder.bookingId },
      });

      // 3. Create Past Booking (Mark as Cancelled)
      await prisma.pastBookings.create({
        data: {
          slotdate: date,
          completionDate: formattedDate,
          professionalId: professionalId,
          customerId: userId,
          serviceId: serviceId,
          amount: amount,
          payment: payment,
          status: 'Cancelled',
        },
      });

      // 4. Create Past Order (Mark as Cancelled)
      await prisma.pastOrders.create({
        data: {
          slotDate: date,
          completionDate: formattedDate,
          amount: amount,
          payment: payment,
          status: 'Cancelled',
          customerId: userId,
          serviceId: serviceId,
        },
      });

      // 5. Maintain Cash Flow
      if (payment !== 'COD') {
        // Fetch current admin balance
        const admin = await prisma.admin.findUnique({
          where: { id: 1 },
          select: { pay: true },
        });

        // Calculate new pay balance
        const newPay = (admin?.pay || 0) + (servicePrice + servicePrice * 0.18 - servicePrice * 0.10);

        // Update admin balance
        await prisma.admin.update({
          where: { id: 1 },
          data: { pay: newPay },
        });

        // Fetch customer wallet balance
        const customerWallet = await prisma.customerWallet.findUnique({
          where: { customerId: userId },
          select: { Pending: true },
        });

        // Calculate new pending balance
        const newPending = (customerWallet?.Pending || 0) + servicePrice;

        // Update customer wallet balance
        await prisma.customerWallet.upsert({
          where: { customerId: userId },
          update: { Pending: newPending },
          create: { customerId: userId, Pending: servicePrice },
        });
      }
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: username,
      Subject:  'Your Service Sphere Booking Has Been Canceled',
      text: `Dear Customer,

      We’re sorry to see your booking canceled. Your request for ${serviceName} - ${serviceCompany} has been successfully canceled.
      
      If this was a mistake or if you need to reschedule, feel free to book again anytime.
      
      💡 Need assistance? Our support team is always here to help! Contact us anytime at ${process.env.SENDER_EMAIL}.
      
      Thank you for considering Service Sphere. We hope to serve you in the future!
      
      Best regards,
      The Service Sphere Team`
    }

    await transporter.sendMail(mailOptions)    // send the mail

    res.json({ msg: 'Booking Cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});




export default router;
