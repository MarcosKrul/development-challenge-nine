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
routes.post(
  "/",
  handleUrlPatternMatchMiddleware.skipIfHasUrlMatched,
  logMiddleware.routeStart,
  controller.save,
  handleUrlPatternMatchMiddleware.setHasUrlMatched()
);
routes.delete(
  "/:patient_id",
  handleUrlPatternMatchMiddleware.skipIfHasUrlMatched,
  logMiddleware.routeStart,
  controller.delete,
  handleUrlPatternMatchMiddleware.setHasUrlMatched()
);

export { routes };
