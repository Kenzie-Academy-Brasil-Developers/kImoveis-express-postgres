import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const listAllRealEstateService = async () => {
  const realEstateRepository = AppDataSource.getRepository(RealEstate);

  const findRealEstate: Array<RealEstate> = await realEstateRepository.find({
    relations: {
      category: true,
    },
  });

  return findRealEstate;
};

export default listAllRealEstateService;
