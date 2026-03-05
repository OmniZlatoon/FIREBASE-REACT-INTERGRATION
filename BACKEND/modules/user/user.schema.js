const { z } = require('zod');

exports.createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
