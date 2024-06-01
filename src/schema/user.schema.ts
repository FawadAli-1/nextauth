import * as z from "zod";

export const formSchema = z.object({
  username: z.string().min(2, { message: "Enter a valid username" }).max(50),
  email: z.string().email({ message: "Enter a valid email" }).min(3).max(50),
  password: z.string().min(5, { message: "Your password should be at least 5 characters" }).max(25),
});
