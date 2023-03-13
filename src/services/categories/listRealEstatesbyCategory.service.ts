import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";

const listRealEstatesbyCategoryService = async (
  categoryId: number
): Promise<Category | null> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const categoryExists: Category | null = await categoryRepository.findOne({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  const listRealEstates: RealEstate[] = await realEstateRepository.find({
    where: { category: { id: categoryId } },
  });

  if (!listRealEstates) {
    throw new AppError("RealEstates not found", 404);
  }

  const categoryAndList: Category | null = await categoryRepository.findOne({
    where: { id: categoryId },
    relations: {
      realEstate: true,
    },
  });

  return categoryAndList;
};

export default listRealEstatesbyCategoryService;
