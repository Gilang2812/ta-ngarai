const { z } = require("zod");
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
const souvenirPlaceSchema = z.object({
  name: z.string().max(255, "Nama terlalu panjang"),
  address: z.string().max(255, "Alamat terlalu panjang"),
  contact_person: z.string().max(15, "Nomor kontak terlalu panjang"),
  open: z
    .string()
    .regex(timeRegex, "Format waktu tidak valid (contoh: 08:00) atau 08:00:00"),
  close: z
    .string()
    .regex(timeRegex, "Format waktu tidak valid (contoh: 17:00) atau 15:00:00"),
  description: z.string(),
});

module.exports = { souvenirPlaceSchema };
