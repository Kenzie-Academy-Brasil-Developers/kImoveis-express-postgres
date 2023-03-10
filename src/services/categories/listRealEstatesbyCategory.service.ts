import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { returnRealEstatesByCategorySchema } from "../../schemas/realEstate.schema";

const listRealEstatesbyCategoryService = async (id: number) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const realEstateRepository = AppDataSource.getRepository(RealEstate);

  const listCategories = await categoryRepository.find({
    where: { id: id },
  });

  if (!listCategories) {
    throw new AppError("Category not found", 404);
  }

  const listRealEstates = await realEstateRepository.find({
    // where: { category: id },
  });

  if (!listRealEstates) {
    throw new AppError("RealEstates not found", 404);
  }

  const returnRealEstatesByCategory = returnRealEstatesByCategorySchema.parse(
    listRealEstates!
  );

  return returnRealEstatesByCategory;
};

export default listRealEstatesbyCategoryService;
