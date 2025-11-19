"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UserSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(2, "Name must be at least 2 characters ")
        .max(20, "Exceeds limit"),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(30, "Exceeds length limit"),
});
exports.default = UserSchema;
