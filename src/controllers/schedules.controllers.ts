import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/createSchedules.services";
import listAllScheduleByRealEstateIdService from "../services/schedules/listAllRealEstatesBySchedules.service";

const createSchedulesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const dataReq = req.body;
  const userId = req.user.sub;
  const data = await createSchedulesService(dataReq, userId);
  return res.status(201).send(data);
};

const listAllScheduleByRealEstateIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await listAllScheduleByRealEstateIdService(
    Number(req.params.id)
  );
  return res.status(200).send(data);
};

export { createSchedulesControllers, listAllScheduleByRealEstateIdController };
