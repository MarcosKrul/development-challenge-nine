import { AppError } from "@handlers/error/AppError";
import { logger } from "@log/index";

import { getMessage } from "./translatedMessagesControl";

type keys = "PORT" | "SUPPORT_ID" | "LIST_ALLOWED_ORIGINS";

const env = (key: keys, errorMessage = "ErrorEnvVarNotFound"): string => {
  const _env = process.env[key];

  if (!_env) {
    logger.error(`Access attempting to non-existing env var: ${key}`);

    throw new AppError("BAD_REQUEST", getMessage(errorMessage));
  }

  return _env;
};

export { env };
