import {z} from "zod";

export const createMediaSchema = z.object({
  name: z.string().optional(),
  source: z.union([
    z.instanceof(File, {message: "Te rugăm să furnizezi un fișier valid pentru sursă."}),
    z
      .string()
      .min(1, "Te rugăm să furnizezi un fișier valid pentru sursă.")
      .transform((value) => (value === "" ? undefined : value)),
  ]),
});

export const createMediaSchemaServer = z.object({
  id: z.string(),
  name: z.string().optional(),
  url: z.string().url("URL-ul imaginii nu este valid."),
  size: z.number().optional(),
  type: z.string().optional(),
});
