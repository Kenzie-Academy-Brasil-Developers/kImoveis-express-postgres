import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";

const listRealEstatesbyCategoryService = async (categoryId: number) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const realEstateRepository = AppDataSource.getRepository(RealEstate);

  const categoryExists = await categoryRepository.findOne({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  const listRealEstates = await realEstateRepository.find({
    where: { category: { id: categoryId } },
  });

  if (!listRealEstates) {
    throw new AppError("RealEstates not found", 404);
  }

  const categoryAndList = await categoryRepository.findOne({
    where: { id: categoryId },
    relations: {
      realEstate: true,
    },
  });

  return categoryAndList;
};

export default listRealEstatesbyCategoryService;
