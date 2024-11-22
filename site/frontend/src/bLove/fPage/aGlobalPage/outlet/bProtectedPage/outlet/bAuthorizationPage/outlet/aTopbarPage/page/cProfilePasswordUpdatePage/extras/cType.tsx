import { z } from "zod";

export const formSchema = z.object({
  eOldPassword: z.string()
    .min(8, { message: "Old password must be at least 8 characters" }),
  eNewPassword: z.string()
    .min(8, { message: "New password must be at least 8 characters" })
    .max(50, { message: "New password must be at most 50 characters" }),
  eConfirmPassword: z.string()
    .min(8, { message: "Confirmation password must be at least 8 characters" })
    .max(50, { message: "Confirmation password must be at most 50 characters" }),
}).refine((data) => data.eNewPassword === data.eConfirmPassword, {
  message: "New password and confirmation password must match",
  path: ["eConfirmPassword"],
});
