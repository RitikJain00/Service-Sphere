
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About';
import Contact from './pages/Contact';
import Partner from './pages/Partner';

export default function App() {
  return (   
      <MantineProvider>
        <BrowserRouter>
        <Routes>
          <Route path='*' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/partner' element={<Partner/>}></Route>


        </Routes>
        </BrowserRouter>

      </MantineProvider>
  )
}