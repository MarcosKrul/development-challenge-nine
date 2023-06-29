import {
  AddressRepository,
  IAddressRepository,
} from "@database/repositories/address";
import {
  IPatientRepository,
  PatientRepository,
} from "@database/repositories/patient";

import { container } from "./container";

container.bind<IPatientRepository>("PatientRepository").to(PatientRepository);

container.bind<IAddressRepository>("AddressRepository").to(AddressRepository);
