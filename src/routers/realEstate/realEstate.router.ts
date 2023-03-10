import { Router } from "express";
import {
  createRealEstateControllers,
  listAllRealEstateController,
} from "../../controllers/realState.controllers";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDetails.middlewares";
import ensureUserIsAdmin from "../../middlewares/ensureIsAdmin.middleware";
import ensureIsAutorzedUser from "../../middlewares/ensureIsAutorzedUser.middleware";
import ensureTokenIsValidMiddleware from "../../middlewares/ensureTokenIsValid.middleware";
import { realEstateSchema } from "../../schemas/realEstate.schema";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdmin,
  ensureDataIsValidMiddleware(realEstateSchema),
  createRealEstateControllers
);
realEstateRoutes.get("", listAllRealEstateController);

export default realEstateRoutes;
