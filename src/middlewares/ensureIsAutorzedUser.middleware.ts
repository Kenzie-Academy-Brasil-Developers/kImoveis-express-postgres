import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import "express-async-errors";

const ensureIsAutorzedUser = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  if (Number(req.params.id) === req.user.id || req.user.admin) {
    return next();
  } else {
    throw new AppError("Access denied", 403);
  }
};

export default ensureIsAutorzedUser;
