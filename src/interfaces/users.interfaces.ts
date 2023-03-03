import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  userSchema,
  returnUserSchema,
  returnMultipleUserSchema
} from "../schemas/users.schemas";

type IUser = z.infer<typeof userSchema>;
type IUserReturn = z.infer<typeof returnUserSchema>;
type IUsersReturn = z.infer<typeof returnMultipleUserSchema>;
type IUserUpdate = DeepPartial<IUser>;

export { IUser, IUserReturn, IUsersReturn, IUserUpdate };
