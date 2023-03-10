import { z } from "zod";
import {
  addressSchema,
  returnAddressSchema,
} from "../schemas/addresses.schemas";

type IAddressRequest = z.infer<typeof addressSchema>;
type IAddressResponse = z.infer<typeof returnAddressSchema>;

export { IAddressRequest, IAddressResponse };
