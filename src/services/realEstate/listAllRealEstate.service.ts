import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const listAllRealEstateService = async () => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const listUsers: Array<RealEstate> = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  return listUsers;
};

export default listAllRealEstateService;
