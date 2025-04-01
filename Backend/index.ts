import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";

import  customerSign  from './src/Routes/Customer/CustomerSign'
import customerProfile from './src/Routes/Customer/CustomerProfile'
import shopService from './src/Routes/Customer/ShopServices'

import    professionalSign   from './src/Routes/Professional/ProfessionlSign' 
import professionalProfile from './src/Routes/Professional/ProfessionalProfile'
import service from './src/Routes/Professional/Service'
import stats from './src/Routes/Professional/Stats'

import adminSign from './src/Routes/Admin/AdminSign'
import adminContact from './src/Routes/Admin/Contact'
import customerData from './src/Routes/Admin/CustomerData'
import professionalData from './src/Routes/Admin/ProfessionalData'


import payment from './src/Routes/Payment/Payment'
import booking from './src/Routes/Booking/Booking'

import uploadImage from './src/Routes/Claudinary/upload'



import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
    origin: ['http://localhost:5173','http://localhost:5174', 'https://service-sphere-git-main-ritikjain00s-projects.vercel.app'], // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies/auth headers
  })
);

app.use(express.json());
app.use(cookieParser())

// Customer Servers
app.use('/customersign', customerSign);
app.use('/customerprofile',customerProfile)
app.use('/shopService', shopService)


// Professional Servers
app.use('/professionalsign',professionalSign);
app.use('/professionalprofile',professionalProfile);
app.use('/service', service)
app.use('/statistics', stats)


// Admin Servers
app.use('/adminsign',adminSign);
app.use('/adminsDashboard/customers',customerData);
app.use('/adminsDashboard/professional',professionalData);
app.use('/adminContact',adminContact)

app.use('/payment', payment)
app.use('/booking', booking)


app.use('/uploadImage', uploadImage)





app.listen(PORT , () => console.log(`Server is running at ${PORT}`))