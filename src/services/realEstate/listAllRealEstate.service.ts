import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { arrayRealEstatesSchema } from "../../schemas/realEstate.schema";

const listAllRealEstateService = async () => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const listUsers: Array<RealEstate> = await realEstateRepository.find();
  const users = arrayRealEstatesSchema.parse(listUsers);
  return users;
};

export default listAllRealEstateService;
