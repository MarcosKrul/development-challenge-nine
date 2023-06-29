import {
  IPatientRepository,
  PatientRepository,
} from "@database/repositories/patient";

import { container } from "./container";

container.bind<IPatientRepository>("PatientRepository").to(PatientRepository);
