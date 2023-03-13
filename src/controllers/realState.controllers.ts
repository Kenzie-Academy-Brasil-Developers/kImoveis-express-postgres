import { Request, Response } from "express";
import createRealEstateService from "../services/realEstate/createRealEstate.service";
import listAllRealEstateService from "../../src/services/realEstate/listAllRealEstate.service";

const createRealEstateControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await createRealEstateService(req.body);
  return res.status(201).send(data);
};

const listAllRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await listAllRealEstateService();
  return res.status(200).send(data);
};

export { createRealEstateControllers, listAllRealEstateController };
