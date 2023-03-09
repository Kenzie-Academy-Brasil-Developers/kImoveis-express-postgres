import { Router } from "express";
import { createRealEstateControllers, listAllRealEstateController } from "../../controllers/realState.controllers";

const realEstateRoutes: Router = Router();

realEstateRoutes.post("", createRealEstateControllers);
realEstateRoutes.get("", listAllRealEstateController);

export default realEstateRoutes;
