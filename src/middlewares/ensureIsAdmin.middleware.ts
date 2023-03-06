import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { User } from "../entities";
import "express-async-errors";

const ensureUserIsAdmin = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  
  if (!req.user.admin) {
    throw new AppError("Not is admin", 403);
  }

  return next();
};

export default ensureUserIsAdmin;
