import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import listAllCategoriesService from "../services/categories/listCategories.service";

const createCategoryControllers = async (req: Request, res: Response) => {
  const data = await createCategoryService(req.body);
  return res.status(201).send(data);
};

const listAllCategoriesController = async (req: Request, res: Response) => {
  const categories = await listAllCategoriesService(req.query);

  return res.json(categories);
};

export { createCategoryControllers, listAllCategoriesController };
