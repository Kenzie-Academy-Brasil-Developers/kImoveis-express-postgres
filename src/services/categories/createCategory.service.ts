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
  const categoryRepository = AppDataSource.getRepository(Category);

  const verifyCategoryExists = await categoryRepository.findOneBy({
    name: name,
  });

  if (verifyCategoryExists) {
    throw new AppError("Category already exists", 409);
  }

  const createdProperty = categoryRepository.create(data);
  
  const newCategory = await categoryRepository.save(createdProperty);
  
  return newCategory;
};

export default createCategoryService;
