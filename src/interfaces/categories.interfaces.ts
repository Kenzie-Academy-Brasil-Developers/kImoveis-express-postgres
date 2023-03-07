import { z } from "zod";
import { categorySchema, returnCategorySchema, returnListCategoriesSchema } from "../schemas/categories.schemas";

type ICategoryRequest = z.infer<typeof categorySchema>;
type ICategoryResponse = z.infer<typeof returnCategorySchema>;
type IAllCategoriesReturn = z.infer<typeof returnListCategoriesSchema>;


export { ICategoryRequest, ICategoryResponse, IAllCategoriesReturn };
