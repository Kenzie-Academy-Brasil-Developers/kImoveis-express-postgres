import { Router } from "express";
import { createSchedulesControllers } from "../../controllers/schedules.controllers";
import ensureTokenIsValidMiddleware from "../../middlewares/ensureTokenIsValid.middleware";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  createSchedulesControllers
);
schedulesRoutes.get("/realEstate/:id");

export default schedulesRoutes;
