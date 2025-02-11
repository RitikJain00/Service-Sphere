import { z } from "zod";

export const createService = z.object({
  name: z.string().min(1, "Invalid Service Name"),
  company: z.string().min(1, "Invalid Company Name"),
  description: z.string().min(1, "Invalid Description"),
  category: z.string().min(1, "Invalid Category"),
  expireince: z.string().min(1, "Invalid Experience"), 
  location: z.string().min(1, "Invalid Location"),
  price: z.number().positive("Price must be greater than zero"),
});

export type CreateService = z.infer<typeof createService>;
