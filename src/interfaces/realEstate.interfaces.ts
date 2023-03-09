import { z } from "zod";
import {
  realEstateSchema,
  returnRealEstateSchema,
} from "../schemas/realEstate.schema";

type IRealEstateRequest = z.infer<typeof realEstateSchema>;
type IRealEstateResponse = z.infer<typeof returnRealEstateSchema>;

export { IRealEstateRequest, IRealEstateResponse };
