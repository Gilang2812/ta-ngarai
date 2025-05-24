const { z } = require("zod");

const craftSchema = z.object({
  name: z.string().max(50),
});

const craftUpdateSchema = z.object({
  name: z.string().max(20).optional(),
});

module.exports = {
  craftSchema,
  craftUpdateSchema,
};
