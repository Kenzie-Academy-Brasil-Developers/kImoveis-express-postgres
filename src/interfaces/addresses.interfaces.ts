import { z } from "zod";
import {
  addressSchema,
  returnAddressSchema,
  returnListAddressesSchema,
} from "../schemas/addresses.schemas";

type IAddressRequest = z.infer<typeof addressSchema>;
type IAddressResponse = z.infer<typeof returnAddressSchema>;
type IAllAddressesReturn = z.infer<typeof returnListAddressesSchema>;

export { IAddressRequest, IAddressResponse, IAllAddressesReturn };
