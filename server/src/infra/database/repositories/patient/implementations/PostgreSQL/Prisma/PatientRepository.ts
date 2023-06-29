import { BaseRepository } from "src/infra/database/repositories/BaseRepository";

import { IPatientRepository } from "../../../models/IPatientRepository";

class PatientRepository extends BaseRepository implements IPatientRepository {}

export { PatientRepository };
