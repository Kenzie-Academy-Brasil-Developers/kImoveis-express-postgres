import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schema";

type ILogin = z.infer<typeof createLoginSchema>;

interface IJwtPayload {
  expiresIn: string;
  subject: string;
}

export { ILogin, IJwtPayload };
