import express, { Request, Response } from "express";
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
        booking: "0",
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
  const formattedDate = dateFormatter(currentDate)

  try {
    const userId = (req as any).user.professionalId; // Extract user ID from token
    
    const { Orderid, date, customerId, serviceId,amount, payment } = req.body;
    console.log(customerId)
 
   
    await prisma.$transaction(async (prisma) => {
      

        // 1. Delete Upcomming Order
        await prisma.upcommingOrders.delete({
          where: {bookingId: Orderid}
        });


      // 2. Delete Upcoming Booking
      await prisma.upcommingBookings.delete({
        where: {id: Orderid}
        })


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
          status: 'Completed'
        }
      });

  
      // 4. Create Past Order
      await prisma.pastOrders.create({

        data: ({
          slotDate: date,
          completionDate: formattedDate,
          amount: amount,
          payment: payment,
          status: 'Completed',
          customerId: customerId,
          serviceId: serviceId,
        })
      });

    });

    res.json({ msg: 'Order Completed successfully ' });
  }catch(error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
})

router.post('/rejectBooking', LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const currentDate = new Date();
  const formattedDate = dateFormatter(currentDate)

  try {
    const userId = (req as any).user.professionalId; // Extract user ID from token
    
    const { Orderid, date, customerId, serviceId,amount, payment } = req.body;

 
   
    await prisma.$transaction(async (prisma) => {
      

        // 1. Delete Upcomming Order
        await prisma.upcommingOrders.delete({
          where: {bookingId: Orderid}
        });


      // 2. Delete Upcoming Booking
      await prisma.upcommingBookings.delete({
        where: {id: Orderid}
        })


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
          status: 'Rejected'
        }
      });

  
      // 4. Create Past Order
      await prisma.pastOrders.create({

        data: ({
          slotDate: date,
          completionDate: formattedDate,
          amount: amount,
          payment: payment,
          status: 'Rejected',
          customerId: customerId,
          serviceId: serviceId,
        })
      });

      // 5. Add Money To wallet

      // if(payment !== 'COD'){
      //   const updatedWallet = await prisma.wallet.upsert({
      //     where: { customerId: customerId },
      //     update: {
      //       Total: {
      //         increment: parseFloat(amount), // Add the new amount
      //       },
      //     },
      //     create: {
      //       customerId: customerId,
      //       Total: parseInt(amount), 
      //     },
      //   });
      // }
      

    });

    res.json({ msg: 'Order Rejected successfully ' });
  }catch(error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
})

router.post('/cancelBooking', LoginStatus, async (req: Request, res: Response): Promise<void> => {
  const currentDate = new Date();
  const formattedDate = dateFormatter(currentDate)

  try {
    const userId = (req as any).user.customerId; // Extract user ID from token
    
    const { id, date,amount, payment, serviceId, professionalId } = req.body;
   

    await prisma.$transaction(async (prisma) => {
      

        // 1. Delete Upcomming Order
        const deletedOrder = await prisma.upcommingOrders.delete({
          where: {bookingId: id},
          select: { bookingId: true } 
        });


      // 2. Delete Upcoming Booking
      await prisma.upcommingBookings.delete({
        where: {id: deletedOrder.bookingId}
        })


      // 3. Create Past Booking
      await prisma.pastBookings.create({
        data: {
          slotdate: date,
          completionDate: formattedDate,
          professionalId: professionalId,
          customerId: userId,
          serviceId: serviceId,
          amount: amount,
          payment: payment,
          status: 'Cancelled'
        }
      });

  
      // 4. Create Past Order
      await prisma.pastOrders.create({

        data: ({
          slotDate: date,
          completionDate: formattedDate,
          amount: amount,
          payment: payment,
          status: 'Cancelled',
          customerId: userId,
          serviceId: serviceId,
        })
      });

      // 5. Add Money To wallet

      // if(payment !== 'COD'){
      //   const updatedWallet = await prisma.wallet.upsert({
      //     where: { customerId: userId },
      //     update: {
      //       Total: {
      //         increment: parseFloat(amount), // Add the new amount
      //       },
      //     },
      //     create: {
      //       customerId: userId,
      //       Total: parseInt(amount), 
      //     },
      //   });
      // }
      

    });

    res.json({ msg: 'Order Rejected successfully ' });
  }catch(error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
})



export default router;
