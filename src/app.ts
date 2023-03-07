import express, { Application } from "express";
import { handleErrors } from "./errors";
import addressesRouters from "./routers/addresses/addresses.routers";
import categoriesRoutes from "./routers/categories/categories.router";
import loginRoutes from "./routers/login/login.router";
import realEstateRoutes from "./routers/realEstate/realEstate.router";
import schedulesRoutes from "./routers/schedules/schedules.router";
import usersRoutes from "./routers/users/users.router";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/addresses", addressesRouters);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleErrors);

export default app;
