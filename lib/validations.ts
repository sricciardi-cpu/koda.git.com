import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100),
  email: z.string().email("Email inválido"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000),
  projectType: z.enum(["sitio-web", "ecommerce", "app-web", "identidad", "otro"], {
    error: "Seleccioná un tipo de proyecto",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
