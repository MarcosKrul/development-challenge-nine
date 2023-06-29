import { DateProvider, IDateProvider } from "src/providers/date";
import { IMaskProvider, MaskProvider } from "src/providers/mask";
import {
  IUniqueIdentifierProvider,
  UniqueIdentifierProvider,
} from "src/providers/uniqueIdentifier";

import { container } from "./container";

container
  .bind<IUniqueIdentifierProvider>("UniqueIdentifierProvider")
  .to(UniqueIdentifierProvider);

container.bind<IMaskProvider>("MaskProvider").to(MaskProvider);

container.bind<IDateProvider>("DateProvider").to(DateProvider);
