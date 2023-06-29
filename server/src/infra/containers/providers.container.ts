import {
  IUniqueIdentifierProvider,
  UniqueIdentifierProvider,
} from "src/providers/uniqueIdentifier";

import { container } from "./container";

container
  .bind<IUniqueIdentifierProvider>("UniqueIdentifierProvider")
  .to(UniqueIdentifierProvider);
