import { Router } from "express";
import {
  createSchedulesControllers,
  listAllScheduleByRealEstateIdController,
} from "../../controllers/schedules.controllers";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDetails.middlewares";
import ensureUserIsAdmin from "../../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../../middlewares/ensureTokenIsValid.middleware";
import { schedulesSchema } from "../../schemas/schedules.schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(schedulesSchema),
  createSchedulesControllers
);
schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdmin,
  listAllScheduleByRealEstateIdController
);

export default schedulesRoutes;
