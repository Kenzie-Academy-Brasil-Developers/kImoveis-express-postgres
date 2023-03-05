import { Router } from "express";
import { createLoginController } from "../../controllers/login.controller";
// import ensureTokenIsValidMiddleware from "../../services/users/ensureTokenIsValid.middleware";

const loginRoutes: Router = Router();

loginRoutes.post("", createLoginController);

export default loginRoutes;
