import { z } from "zod";

export const signinSchema = z.object({
  username: z.string().email("Invalid email format"),
  password: z.string().min(6,"Password must be 6 characters")
}) 

export const signupSchema = z.object({
  name: z.string().min(3,"Mininmum three character required in name"),
  username: z.string().email("Invalid email format"),
  password: z.string().min(6,"Password must be 6 characters"),
  confirmPassword: z.string().min(6,"Password must be 6 characters")
}) 

export const contactUsSchema = z.object({
  name: z.string().min(3,"Mininmum three character required in name"),
  email: z.string().email("Invalid email format"),
  message: z.string().min(10,"Message must contai minimum 10 characters"),
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
export type contactUsSchema  = z.infer<typeof contactUsSchema >;




