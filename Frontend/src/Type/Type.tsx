
///////////////////Upcomming Bookung //////////////////////

interface CustomerProfile{
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  country: string;
  image: string;
}

interface CustomerInfo {
  id: string;
  username: string;
  profile: CustomerProfile
}
interface Service {
  id: string;
  name: string;
  price: number
}
export interface upcommingService {
  id: string;
  date: string;
  amount: string;
  payment: string;
  customer: CustomerInfo;
  service: Service
}


/////////////////////////////////////Past Booking ///////////////////////////////


export interface pastBookingService {
  id: string;
  slotdate: string;
  completionDate: string;
  status: string;
  amount: string;
  payment: string;
  customer: CustomerInfo;
  service: Service
}



////////////////////////////////////Cart Context ///////////////////////////////////


export interface Job {
  id: number,
  name : string;
  company: string;
  description: string;
  category:   string;
  image: string,
  expireince: string;
  location: string;
  rating:  number;
  booking: string;
  price: number;
  time: string;
}

export interface UpcommingBookingCustomer {
  date: Date,
  amount: number,
  payment: string,
  service: Job
}

export interface CartContextType {
  Favorate : Job[],
  cart : Job[],
  upcommingBooking: UpcommingBookingCustomer[],
  upcommingOrders: UpcommingBookingCustomer[],
  orders: Job[],
  pastBooking: UpcommingBookingCustomer[],

  total: number,
  gst: number,
  discount: number,
  loading: boolean,
  addToCart: (job: Job) => void,
  removeFromCart: (job: Job) => void
  addToFavorate: (job: Job) => void,
  removeFromFavorate: (job: Job) => void,
  fetchUpcommingBookings: () => void
  BookServices: (paymentType: string, dates: { [key: number]: Date | null }) => Promise<void>

 }


 ////////////////////////////////////////// Profile Context //////////////////////////////////

export interface BasicInfo { name: string; about: string; }
export interface ContactInfo { email: string, phone: string; }
export interface AddressInfo { home: string; city: string; pin: string; country: string; }

export interface ProfileContextType {
  edit: boolean[];
  basic: BasicInfo;
  contact: ContactInfo;
  address: AddressInfo;
  walletAmount: number;

  handleBasicChange: (field: string, value: string) => void;
  handleContactChange: (field: string, value: string) => void;
  handleAddressChange: (field: string, value: string) => void;
  handleWalletMoney: (amount: number) => void
  handleClick: (index: number) => void;
  saveProfile: () => void;
  updateAuth: (newToken: string, newType: string) => void
  
}



/////////////////////////////////ProfessionalStats Context ///////////////////////////////////

interface professionalWallet {
  Total: number,
  Pending: number,
  Pay: number,
  Gst: number
}

interface _countProfessionalStats {
  services: number,
  UpcommingBookings: number
  PastBookings: number
}

export interface StatsProfessional {
  wallet: professionalWallet,
  _count: _countProfessionalStats,
  activeServices: number,
    completedPastBookings: number,
    rejectedPastBookings: number,
    newCustomers: number,
    serviceCategories: number

}




/////////////////////////////////AdminStats Context ///////////////////////////////////




interface AdminWallet{
    wallet:  number,
    recieve:  number,
    pay:  number,
    totalGst:  number,
}

export interface StatsAdmin {
  totalCustomers: number,
  totalProfessionals: number,
  totalUpcomingBookings: number,
  totalPastBookings: number,
  totalCompletedBookings: number,
  totalCancelledBookings: number,
  totalRejectedBookings: number,
  newCustomers: number,
  newProfessionals: number,
  totalServices: number,
  adminWallet: AdminWallet,

}

export interface StatsContextType {
  statsProfessional: StatsProfessional
  statsAdmin: StatsAdmin 
  loading: boolean,
  fetchStatsProfessional: () => void
  fetchStatsAdmin: () => void
}



///////////////////////////////Customer Table in Admin DashBoard ///////////////////////////////////


interface Profile {
  name: string;
  phone: string;
  image: string;
  address: string;
  city: string;
  pincode: string;
  country: string

}
interface order{
  orders: number
}
interface customerWalletData{
  Pending: number
}

export interface CustomerData {
  id: string;
  username: string;
  wallet: customerWalletData;
  profile: Profile;
  _count: order;
  completedPastBookings: number;
  rejectedPastBookings: number
}

///////////////////////////////Professional Table in Admin DashBoard ///////////////////////////////////
interface Profile {
  name: string;
  phone: string;
  image: string;
  city: string
}
interface service{
  services: number
}
interface professionalWalletData {
  Pending: number,
  Pay: number,
  Gst: number,
}

export interface ProfessionalData {
  id: string;
  username: string;
  wallet: professionalWalletData;
  profile: Profile;
  _count: service;
  completedPastBookings: number;
  rejectedPastBookings: number
}