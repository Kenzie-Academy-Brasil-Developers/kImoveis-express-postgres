import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Category from "../../entities/categories.entity";
import { AppError } from "../../errors";
import {
  ICategoryRequest,
  ICategoryResponse,
} from "../../interfaces/categories.interfaces";

const createCategoryService = async (
  data: ICategoryRequest
): Promise<ICategoryResponse> => {
  const { name } = data;
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const verifyCategoryExists: Category | null =
    await categoryRepository.findOneBy({
      name: name,
    });

  if (verifyCategoryExists) {
    throw new AppError("Category already exists", 409);
  }

  const createdProperty: Category | null = categoryRepository.create(data);

  const newCategory: Category = await categoryRepository.save(createdProperty);

  return newCategory;
};

export default createCategoryService;
