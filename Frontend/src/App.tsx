
import '@mantine/core/styles.css';
import { MantineProvider} from '@mantine/core';
import '@mantine/carousel/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {

  

  return (   
      <MantineProvider defaultColorScheme="dark">
        <BrowserRouter>
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

          


        </Routes>
        </BrowserRouter>

      </MantineProvider>
  )
}