import { Router } from "express";
import {
  createCategoryControllers,
  listAllCategoriesController,
  listRealEstatesByCategoryController,
} from "../../controllers/categories.controllers";
import ensureDataIsValidMiddleware from "../../middlewares/ensureDetails.middlewares";
import ensureUserIsAdmin from "../../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../../middlewares/ensureTokenIsValid.middleware";
import { categorySchema } from "../../schemas/categories.schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureDataIsValidMiddleware(categorySchema),
  ensureTokenIsValidMiddleware,
  ensureUserIsAdmin,
  createCategoryControllers
);
categoriesRoutes.get("", listAllCategoriesController);
categoriesRoutes.get("/:id/realEstate", listRealEstatesByCategoryController);

export default categoriesRoutes;
