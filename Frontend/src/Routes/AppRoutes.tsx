import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "../Context/CartContext";
import { ProfileProvider } from "../Context/ProfileContext";
import ScrollToTop from "../components/Scroll";

// Import all pages
import Home from "../pages/Common/Home";
import About from "../pages/Common/About";
import Contact from "../pages/Common/Contact";
import Privacy from "../pages/Common/Privacy";
import Terms from "../pages/Common/Terms";
import Refund from "../pages/Common/Refund";


import CustomerSign from "../pages/Customer/CustomerSign";
import Explore from "../pages/Customer/Explore";
import Electrician from "../pages/Customer/Electrician";
import Carpenter from "../pages/Customer/Carpenter";
import Painter from "../pages/Customer/Painter";
import Plumber from "../pages/Customer/Plumber";
import PestControl from "../pages/Customer/PestControl";
import HouseKeeping from "../pages/Customer/HouseKeeping";
import Contractor from "../pages/Customer/Contractor";
import Technician from "../pages/Customer/Technician";
import CustomerProfile from "../pages/Customer/CustomerProfile";
import CartPage from "../pages/Customer/CartPage";
import Favorite from "../pages/Customer/Favorates";


import Professional from "../pages/Partner/Professional";
import DashBoard from "../pages/Partner/Dashboard";
import Services from "../pages/Partner/Services";
import Bookings from "../pages/Partner/Booking";
import History from "../pages/Partner/History";
import ProfessionalProfile from "../pages/Partner/ProfessionalProfile";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ProfileProvider>
        <CartProvider>
          <Notifications />
          <Routes>
            {/* Common Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/PrivacyPolicy" element={<Privacy />} />
            <Route path="/TermsAndConditions" element={<Terms />} />
            <Route path="/RefundAndCancellation" element={<Refund />} />
            

            {/* Customer Routes */}
            <Route path="/Explore" element={<Explore />} />
            <Route path="/Electrician" element={<Electrician />} />
            <Route path="/Carpenter" element={<Carpenter />} />
            <Route path="/Painter" element={<Painter />} />
            <Route path="/Plumber" element={<Plumber />} />
            <Route path="/PestControl" element={<PestControl />} />
            <Route path="/HouseKeeping" element={<HouseKeeping />} />
            <Route path="/Contractor" element={<Contractor />} />
            <Route path="/Technician" element={<Technician />} />
            <Route path="/CustomerSignup" element={<CustomerSign />} />
            <Route path="/CustomerLogin" element={<CustomerSign />} />
            <Route path="/CustomerProfile" element={<CustomerProfile />} />
            <Route path="/Cart" element={<CartPage />} />
            <Route path="/Favorite" element={<Favorite />} />

            {/* Professional Routes */}
            <Route path="/ProfessionalSignup" element={<Professional />} />
            <Route path="/ProfessionalLogin" element={<Professional />} />
            <Route path="/professional" element={<Professional />} />
            <Route path="/ProfessionalProfile" element={<ProfessionalProfile/>} />
            <Route path="/Dashboard" element={<DashBoard />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Bookings" element={<Bookings />} />
            <Route path="/History" element={<History />} />

            {/* Catch-All Route (Redirect to Home) */}
            <Route path="*" element={<Home />} />
          </Routes>
        </CartProvider>
      </ProfileProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
