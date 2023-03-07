import { Request, Response } from "express";
import createAddressesService from "../services/addresses/addresses.service";
import listAllAddressesService from "../services/addresses/listAllAddresses.service";

const createAddressesControllers = async (req: Request, res: Response) => {
  const data = await createAddressesService(req.body);
  return res.status(201).send(data);
};

const listAllAddressesController = async (req: Request, res: Response) => {
  const addresses = await listAllAddressesService(req.query);

  return res.json(addresses);
};


export { createAddressesControllers, listAllAddressesController };
