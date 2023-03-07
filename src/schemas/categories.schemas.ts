import { optional, z } from "zod";

const categorySchema = z.object({
  name: z.string().min(3).max(45),
});

const returnCategorySchema = categorySchema.extend({
  id: z.number(),
});

const arrayCategoriesSchema = returnCategorySchema.array();

const returnListCategoriesSchema = z.object({
  nextPage: optional(z.string().max(500)).nullable(),
  prevPage: optional(z.string().max(500)).nullable(),
  count: z.number().int(),
  data: arrayCategoriesSchema,
});

export { categorySchema, returnCategorySchema, arrayCategoriesSchema, returnListCategoriesSchema};
