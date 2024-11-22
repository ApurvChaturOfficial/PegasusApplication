import { z } from "zod";


export const formSchema = z.object({
  aTitle: z.string()
    .min(3, { message: "Please enter atlest 3 characters" })
    .max(50, { message: "Please enter atmost 50 characters" }),
  aSubtitle: z.string()
    .min(3, { message: "Please enter atlest 3 characters" })
    .max(500, { message: "Please enter atmost 500 characters" }),
  aDescription: z.string()
    .min(15, { message: "Please enter atlest 15 characters" })
    .max(5000, { message: "Please enter atmost 5000 characters" }),
  aDetail: z.string()
    .min(15, { message: "Please enter atlest 15 characters" })
    .max(50000, { message: "Please enter atmost 50000 characters" }),
  aStatus: z.string()
    .min(5, { message: "Please select status" })
    .max(15, { message: "Please select status" }),
  aSlug: z.string()
    .min(3, { message: "Please enter atlest 3 characters" })
    .max(50, { message: "Please enter atmost 50 characters" }),

  eFirstname: z.string(),
  eLastname: z.string(),
  // eEmail: z.string(),
  eMobile: z.string(),

});
