import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ISchedulesRequest } from "../../interfaces/schedules.interfaces";
import Schedule from "../../entities/schedules.entity";
import { RealEstate, User } from "../../entities";
import { AppError } from "../../errors";
import "express-async-errors";

const createSchedulesService = async (
  data: ISchedulesRequest,
  userId: number
): Promise<any> => {
  const { date, hour, realEstateId } = data;

  const splitHour = hour.split(":");

  if (parseInt(splitHour[0]) >= 18 || parseInt(splitHour[0]) < 8) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
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
    throw new AppError("RealEstate not found", 404);
  }

  const schedulesAlreadyExistsProperty = await schedulesRepository
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.realEstate = :id", { id: realEstateId })
    .andWhere("schedules_users_properties.date = :date", { date: date })
    .andWhere("schedules_users_properties.hour = :hour", { hour: hour })
    .getOne();

  if (schedulesAlreadyExistsProperty) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const schedulesAlreadyExistsUser = await schedulesRepository
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.userId = :id", { id: userId })
    .andWhere("schedules_users_properties.date = :date", { date: date })
    .andWhere("schedules_users_properties.hour = :hour", { hour: hour })
    .getOne();

  if (schedulesAlreadyExistsUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
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
