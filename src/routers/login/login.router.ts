import { Router } from "express";
import { createLoginController } from "../../controllers/login.controller";
import ensureUserEmailExist from "../../middlewares/ensureEmailExist.middleware";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDetails.middlewares";
import { createLoginSchema } from "../../schemas/login.schema";
// import ensureTokenIsValidMiddleware from "../../services/users/ensureTokenIsValid.middleware";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(createLoginSchema),
  createLoginController
);

export default loginRoutes;
