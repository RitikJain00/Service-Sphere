import { z } from "zod";
export declare const createService: z.ZodObject<{
    name: z.ZodString;
    company: z.ZodString;
    description: z.ZodString;
    category: z.ZodString;
    expireince: z.ZodString;
    location: z.ZodString;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name?: string;
    location?: string;
    description?: string;
    company?: string;
    category?: string;
    expireince?: string;
    price?: number;
}, {
    name?: string;
    location?: string;
    description?: string;
    company?: string;
    category?: string;
    expireince?: string;
    price?: number;
}>;
export type CreateService = z.infer<typeof createService>;
//# sourceMappingURL=ServiceSchema.d.ts.map