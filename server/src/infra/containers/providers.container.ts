import { DateProvider, IDateProvider } from "@providers/date";
import { IMaskProvider, MaskProvider } from "@providers/mask";
import {
  IUniqueIdentifierProvider,
  UniqueIdentifierProvider,
} from "@providers/uniqueIdentifier";

import { container } from "./container";

container
  .bind<IUniqueIdentifierProvider>("UniqueIdentifierProvider")
  .to(UniqueIdentifierProvider);

container.bind<IMaskProvider>("MaskProvider").to(MaskProvider);

container.bind<IDateProvider>("DateProvider").to(DateProvider);
