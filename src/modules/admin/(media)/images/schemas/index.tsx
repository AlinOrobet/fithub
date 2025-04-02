import {z} from "zod";

export const createMediaSchema = z.object({
  source: z.union([
    z.instanceof(File, {message: "Te rugăm să furnizezi un fișier valid pentru sursă."}),
    z
      .string()
      .min(1, "Te rugăm să furnizezi un fișier valid pentru sursă.")
      .transform((value) => (value === "" ? undefined : value)),
  ]),
});
