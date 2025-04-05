import { z } from "zod";

export const BasicDetail = z.object({
  name: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.string().min(2, "Name must be at least 2 characters long")
  ),

  about: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.string().optional()
  ),
});

export const Contact = z.object({
  email: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.string().email("Invalid email format")
  ),

  phone: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
  ),
});

export const Address = z.object({
  home: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.string().min(3, "Home address must be at least 3 characters")
  ),

  city: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.string().min(2, "City name must be at least 2 characters")
  ),

  pin: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""), // Trim spaces
    z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits") // Ensure only numbers
  ),

  country: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.string().min(2, "Country name must be at least 2 characters")
  ),
});

export type BasicDetail = z.infer<typeof BasicDetail>;
export type Contact = z.infer<typeof Contact>;
export type Address = z.infer<typeof Address>;
