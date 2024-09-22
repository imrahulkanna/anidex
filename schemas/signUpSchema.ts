import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, { message: "Username must be atleast 2 characters" })
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character(s)");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
});
