import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { IArrayCategories } from "../../interfaces/categories.interfaces";
import { arrayCategoriesSchema } from "../../schemas/categories.schemas";

const listAllCategoriesService = async (): Promise<IArrayCategories> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const listCategory: Array<Category> = await categoryRepository.find();

  const categories = arrayCategoriesSchema.parse(listCategory);
  return categories;
};

export default listAllCategoriesService;
