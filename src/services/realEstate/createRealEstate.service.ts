import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import {
  IRealEstateRequest,
  IRealEstateResponse,
} from "../../interfaces/realEstate.interfaces";
import listCategoryService from "../categories/listRealEstatesbyCategory.service";
import { returnRealEstateSchema } from "../../schemas/realEstate.schema";
import createAddressesService from "../addresses/createAddresses.service";
import { AppError } from "../../errors";
import "express-async-errors";
import { IAddressResponse } from "../../interfaces/addresses.interfaces";

const createRealEstateService = async (
  data: IRealEstateRequest
): Promise<IRealEstateResponse> => {
  const { value, size, categoryId, address } = data;

  const addressesRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const addressExists: Address | null = await addressesRepository.findOne({
    where: {
      state: address.state,
      city: address.city,
      street: address.street,
      zipCode: address.zipCode,
    },
  });

  if (addressExists) {
    throw new AppError("Address already exists", 409);
  }

  const dataAddress: IAddressResponse | null = await createAddressesService(
    address
  );

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category | null = await categoryRepository.findOneBy({
    id: categoryId,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const realEstate: RealEstate = realEstateRepository.create({
    value,
    size,
    category: category,
    address: dataAddress,
  });

  await realEstateRepository.save(realEstate);

  const newRealEstate: IRealEstateResponse =
    returnRealEstateSchema.parse(realEstate);

  return newRealEstate;
};

export default createRealEstateService;
