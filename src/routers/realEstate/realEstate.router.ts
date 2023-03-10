import { Router } from "express";
import { listRealEstatesByCategoryController } from "../../controllers/categories.controllers";
import {
  createRealEstateControllers,
  listAllRealEstateController,
} from "../../controllers/realState.controllers";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDetails.middlewares";
import ensureUserIsAdmin from "../../middlewares/ensureIsAdmin.middleware";
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
realEstateRoutes.get(
  "",
  listAllRealEstateController
);

realEstateRoutes.get("/:id/realEstates", listRealEstatesByCategoryController)

export default realEstateRoutes;
