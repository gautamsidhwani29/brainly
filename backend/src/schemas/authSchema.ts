import { z } from "zod";
const UserSchema = z.object({
  username: z
    .string()
    .min(2, "Name must be at least 2 characters ")
    .max(20, "Exceeds limit"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Exceeds length limit"),
});

export type UserInput = z.infer<typeof UserSchema>;
export default UserSchema;
