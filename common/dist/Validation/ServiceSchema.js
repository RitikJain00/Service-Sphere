"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createService = void 0;
const zod_1 = require("zod");
exports.createService = zod_1.z.object({
    name: zod_1.z.string().min(1, "Invalid Service Name"),
    company: zod_1.z.string().min(1, "Invalid Company Name"),
    description: zod_1.z.string().min(1, "Invalid Description"),
    category: zod_1.z.string().min(1, "Invalid Category"),
    expireince: zod_1.z.string().min(1, "Invalid Experience"),
    location: zod_1.z.string().min(1, "Invalid Location"),
    price: zod_1.z.number().positive("Price must be greater than zero"),
});
