import { IMiddleware } from "@http/models/IMiddleware";
import { logger } from "@log/index";

class LogMiddleware {
  private _getRuntimeFormatted = (start: number, end: number): string =>
    `${Number((end - start) / 1000).toFixed(3)}s`;

  public routeStart: IMiddleware = async ({ method, originalUrl }, _, next) => {
    logger.info(
      `======================== ${method} ${originalUrl} ========================`
    );

    return next();
  };

  public routeEnd: IMiddleware = async (
    { runtime: { end, start } },
    { statusCode, statusMessage },
    next
  ) => {
    logger.info(
      `Request finished with ${statusCode} status code (${statusMessage}) in ${this._getRuntimeFormatted(
        start,
        end
      )}`
    );

    return next();
  };
}

export { LogMiddleware };
