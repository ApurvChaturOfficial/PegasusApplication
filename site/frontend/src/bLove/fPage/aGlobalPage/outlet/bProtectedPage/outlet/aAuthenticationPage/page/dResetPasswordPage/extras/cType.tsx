import { z } from "zod";


export const formSchema = z.object({
  ePassword: z.string()
    .min(8, { message: "Please enter at least 8 characters" })
    .max(15, { message: "Please enter at most 15 characters" }),
  eConfirmPassword: z.string()
    .min(8, { message: "Please enter at least 8 characters" })
    .max(15, { message: "Please enter at most 15 characters" }),
}).refine((data) => data.ePassword === data.eConfirmPassword, {
  message: "Passwords do not match",
  path: ["eConfirmPassword"],
});
