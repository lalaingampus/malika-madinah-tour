import { z } from "zod";

export const consultationSchema = z.object({
  fullName: z.string().min(3, "Nama minimal 3 karakter."),
  email: z.string().email("Format email tidak valid."),
  phone: z
    .string()
    .min(10, "Nomor WhatsApp minimal 10 digit.")
    .regex(/^[0-9+]+$/, "Nomor WhatsApp hanya boleh angka atau tanda +."),
  packageName: z.string().min(1, "Pilih paket umrah terlebih dahulu."),
});
