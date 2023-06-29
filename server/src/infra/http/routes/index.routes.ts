import { Router } from "express";

import { RoutesPrefix } from "@commons/RoutesPrefix";

import { routes as patientRoutes } from "./patient.routes";

const routes = Router();

routes.use(RoutesPrefix.PATIENT, patientRoutes);

export { routes };
