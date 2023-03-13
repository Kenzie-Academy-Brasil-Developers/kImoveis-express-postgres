import { Request, Response } from "express";
import { Category } from "../entities";
import createCategoryService from "../services/categories/createCategory.service";
import listAllCategoriesService from "../services/categories/listAllCategories.service";
import listRealEstatesbyCategoryService from "../services/categories/listRealEstatesbyCategory.service";

const createCategoryControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await createCategoryService(req.body);
  return res.status(201).send(data);
};

const listAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await listAllCategoriesService();

  return res.json(categories);
};

const listRealEstatesByCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id);

  const realEstates: Category | null = await listRealEstatesbyCategoryService(
    categoryId
  );

  return res.json(realEstates);
};

export {
  createCategoryControllers,
  listAllCategoriesController,
  listRealEstatesByCategoryController,
};
