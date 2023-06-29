import { NextFunction, Request, Response } from "express";
import {
  DeletePatientService,
  ListPatientsService,
} from "src/application/services/patient";

import { container } from "@containers/container";
import { ListPatientsResponseModel } from "@dtos/patient/ListPatientsResponseModel";
import { getMessage } from "@helpers/translatedMessagesControl";
import { IPaginationResponse } from "@http/models/IPaginationResponse";
import { IResponseMessage } from "@http/models/IResponseMessage";
import { HttpStatus } from "@http/utils/HttpStatus";

class PatientController {
  public async list(
    req: Request,
    res: Response<
      IResponseMessage<IPaginationResponse<ListPatientsResponseModel>>
    >,
    next: NextFunction
  ): Promise<void> {
    const { size, page } = req.query;
    const { name, email } = req.body;

    const service = container.resolve(ListPatientsService);

    const result = await service.execute({
      page,
      size,
      filters: {
        email,
        name,
      },
    });

    res.status(HttpStatus.OK).json({
      success: true,
      content: result,
      message: getMessage("SuccessGeneric"),
    });

    return next();
  }

  public async delete(
    req: Request,
    res: Response<IResponseMessage>,
    next: NextFunction
  ): Promise<void> {
    const { patient_id: patientId } = req.params;

    const service = container.resolve(DeletePatientService);

    await service.execute({
      patientId,
    });

    res.status(HttpStatus.OK).json({
      success: true,
      message: getMessage("SuccessGeneric"),
    });

    return next();
  }
}

export { PatientController };
