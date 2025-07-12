const { z } = require("zod");

const detailCraftSchema = z.object({
  craft_variant_id: z.string().max(5),
  price: z.string().transform(Number).pipe(z.number().positive()).optional(),
  weight: z.string().transform(Number).pipe(z.number().positive()).optional(),
  description: z.string().max(100).optional(),
  stock: z
    .string()
    .transform(Number)
    .pipe(z.number().int().nonnegative())
    .optional(),
});

module.exports = {
  detailCraftSchema, 
};
