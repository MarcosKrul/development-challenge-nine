import { Router } from "express";

const routes = Router();

routes.get("/teste", () => {
  console.log("eae");
});

export { routes };
