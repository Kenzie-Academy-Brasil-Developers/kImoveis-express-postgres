import { Router } from "express";
import { createUserController, deleteUserController, listAllUsersController, updateUserController } from "../../controllers/user.controllers";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDetails.middlewares";
import ensureUserEmailExist from "../../middlewares/ensureEmailExist.middleware";
import { userSchema } from "../../schemas/users.schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  ensureUserEmailExist,
  createUserController
);
usersRoutes.get("", listAllUsersController);
usersRoutes.patch("/:id", updateUserController);
usersRoutes.delete("/:id", deleteUserController);

export default usersRoutes;
