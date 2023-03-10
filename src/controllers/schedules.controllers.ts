import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/schedules.services";

const createSchedulesControllers = async (req: Request, res: Response) => {
  const dataReq = req.body;
  const userId = req.user.sub;
  const data = await createSchedulesService(dataReq, userId);
  return res.status(201).send(data);
};

export { createSchedulesControllers };
