import { ReactNode } from 'react';

interface AppRouteModel {
  path: string;
  labelKey: string;
  icon: () => ReactNode;
}

export type { AppRouteModel };
