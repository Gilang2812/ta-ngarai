const z = require('zod');
const updateStatusSchema = z.object({
    status: z.number().int().min(0).max(6, { message: "Status must be between 0 and 6" }),
})

module.exports = {
    updateStatusSchema,
};