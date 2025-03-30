import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "../Context/CartContext";
import { ProfileProvider } from "../Context/ProfileContext";
import { StatProvider } from "../Context/StatsProvider";
import ScrollToTop from "../components/Scroll";

// Import all pages
import Home from "../pages/Common/Home";
import About from "../pages/Common/About";
import Contact from "../pages/Common/Contact";
import Privacy from "../pages/Common/Privacy";
import Terms from "../pages/Common/Terms";
import Refund from "../pages/Common/Refund";
import FAQPage from "../pages/Common/Faq";


import CustomerSign from "../pages/Customer/CustomerSign";
import Explore from "../pages/Customer/Explore";
import CustomerProfile from "../pages/Customer/CustomerProfile";
import CartPage from "../pages/Customer/CartPage";
import Favorite from "../pages/Customer/Favorates";
import CustomerProtected from "../components/Customer/CustomerProtected";
import MyOrders from "../pages/Customer/MyOrders";
import CustomerBookings from "../pages/Customer/Bookings";


import Professional from "../pages/Partner/Professional";
import DashBoard from "../pages/Partner/Dashboard";
import Services from "../pages/Partner/Services";
import Bookings from "../pages/Partner/Booking";
import History from "../pages/Partner/History";
import ProfessionalProfile from "../pages/Partner/ProfessionalProfile";
import ProfessionalProtected from "../components/Professional/ProfessionalProtected";



import Admin from "../pages/Admin/Admin";
import Customers from "../pages/Admin/Customers";
import Professionals from "../pages/Admin/Professionals";
import Accounts from "../pages/Admin/Accounts"
import Messages from "../pages/Admin/Message";
import AdminProtected from "../components/Admin/AdminProtected";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ProfileProvider>
        <CartProvider>
        <StatProvider>
          <Notifications />
          <Routes>
            {/* Common Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/PrivacyPolicy" element={<Privacy />} />
            <Route path="/TermsAndConditions" element={<Terms />} />
            <Route path="/RefundAndCancellation" element={<Refund />} />
            <Route path="/Faqs" element={<FAQPage/>} />

            

            {/* Customer Routes */}
            <Route path="/Explore" element={<Explore />} />
            <Route path="/Electrician" element={<Explore  />} />
            <Route path="/Carpenter" element={<Explore  />} />
            <Route path="/Painter" element={<Explore  />} />
            <Route path="/Plumber" element={<Explore  />} />
            <Route path="/PestControl" element={<Explore  />} />
            <Route path="/HouseKeeping" element={<Explore />} />
            <Route path="/Contractor" element={<Explore  />} />
            <Route path="/Technician" element={<Explore  />} />
            <Route path="/CustomerSignup" element={<CustomerSign />} />
            <Route path="/CustomerLogin" element={<CustomerSign />} />
            <Route path="/CustomerProfile" element={<CustomerProtected><CustomerProfile /></CustomerProtected>} />
            <Route path="/Cart" element={<CustomerProtected><CartPage /></CustomerProtected>} />
            <Route path="/Favorate" element={<CustomerProtected><Favorite /></CustomerProtected>} />
            <Route path="/MyOrders" element={<CustomerProtected><MyOrders /></CustomerProtected>} />
            <Route path="/customerBookings" element={<CustomerProtected><CustomerBookings /></CustomerProtected>} />



            {/* Professional Routes */}
            
            <Route path="/ProfessionalSignup" element={<Professional />} />
            <Route path="/ProfessionalLogin" element={<Professional />} />
            <Route path="/professional" element={<Professional />} />
            <Route path="/ProfessionalProfile" element={<ProfessionalProtected><ProfessionalProfile/></ProfessionalProtected>} />
            <Route path="/Dashboard" element={<ProfessionalProtected><DashBoard /></ProfessionalProtected>} />
            <Route path="/Services" element={<ProfessionalProtected><Services /></ProfessionalProtected>} />
            <Route path="/Bookings" element={<ProfessionalProtected><Bookings /></ProfessionalProtected>} />
            <Route path="/History" element={<ProfessionalProtected><History /></ProfessionalProtected>} />

              {/* Admin Route */}
              <Route path="/Admin" element={<AdminProtected ><Admin /></AdminProtected >} />
              <Route path="/Customers" element={<AdminProtected ><Customers /></AdminProtected>} />
              <Route path="/Professionals" element={<AdminProtected ><Professionals /></AdminProtected>} />
              <Route path="/Accounts" element={<AdminProtected ><Accounts/></AdminProtected>} />
              <Route path="/Messages" element={<AdminProtected ><Messages/></AdminProtected>} />

            {/* Catch-All Route (Redirect to Home) */}
            <Route path="*" element={<Home />} />
          </Routes>
          </StatProvider>
        </CartProvider>
      </ProfileProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
