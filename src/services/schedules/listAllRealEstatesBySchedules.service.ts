import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../errors";

const listAllScheduleByRealEstateIdService = async (realEstateId: number) => {
  const realEstateRepository = AppDataSource.getRepository(RealEstate);
  const schedulesRepository = AppDataSource.getRepository(Schedule);

  const realEstateExists = await realEstateRepository.findOne({
    where: { id: realEstateId },
    relations: {
      category: true,
      schedules: {
        user: true,
      },
      address: true,
    },
  });

  if (!realEstateExists) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstateExists;

  // const listSchedules = await schedulesRepository.find({
  //   where: { realEstate: { id: realEstateId } },
  // });

  // if (!listSchedules) {
  //   throw new AppError("Schedules not found", 404);
  // }

  // const realEstateAndList = await realEstateRepository.findOne({
  //   where: { id: realEstateId },
  //   relations: {
  //     schedules: true,
  //   },
  // });

  // return realEstateAndList;
};

export default listAllScheduleByRealEstateIdService;
