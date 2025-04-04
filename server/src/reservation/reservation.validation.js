const z = require("zod");

const selectedUnitSchema = z.object({
  homestay_id: z.string(),
  unit_type: z.string(),
  unit_number: z.string(),
  unit_name: z.string(),
  description: z.string(),
});

const reservationSchema = z.object({
  package_id: z.string(),
  package: z.string(),
  min_capacity: z.number().positive(),
  day: z.number().positive(),
  price: z.number().positive(),
  total_people: z.number().positive(),
  package_order: z.number().positive(),
  total_package: z.number().positive(),
  check_in: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  check_in_time: z.string().regex(/^\d{2}:\d{2}$/),
  check_out: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  check_out_time: z.string().regex(/^\d{2}:\d{2}$/),
   selectedUnits: z.array(selectedUnitSchema).nullable().default([]),
  note: z.string().optional(),
});

module.exports = { reservationSchema };
