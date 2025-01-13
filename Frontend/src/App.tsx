
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';
import '@mantine/carousel/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import Home from './pages/Home'
import About from './pages/About';
import Contact from './pages/Contact';
import Professional from './pages/Professional';
import Electrician from './pages/Electrician';
import Carpenter from './pages/Carpenter';
import Painter from './pages/Painter';
import Plumber from './pages/Plumber';
import PestControl from './pages/PestControl';
import HouseKeeping from './pages/HouseKeeping';
import Contractor from './pages/Contractor';
import Technician from './pages/Technician';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import CustomerSign from './pages/CustomerSign';
import CustomerProfile from './pages/CustomerProfile';
import ScrollToTop from "./components/Scroll";
import CartPage from './pages/CartPage';

export default function App() {

  const theme = createTheme ({
    colors: {
      'mine-shaft': [
      '#f6f6f6',
        '#e7e7e7',
        '#d1d1d1',
        '#b0b0b0',
        '#888888',
        '#6d6d6d',
        '#5d5d5d',
        '#4f4f4f',
        '#454545',
        '#3d3d3d',
        '#2d2d2d',
      ],
  
    'bright-sun': [
    '#fffbeb',
      '#fff3c6',
      '#ffe588',
      '#ffd149',
      '#ffbd20',
      '#f99b07',
      '#dd7302',
      '#b75006',
      '#943c0c',
      '#7a330d',
      '#461902',
    ],
    }
  });

  return (   
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <BrowserRouter>
        <ScrollToTop />
        <CartProvider>
        <Routes>
       
          <Route path='*' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/professional' element={<Professional/>}></Route>
          <Route path='/Electrician' element={<Electrician/>}></Route>
          <Route path='/Carpenter' element={<Carpenter/>}></Route>
          <Route path='/Painter' element={<Painter/>}></Route>
          <Route path='/Plumber' element={<Plumber/>}></Route>
          <Route path='/PestControl' element={<PestControl/>}></Route>
          <Route path='/HouseKeeping' element={<HouseKeeping/>}></Route>
          <Route path='/Contractor' element={<Contractor/>}></Route>
          <Route path='/Technician' element={<Technician/>}></Route>
          <Route path='/PrivacyPolicy' element={<Privacy/>}></Route>
          <Route path='/Terms&Conditions' element={<Terms/>}></Route>
          <Route path='/Refund&Cancellation' element={<Refund/>}></Route>
          <Route path='/CustomerSignup' element={<CustomerSign/>}></Route>
          <Route path='/CustomerLogin' element={<CustomerSign/>}></Route>
          <Route path='/ProfessionalSignup' element={<Professional/>}></Route>
          <Route path='/ProfessionalLogin' element={<Professional/>}></Route>
          <Route path='/CustomerProfile' element={<CustomerProfile/>}></Route>
          <Route path='/Cart' element={<CartPage/>}></Route>

         
        </Routes>
        </CartProvider>
        </BrowserRouter>

      </MantineProvider>
  )
}