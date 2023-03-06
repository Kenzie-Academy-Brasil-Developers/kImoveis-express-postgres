import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import "express-async-errors";

const ensureIsUser = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
 
  if (Number(req.params.id) !== req.user.id) {
    throw new AppError("Access denied", 403);
  }

  return next();
};

export default ensureIsUser;
