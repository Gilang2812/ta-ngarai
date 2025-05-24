const { z, nullable } = require("zod");

const variantSchema = z.object({
  id_craft: z.string().max(5),
  name: z.string().max(50),
  description: z.string().max(100).optional().nullable(),
  price: z.string().transform(Number).pipe(z.number().positive()),
  modal: z.string().transform(Number).pipe(z.number().nonnegative()).nullable().optional(),
  stock: z.string().transform(Number).pipe(z.number().int().nonnegative()),
});

const variantUpdateSchema = z.object({
  id_craft: z.string().max(5),
  name: z.string().max(20).optional(),
  description: z.string().max(100).optional(),
  price: z.string().transform(Number).pipe(z.number().positive()).optional(),
  stock: z
    .string()
    .transform(Number)
    .pipe(z.number().int().nonnegative())
    .optional(),
});

module.exports = {
  variantSchema,
  variantUpdateSchema,
};
