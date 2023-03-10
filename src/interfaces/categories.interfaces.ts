import { z } from "zod";
import {
  arrayCategoriesSchema,
  categorySchema,
  returnCategorySchema,
} from "../schemas/categories.schemas";

type ICategoryRequest = z.infer<typeof categorySchema>;
type ICategoryResponse = z.infer<typeof returnCategorySchema>;
type IArrayCategories = z.infer<typeof arrayCategoriesSchema>;

export { ICategoryRequest, ICategoryResponse, IArrayCategories };
