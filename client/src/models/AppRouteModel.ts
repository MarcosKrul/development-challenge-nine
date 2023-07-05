interface AppRouteModel {
  path: string;
  labelKey: string;
  icon: () => JSX.Element;
  tooltipKey: string;
}

export type { AppRouteModel };
