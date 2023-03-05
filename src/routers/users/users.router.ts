import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listAllUsersController,
  updateUserController,
} from "../../controllers/user.controllers";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDetails.middlewares";
import ensureUserEmailExist from "../../middlewares/ensureEmailExist.middleware";
import ensureMovieIdExist from "../../middlewares/ensureIdExist.midddleware";
import { userSchema, userUpdateSchema } from "../../schemas/users.schemas";
import ensureTokenIsValidMiddleware from "../../middlewares/ensureTokenIsValid.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  ensureUserEmailExist,
  createUserController
);
usersRoutes.get("", ensureTokenIsValidMiddleware, listAllUsersController);
usersRoutes.patch(
  "/:id",
  ensureMovieIdExist,
  ensureDataIsValidMiddleware(userUpdateSchema),
  ensureUserEmailExist,
  updateUserController
);
usersRoutes.delete("/:id", ensureMovieIdExist, deleteUserController);

export default usersRoutes;
