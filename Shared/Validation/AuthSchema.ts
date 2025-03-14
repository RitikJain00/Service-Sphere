import { z } from "zod";

export const signinSchema = z.object({
  username: z.string().email("Invalid email format"),
  password: z.string().min(6,"Password must be 6 characters")
}) 

export const signupSchema = z.object({
  name: z.string(),
  username: z.string().email("Invalid email format"),
  password: z.string().min(6,"Password must be 6 characters"),
  confirmPassword: z.string().min(6,"Password must be 6 characters")
}) 



export const emailSchema = z.string().email("Invalid email format")

export const passwordChangeSchema = z.object({
  password: z.string().min(6,"Password must be 6 characters"),
  confirmPassword: z.string().min(6,"Password must be 6 characters")
}) 



export type signinSchema = z.infer<typeof signinSchema>;
export type signupSchema = z.infer<typeof signupSchema>;
export type emailSchema  = z.infer<typeof emailSchema >;
export type passwordChangeSchema  = z.infer<typeof passwordChangeSchema >;



