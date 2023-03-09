import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities";
import { AppError } from "../../errors";
import {
  IAddressRequest,
  IAddressResponse,
} from "../../interfaces/addresses.interfaces";
import { returnAddressSchema } from "../../schemas/addresses.schemas";

const createAddressesService = async (
  data: IAddressRequest
): Promise<IAddressResponse> => {
  const addressesRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const address: Address = addressesRepository.create(data);

  await addressesRepository.save(address);

  const newAddress = returnAddressSchema.parse(address);

  return newAddress;
};

export default createAddressesService;
