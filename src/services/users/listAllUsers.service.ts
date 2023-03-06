import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { IAllUsersReturn } from "../../interfaces/users.interfaces";
import { arrayUserSchema } from "../../schemas/users.schemas";

const listAllUsersService = async ( data: any): Promise<IAllUsersReturn> => {

  const { page, perPage, sort, order } = data;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  let pageResult: number = page && parseInt(page) > 0 ? parseInt(page) : 1;

  let perPageResult: number =
    perPage && parseInt(perPage) > 0 ? parseInt(perPage) : 5;

  if (perPageResult > 5) {
    perPageResult = 5;
  }

  let sortResult: string =
    sort === "price" || sort === "duration" ? sort : "id";

  let orderResult: string = order === "asc" || order === "desc" ? order : "ASC";

  if (sortResult === "id" || sort === null) {
    orderResult = "ASC";
  }

  const findOptions: FindManyOptions<User> = {
    take: perPageResult,
    skip: perPageResult * (pageResult - 1),
    order: {
      [sortResult]: orderResult,
    },
  };

  const [users, count] = await userRepository.findAndCount(findOptions);

  const totalPages = Math.ceil(count / perPageResult);

  const result: IAllUsersReturn = {
    nextPage:
      pageResult < totalPages
        ? `http://localhost:3000/users?page=${
            pageResult + 1
          }&perPage=${perPageResult}`
        : null,
    prevPage:
      pageResult > 1
        ? `http://localhost:3000/users?page=${
            pageResult - 1
          }&perPage=${perPageResult}`
        : null,
    count,
    data: arrayUserSchema.parse(users),
  };

  return result;
};

export default listAllUsersService;
