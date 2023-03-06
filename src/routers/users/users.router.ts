import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listAllUsersController,
  updateUserController,
} from "../../controllers/user.controllers";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDetails.middlewares";
import ensureUserEmailExist from "../../middlewares/ensureEmailExist.middleware";
import ensureUserIdExist from "../../middlewares/ensureIdExist.midddleware";
import { userSchema, userUpdateSchema } from "../../schemas/users.schemas";
import ensureTokenIsValidMiddleware from "../../middlewares/ensureTokenIsValid.middleware";
import ensureUserIsAdmin from "../../middlewares/ensureIsAdmin.middleware";
import ensureIsUser from "../../middlewares/ensureIsUser.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  ensureUserEmailExist,
  createUserController
);
usersRoutes.get("", ensureTokenIsValidMiddleware, ensureUserIsAdmin, listAllUsersController);
usersRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIdExist,
  ensureIsUser,
  ensureDataIsValidMiddleware(userUpdateSchema),
  ensureUserEmailExist,
  updateUserController
);
usersRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIdExist,
  ensureIsUser,
  deleteUserController
);

export default usersRoutes;
