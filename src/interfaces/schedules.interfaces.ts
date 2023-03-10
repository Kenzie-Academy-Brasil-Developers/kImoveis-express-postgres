import { z } from "zod";
import {
  returnSchedulesSchema,
  schedulesSchema,
} from "../schemas/schedules.schemas";

type ISchedulesRequest = z.infer<typeof schedulesSchema>;
type ISchedulesResponse = z.infer<typeof returnSchedulesSchema>;

export { ISchedulesRequest, ISchedulesResponse };
