import { Router } from "express";
import {
  createAddressesControllers,
  listAllAddressesController,
} from "../../controllers/addresses.controller";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDetails.middlewares";
import ensureTokenIsValidMiddleware from "../../middlewares/ensureTokenIsValid.middleware";
import { addressSchema } from "../../schemas/addresses.schemas";

const addressesRouters: Router = Router();

addressesRouters.post(
  "",
  ensureDataIsValidMiddleware(addressSchema),
  ensureTokenIsValidMiddleware,
  createAddressesControllers
);

addressesRouters.get(
  "",
  listAllAddressesController
);

export default addressesRouters;
