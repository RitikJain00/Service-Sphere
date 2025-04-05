# 🛠️ Service Sphere

**Service Sphere** is a full-stack household service platform that connects users (customers) with verified professionals for a wide range of home services. It features a robust architecture with **React (Frontend)**, **Node.js (Backend)**, and **Zod (Shared Validation)**, ensuring type-safe and scalable development across all layers.

🔗 **Live URL:**    [Service Sphere](https://service-sphere-gamma.vercel.app/)

---

## 🚀 Key Features

### 👤 Customer Portal
- **User Registration & Login** (JWT-based authentication)
- **Book Preferred Services** (Electrician, Plumber, Painter, Carpenter, House Cleaning, Pest Control, etc.)
- **Slot-Based Booking System** (select date & time)
- **Cancel Service Anytime** before execution
- **Verification Email & Mobile**
- **Updates on Email about Bookings**
- **View Upcoming , Past Bookings & Orders**
- **In-app Wallet for Payments, as well as online Payments Razorpay**
- **Live Booking Status Tracking**
- **Leave Feedback**

### 🧑‍🔧 Professional Dashboard
- **Register as a Service Professional**
- **Create & Manage Services Offered**
- **Accept / Reject Booking Requests**
- **View Booking Stats** (Total Orders, Revenue, Service-wise analytics)
- **Access Past & Upcoming Bookings**
- **Receive Payments** through wallet system

### 🛡️ Admin Panel
- **Admin Login with Access Control**
- **Manage Entire Ecosystem** (Customers & Professionals)
- **Review All Bookings** in the system
- **Handle Payment Distribution**
  - Customer pays Admin
  - Admin deducts **25% commission**
  - Admin transfers remaining **75%** to the Professional
- **View Platform-Wide Stats** (Total Revenue, Bookings, Users, etc.)
- **Resolve Disputes & Handle Feedback**

---

## 🧪 Tech Stack

| Layer        | Tech                                                         |
|--------------|--------------------------------------------------------------|
| Frontend     | React + TypeScript, Mantine, Recharts, Axios, React Router etc  |
| Backend      | Node.js, Express.js, JWT, Zod, Prisma, Claudinary, NodeMailer, Twilio, RazorPay etc                            |
| Validation   | Zod (shared between frontend & backend)                      |
| Styling      | Tailwind CSS                                                 |
| Database     | Postgress                                                    |
| Deployment   | Vercel (Frontend), Render (Backend)                  |

---

## 📁 Folder Structure

```
Service-Sphere/
├── Frontend/               # React.js frontend app
│   ├── src/
│   └── public/
├── Backend/                # Node.js backend API
│   └── src/
│   └── prisma/             # Prisma ORM for database
├── Common/ (npm package)  # Shared Zod Schemas published on npm
│   └── src/
│   └── package.json
└── README.md
```

---
📦 Common NPM Package (Zod Validation)

Zod schemas have been moved to a standalone Common folder which is now published to npm and installed in both frontend and backend:

```ts
// Example usage in frontend or backend:
import { signinSchema } from '@craiber/servicesphere-common';
```

Make sure to install the package via:

```ts
npm install @craiber/servicesphere-common
```

---

## ⚙️ Environment Variables

Create `.env` files in **Frontend** and **Backend**.

### Backend `.env`
```env
DATABASE_URL=your_postgresql_connection

JWT_SECRET=your_jwt_secret
NODE_ENV='development'

#Email Messages

SMTP_USER=your_config
SMTP_PASS=your_cpnfig
SENDER_EMAIL = your_email

#Phone Message
TWILIO_ACCOUNT_SID=your_auth_id
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_number

CLOUDINARY_CLOUD_NAME=your_claudinary_name
CLOUDINARY_API_KEY=your_claudinary_key
CLOUDINARY_API_SECRET=your_claudinary_secret
CLOUDINARY_URL=your_claudinary_url

PORT=3000

RAZORPAY_API_KEY=your_razorpay_key
RAZORPAY_API_SECRET=your_razorpay_secret
```


## 🧪 Scripts

### Frontend
```bash
cd Frontend
npm install
npm run dev       # Start Vite dev server
```

### Backend
```bash
cd Backend
npm install
npx prisma generate
npm start       
```

---

## 📦 Deployment

- **Frontend:** Vercel 
- **Backend:** Render 
- **Database:** Postgress
- **Common Package:** npm (public/private registry)

---

## 📊 Admin Revenue Distribution Logic

- A customer books a service and pays full amount to Admin Wallet.
- Admin keeps 25% platform commission.
- Admin pays 75% to Professional Wallet.
- Admin manually  processes payouts.

---

## 🛠️ Future Scope / Enhancements

- ✨ Real-time Booking Status with WebSocket / Socket.io
- 📲 Mobile App with React Native
- 📍 Geo-based Professional Search
- 🔔 Alerts for upcoming bookings
- 📈 Advanced Analytics for Admin and Professionals
- 🗂️ Booking History Export

---

## 📄 License

MIT License. Feel free to fork, improve and use.

---

## 🙌 Made With Love By Ritik Jain

  
🔗 [LinkedIn](https://www.linkedin.com/in/ritikjain00/) | ✉️ ritikjain590@gmail.com


