import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";

const listAllRealEstatesToCategoryService = async (id: number) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({
    id: id,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

export default listAllRealEstatesToCategoryService;
