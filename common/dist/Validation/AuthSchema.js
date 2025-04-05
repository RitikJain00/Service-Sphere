"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordChangeSchema = exports.emailSchema = exports.contactUsSchema = exports.signupSchema = exports.signinSchema = void 0;
const zod_1 = require("zod");
exports.signinSchema = zod_1.z.object({
    username: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be 6 characters")
});
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Mininmum three character required in name"),
    username: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be 6 characters"),
    confirmPassword: zod_1.z.string().min(6, "Password must be 6 characters")
});
exports.contactUsSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Mininmum three character required in name"),
    email: zod_1.z.string().email("Invalid email format"),
    message: zod_1.z.string().min(10, "Message must contai minimum 10 characters"),
});
exports.emailSchema = zod_1.z.string().email("Invalid email format");
exports.passwordChangeSchema = zod_1.z.object({
    password: zod_1.z.string().min(6, "Password must be 6 characters"),
    confirmPassword: zod_1.z.string().min(6, "Password must be 6 characters")
});
