import i18n from "i18n";
import path from "node:path";

import { AppError } from "@handlers/error/AppError";
import { logger } from "@log/index";

import { Languages } from "./Languages";

i18n.configure({
  locales: Object.values(Languages),
  defaultLocale: Languages.PORTUGUESE,
  updateFiles: false,
  header: "language",
  queryParameter: "lang",
  extension: ".json",
  directory: path.join(__dirname, "..", "..", "..", "..", "i18n_translations"),
  api: {
    __: "translate",
    __n: "translateN",
  },
  missingKeyFn(locale, value) {
    const message = ((): string => {
      switch (locale) {
        case Languages.PORTUGUESE:
          return "Ocorreu um erro interno no servidor";
        case Languages.ENGLISH:
          return "An internal error occurred on the server";
        default:
          return "";
      }
    })();

    logger.error(`Missing key: ${value} for ${locale} language`);

    throw new AppError("INTERNAL_SERVER_ERROR", message);
  },
});

export { i18n };
