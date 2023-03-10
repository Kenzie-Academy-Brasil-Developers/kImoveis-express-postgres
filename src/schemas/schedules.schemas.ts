import { z } from "zod";
import { returnRealEstateSchema } from "./realEstate.schema";
import { returnUserSchema } from "./users.schemas";

const schedulesSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const returnSchedulesSchema = schedulesSchema
  .omit({ realEstateId: true })
  .extend({
    id: z.number(),
    realEstateId: returnRealEstateSchema,
    userId: returnUserSchema,
  });

export { returnSchedulesSchema, schedulesSchema };
