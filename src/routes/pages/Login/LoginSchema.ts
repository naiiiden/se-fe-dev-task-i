import z from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters.")
    .max(30, "Username cannot exceed 30 characters."),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters.")
    .max(30, "Password cannot exceed 30 characters"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
