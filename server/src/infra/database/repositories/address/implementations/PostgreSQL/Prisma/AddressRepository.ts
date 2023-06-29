import { IAddressRepository } from "@database/repositories/address/models/IAddressRepository";
import { BaseRepository } from "@database/repositories/BaseRepository";

class AddressRepository extends BaseRepository implements IAddressRepository {}

export { AddressRepository };
