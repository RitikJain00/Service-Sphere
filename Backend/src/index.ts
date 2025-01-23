import express from 'express'
import  customerRoute  from './Routes/Customer'
import   professionalRoute  from './Routes/Professional' 


const app = express();
const PORT = 3000;


app.use(express.json());
app.use('/customer',customerRoute);
app.use('/professional',professionalRoute);



app.get('/', (req,res) => {
  res.send('Hello World');
})

app.listen(PORT , () => console.log('Server is running at ${PORT}'))