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




export type signinSchema = z.infer<typeof signinSchema>;
export type signupSchema = z.infer<typeof signupSchema>;

