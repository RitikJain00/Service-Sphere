
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