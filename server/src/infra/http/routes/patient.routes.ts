import { Router } from "express";

import { PatientController } from "@http/controllers/PatientController";
import { HandleUrlPatternMatchMiddleware } from "@middlewares/HandleUrlPatternMatchMiddleware";
import { LogMiddleware } from "@middlewares/LogMiddleware";

const routes = Router();
const controller = new PatientController();
const logMiddleware = new LogMiddleware();

const handleUrlPatternMatchMiddleware = new HandleUrlPatternMatchMiddleware();

routes.post(
  "/search",
  handleUrlPatternMatchMiddleware.skipIfHasUrlMatched,
  logMiddleware.routeStart,
  controller.list,
  handleUrlPatternMatchMiddleware.setHasUrlMatched()
);

export { routes };
