import { i18n } from "@config/i18n";
import { Languages } from "@config/i18n/Languages";
import { AppError } from "@handlers/error/AppError";
import { getMessage } from "@helpers/translatedMessagesControl";
import { IMiddleware } from "@http/models/IMiddleware";

const validate = (value: string): Languages | null => {
  const valid = Object.values(Languages).filter(
    (item: string) => item === value
  );

  const formatted =
    valid && valid.length === 1 ? (valid[0] as Languages) : null;

  return formatted;
};

const internationalizationMiddleware: IMiddleware = async (req, _, next) => {
  try {
    const { lang } = req.query;
    const { language } = req.headers;

    i18n.setLocale(
      validate(language as string) ||
        validate(lang as string) ||
        Languages.PORTUGUESE
    );
  } catch (e) {
    throw new AppError(
      "INTERNAL_SERVER_ERROR",
      getMessage("ErrorGenericUnknown")
    );
  }

  return next();
};

export { internationalizationMiddleware };
