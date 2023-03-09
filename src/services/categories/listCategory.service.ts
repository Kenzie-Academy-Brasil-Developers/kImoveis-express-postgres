import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";

const listCategoryService = async (id: number) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({
    id: id,
  });

  if (!category) {
    throw new AppError("Invalid Category ID", 404);
  }

  return category;
};

export default listCategoryService;
