import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities";
import { IAllAddressesReturn } from "../../interfaces/addresses.interfaces";
import { arrayAddressesSchema } from "../../schemas/addresses.schemas";

const listAllAddressesService = async (
  data: any
): Promise<IAllAddressesReturn> => {
  const { page, perPage } = data;

  const addressesRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  let pageResult: number = page && parseInt(page) > 0 ? parseInt(page) : 1;

  let perPageResult: number =
    perPage && parseInt(perPage) > 0 ? parseInt(perPage) : 5;

  if (perPageResult > 5) {
    perPageResult = 5;
  }

  const findOptions: FindManyOptions<Address> = {
    take: perPageResult,
    skip: perPageResult * (pageResult - 1),
  };

  const [address, count] = await addressesRepository.findAndCount(
    findOptions
  );

  const totalPages = Math.ceil(count / perPageResult);

  const result: IAllAddressesReturn = {
    nextPage:
      pageResult < totalPages
        ? `http://localhost:3000/categories?page=${
            pageResult + 1
          }&perPage=${perPageResult}`
        : null,
    prevPage:
      pageResult > 1
        ? `http://localhost:3000/categories?page=${
            pageResult - 1
          }&perPage=${perPageResult}`
        : null,
    count,
    data: arrayAddressesSchema.parse(address),
  };

  return result;
};

export default listAllAddressesService;
