import { z } from "zod";
import { arrayCategoriesSchema, categorySchema, returnCategorySchema, returnListCategoriesSchema } from "../schemas/categories.schemas";

type ICategoryRequest = z.infer<typeof categorySchema>;
type ICategoryResponse = z.infer<typeof returnCategorySchema>;
type IArrayCategories = z.infer<typeof arrayCategoriesSchema>
type IAllCategoriesReturn = z.infer<typeof returnListCategoriesSchema>;


export { ICategoryRequest, ICategoryResponse, IArrayCategories, IAllCategoriesReturn };
