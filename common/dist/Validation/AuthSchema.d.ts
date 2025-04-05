import { z } from "zod";
export declare const signinSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username?: string;
    password?: string;
}, {
    username?: string;
    password?: string;
}>;
export declare const signupSchema: z.ZodObject<{
    name: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
}, {
    name?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
}>;
export declare const contactUsSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    message?: string;
    email?: string;
}, {
    name?: string;
    message?: string;
    email?: string;
}>;
export declare const emailSchema: z.ZodString;
export declare const passwordChangeSchema: z.ZodObject<{
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password?: string;
    confirmPassword?: string;
}, {
    password?: string;
    confirmPassword?: string;
}>;
export type signinSchema = z.infer<typeof signinSchema>;
export type signupSchema = z.infer<typeof signupSchema>;
export type emailSchema = z.infer<typeof emailSchema>;
export type passwordChangeSchema = z.infer<typeof passwordChangeSchema>;
export type contactUsSchema = z.infer<typeof contactUsSchema>;
//# sourceMappingURL=AuthSchema.d.ts.map