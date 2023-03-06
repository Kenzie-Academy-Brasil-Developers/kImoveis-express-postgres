import { optional, z } from "zod";
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
    }),
});

const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });

const arrayUserSchema = returnUserSchema.array();

const returnListUsersSchema = z.object({
  nextPage: optional(z.string().max(500)).nullable(),
  prevPage: optional(z.string().max(500)).nullable(),
  count: z.number().int(),
  data: arrayUserSchema,
});

const userUpdateSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().min(10).max(45),
  password: z
    .string()
    .min(4)
    .max(120)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
}).partial();

export {
  userSchema,
  returnUserSchema,
  arrayUserSchema,
  returnListUsersSchema,
  userUpdateSchema,
};
