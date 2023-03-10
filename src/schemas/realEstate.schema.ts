import { z } from "zod";
import { addressSchema, returnAddressSchema } from "./addresses.schemas";
import { returnCategorySchema } from "./categories.schemas";

const realEstateSchema = z.object({
  value: z.string().or(z.number()),
  size: z.number().positive(),
  address: addressSchema,
  categoryId: z.number(),
});

const returnRealEstateSchema = realEstateSchema.omit({ categoryId: true }).extend({
  id: z.number(),
  sold: z.boolean(),
  address: returnAddressSchema,
  category: returnCategorySchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

const arrayRealEstatesSchema = returnRealEstateSchema.array();


export { realEstateSchema, returnRealEstateSchema, arrayRealEstatesSchema };
