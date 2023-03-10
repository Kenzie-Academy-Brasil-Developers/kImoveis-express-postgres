import { z } from "zod";
import {
  arrayRealEstatesSchema,
  realEstateSchema,
  returnRealEstateSchema,
} from "../schemas/realEstate.schema";

type IRealEstateRequest = z.infer<typeof realEstateSchema>;
type IRealEstateResponse = z.infer<typeof returnRealEstateSchema>;
type IArrayRealEstate = z.infer<typeof arrayRealEstatesSchema>

export { IRealEstateRequest, IRealEstateResponse, IArrayRealEstate };
