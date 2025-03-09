import express, { Request, Response } from "express";
import Razorpay from 'razorpay';
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";

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

router.post('/order', LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const currentDate = new Date();
  const formattedDate = dateFormatter(currentDate)
  
  try {
    const userId = (req as any).user.customerId;
    const { cart, paymentMode, total, gst, discount } = req.body;


    await prisma.$transaction(async (prisma) => {

    // 1. Create Upcoming Bookings
const createdBookings = await Promise.all(
  cart.map(async (service: any) => {
    return prisma.upcommingBookings.create({
      data: {
        date: dateFormatter(service.bookingDate),
        amount: service.price + service.price * 0.18 - service.price * 0.1,
        payment: paymentMode,
        customerId: userId,
        serviceId: service.id,
        professionalId: service.professionalId // Ensure frontend sends professionalId
      }
    });
  })
);

// 2. Create Upcoming Orders using newly created booking IDs
await Promise.all(
  createdBookings.map(async (booking) => {
    return prisma.upcommingOrders.create({
      data: {
        date: booking.date,
        amount: booking.amount,
        payment: booking.payment,
        customerId: booking.customerId,
        serviceId: booking.serviceId,
        bookingId: booking.id, // Directly use the created booking ID
      }
    });
  })
);

      // 3. Create Order
      const order = await prisma.orders.create({
        data: {
          total,
          gst,
          discount,
          grandTotal: total + gst - discount,
          payment: paymentMode,
          customerId: userId,
          bookedDate: formattedDate
        }
      });

      // 4. Create Order Services
      await prisma.orderService.createMany({
        data: cart.map((service: any) => ({
          orderId: order.id,
          date: dateFormatter(service.bookingDate),
          serviceId: service.id
        }))
      });

   

      // 5. Empty the Cart
      await prisma.cart.update({
        where: { customerId: userId },
        data: {
          services: { set: [] },
          total: 0,
          gst: 0,
          discount: 0
        }
      });
    });

    res.json({ msg: 'Order placed successfully ' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});


export default router;