import express from 'express'

import  customerSign  from './src/Routes/Customer/CustomerSign'
import customerProfile from './src/Routes/Customer/CustomerProfile'

import    professionalSign   from './src/Routes/Professional/ProfessionlSign' 
import professionalProfile from './src/Routes/Professional/ProfessionalProfile'

import service from './src/Routes/Professional/Service'

import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies/auth headers
  })
);

app.use(express.json());



app.use('/customersign', customerSign);
app.use('/customerprofile',customerProfile)

app.use('/professionalsign',professionalSign);
app.use('/professionalprofile',professionalProfile);

app.use('/service', service)





app.listen(PORT , () => console.log(`Server is running at ${PORT}`))