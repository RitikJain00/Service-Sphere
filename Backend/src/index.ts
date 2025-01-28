import express from 'express'
import  customerRoute  from './Routes/Customer'
import    professionalRoute   from './Routes/Professional' 
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies/auth headers
  })
);

app.use(express.json());



app.use('/customer',customerRoute);
app.use('/professional',professionalRoute);



app.get('/', (req,res) => {
  res.send('Hello World');
})

app.listen(PORT , () => console.log(`Server is running at ${PORT}`))