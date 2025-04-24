const { z } = require("zod");

const objectSchema = z.object({
  lat: z.coerce.number(),
  long: z.coerce.number(),
  radius: z.coerce.number()
});

module.exports= {objectSchema}