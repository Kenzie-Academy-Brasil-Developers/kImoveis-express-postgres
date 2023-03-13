import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../errors";

const listAllScheduleByRealEstateIdService = async (
  realEstateId: number
): Promise<RealEstate> => {
  const realEstateRepository = AppDataSource.getRepository(RealEstate);

  const realEstateExists: RealEstate | null =
    await realEstateRepository.findOne({
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
};

export default listAllScheduleByRealEstateIdService;
