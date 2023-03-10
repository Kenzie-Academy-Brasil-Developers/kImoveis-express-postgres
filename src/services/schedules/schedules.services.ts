import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import "express-async-errors";
import {
  ISchedulesRequest,
  ISchedulesResponse,
} from "../../interfaces/schedules.interfaces";
import Schedule from "../../entities/schedules.entity";
import { RealEstate, User } from "../../entities";
import { AppError } from "../../errors";
import { returnSchedulesSchema } from "../../schemas/schedules.schemas";

const createSchedulesService = async (
  data: ISchedulesRequest,
  userId: number
): Promise<any> => {
  const { date, hour, realEstateId } = data;

  const splitHour = hour.split(":");

  if (parseInt(splitHour[0]) >= 18 || parseInt(splitHour[0]) < 8) {
    throw new AppError("Invalid Hour", 400);
  }
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const schedulesRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const findUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  const findRealEstate = await realEstateRepository.findOneBy({
    id: realEstateId,
  });

  if (!findRealEstate) {
    throw new AppError("Real Estate not found", 404);
  }

  const schedulesAlreadyExistsProperty = await schedulesRepository
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.realEstate = :id", { id: realEstateId })
    .andWhere("schedules_users_properties.date = :date", { date: date })
    .andWhere("schedules_users_properties.hour = :hour", { hour: hour })
    .getOne();

  if (schedulesAlreadyExistsProperty) {
    throw new AppError("Schedules Already Exists", 409);
  }

  const schedulesAlreadyExistsUser = await schedulesRepository
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.userId = :id", { id: userId })
    .andWhere("schedules_users_properties.date = :date", { date: date })
    .andWhere("schedules_users_properties.hour = :hour", { hour: hour })
    .getOne();

  if (schedulesAlreadyExistsUser) {
    throw new AppError("Hour Already Exists", 409);
  }

  const schedule = schedulesRepository.create({
    date,
    hour,
    realEstate: findRealEstate,
    user: findUser,
  });

  await schedulesRepository.save(schedule);

  return { message: "Schedule created" };
};

export default createSchedulesService;
