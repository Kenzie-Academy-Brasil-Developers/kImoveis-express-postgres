import { z } from "zod";
import { hashSync } from "bcryptjs";

const userSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().min(10).max(45),
  admin: z.boolean(),
  password: z
    .string()
    .min(4)
    .max(120)
    .transform((pass) => {
      return hashSync(pass, 10);
    })
});

const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .omit({ password: true });

const returnMultipleUserSchema = returnUserSchema.array();

const userUpdateSchema = userSchema.partial();

export {
  userSchema,
  returnUserSchema,
  returnMultipleUserSchema,
  userUpdateSchema,
};
