import { Router } from "express";
import { createLoginController } from "../../controllers/login.controller";
import ensureUserEmailExist from "../../middlewares/ensureEmailExist.middleware";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDetails.middlewares";
import { createLoginSchema } from "../../schemas/login.schema";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(createLoginSchema),
  createLoginController
);

export default loginRoutes;
