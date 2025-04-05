import { z } from "zod";
export declare const BasicDetail: z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, unknown>;
    about: z.ZodEffects<z.ZodOptional<z.ZodString>, string, unknown>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    about?: string;
}, {
    name?: unknown;
    about?: unknown;
}>;
export declare const Contact: z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, unknown>;
    phone: z.ZodEffects<z.ZodString, string, unknown>;
}, "strip", z.ZodTypeAny, {
    email?: string;
    phone?: string;
}, {
    email?: unknown;
    phone?: unknown;
}>;
export declare const Address: z.ZodObject<{
    home: z.ZodEffects<z.ZodString, string, unknown>;
    city: z.ZodEffects<z.ZodString, string, unknown>;
    pin: z.ZodEffects<z.ZodString, string, unknown>;
    country: z.ZodEffects<z.ZodString, string, unknown>;
}, "strip", z.ZodTypeAny, {
    country?: string;
    home?: string;
    city?: string;
    pin?: string;
}, {
    country?: unknown;
    home?: unknown;
    city?: unknown;
    pin?: unknown;
}>;
export type BasicDetail = z.infer<typeof BasicDetail>;
export type Contact = z.infer<typeof Contact>;
export type Address = z.infer<typeof Address>;
//# sourceMappingURL=ProfileSchema.d.ts.map