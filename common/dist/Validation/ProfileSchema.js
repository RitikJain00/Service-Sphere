"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = exports.Contact = exports.BasicDetail = void 0;
const zod_1 = require("zod");
exports.BasicDetail = zod_1.z.object({
    name: zod_1.z.preprocess((val) => (typeof val === "string" ? val.trim() : ""), zod_1.z.string().min(2, "Name must be at least 2 characters long")),
    about: zod_1.z.preprocess((val) => (typeof val === "string" ? val.trim() : ""), zod_1.z.string().optional()),
});
exports.Contact = zod_1.z.object({
    email: zod_1.z.preprocess((val) => (typeof val === "string" ? val.trim() : ""), zod_1.z.string().email("Invalid email format")),
    phone: zod_1.z.preprocess((val) => (typeof val === "string" ? val.trim() : ""), zod_1.z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits")),
});
exports.Address = zod_1.z.object({
    home: zod_1.z.preprocess((val) => (typeof val === "string" ? val.trim() : ""), zod_1.z.string().min(3, "Home address must be at least 3 characters")),
    city: zod_1.z.preprocess((val) => (typeof val === "string" ? val.trim() : ""), zod_1.z.string().min(2, "City name must be at least 2 characters")),
    pin: zod_1.z.preprocess((val) => (typeof val === "string" ? val.trim() : ""), // Trim spaces
    zod_1.z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits") // Ensure only numbers
    ),
    country: zod_1.z.preprocess((val) => (typeof val === "string" ? val.trim() : ""), zod_1.z.string().min(2, "Country name must be at least 2 characters")),
});
