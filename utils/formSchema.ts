import { z } from 'zod';

export const quickReplySchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .max(100, "Max length is 100 characters"),
    content: z.string()
        .min(1, "Content is required")
        .max(1024, "Max length is 1024 characters")
})


export const signinSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email"),
    password: z.string()
        .min(1, "Password is required")
        .max(25, "Max length is 100 characters")
})


export const templateVarSchema = z.object({
    variable: z
        .array(z.object({
            value: z.string().min(1, "Variable is required").max(200, "Max length is 200 characters")
        }))
});