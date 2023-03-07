import { optional, z } from "zod";

const addressSchema = z.object({
  street: z.string().min(3).max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullable(),
  city: z.string().max(20),
  state: z.string().length(2),
});

const returnAddressSchema = addressSchema.extend({
  id: z.number().int(),
});

const arrayAddressesSchema = returnAddressSchema.array();

const returnListAddressesSchema = z.object({
  nextPage: optional(z.string().max(500)).nullable(),
  prevPage: optional(z.string().max(500)).nullable(),
  count: z.number().int(),
  data: arrayAddressesSchema,
});

export { addressSchema, returnAddressSchema, arrayAddressesSchema, returnListAddressesSchema };
