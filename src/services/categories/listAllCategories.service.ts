import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { IAllCategoriesReturn, IArrayCategories } from "../../interfaces/categories.interfaces";
import { arrayCategoriesSchema } from "../../schemas/categories.schemas";

const listAllCategoriesService = async (
  data: any
): Promise<IArrayCategories> => {
  const { page, perPage } = data;

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  let pageResult: number = page && parseInt(page) > 0 ? parseInt(page) : 1;

  let perPageResult: number =
    perPage && parseInt(perPage) > 0 ? parseInt(perPage) : 5;

  if (perPageResult > 5) {
    perPageResult = 5;
  }

  const findOptions: FindManyOptions<Category> = {
    take: perPageResult,
    skip: perPageResult * (pageResult - 1),
  };

  const [categories, count] = await categoryRepository.findAndCount(
    findOptions
  );

  const totalPages = Math.ceil(count / perPageResult);

  const result = arrayCategoriesSchema.parse(categories);

  
  return result;
};

export default listAllCategoriesService;
