import express, { Request, Response } from "express";
import Razorpay from 'razorpay';
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

router.post('/order', LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const currentDate = new Date();
  const formattedDate = dateFormatter(currentDate)
  
  try {
    const userId = (req as any).user.customerId;
    const username = (req as any).user.username
    const { cart, paymentMode, total, gst, discount } = req.body;
  



    await prisma.$transaction(async (prisma) => {

      await Promise.all(
        cart.map(async (service: any) => {
          // Create Upcoming Booking
          const booking = await prisma.upcommingBookings.create({
            data: {
              date: dateFormatter(service.bookingDate),
              amount: service.price - (service.price * 0.25),
              payment: paymentMode,
              customerId: userId,
              serviceId: service.id,
              professionalId: service.professionalId // Ensure frontend sends professionalId
            }
          });

          await prisma.services.update({
            where: { id: service.id },
            data: {
              booking: {
                increment: 1 
              }
            }
          });
          
      
          // Create Upcoming Order (with corrected amount)
          return prisma.upcommingOrders.create({
            data: {
              date: dateFormatter(service.bookingDate),
              amount: service.price + (service.price * 0.18) - (service.price * 0.10),  
              payment: paymentMode,
              customerId: userId,
              serviceId: service.id,
              bookingId: booking.id, // Correct booking ID mapping
            }
          });
        })
      );

    
      

     // Create Order
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


      // 5. Add Money To Admin Account

      if(paymentMode !== "COD"){
        await prisma.admin.update({
          where: {
            id: 1,
            name: 'Ritik Jain'
          },
          data: {  
            wallet: {
              increment: total - discount 
            },
            totalGst: {
              increment: gst  
            }
          }
        });
      }
   

      // 6. Empty the Cart
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

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: username,
      Subject: 'Your Service Sphere Booking is Confirmed! 🎉',
      text: `Dear Customer,

      Thank you for choosing Service Sphere! Your booking has been successfully confirmed.
      
      Order Details:

      Services:  
      ${(await Promise.all(cart.map(async (service: any) => `${service.name} - ${service.company}`))).join("\n")}
      
      
      Total       ${total},
      Gst         ${gst},
      Discount    ${discount}
      Greand Total ${total + gst - discount}
      Payment     ${paymentMode},
      
      💡 Need assistance? Our support team is here to help! Contact us anytime at ${process.env.SENDER_EMAIL}.

      Thank you for trusting Service Sphere we look forward to serving you!
      
      Best regards,
      The Service Sphere Team`
    }

    await transporter.sendMail(mailOptions)    // send the mail


    res.json({ msg: 'Order placed successfully ' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});


export default router;