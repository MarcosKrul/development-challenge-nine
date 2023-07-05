import React from 'react';
import PatientIcon from '@mui/icons-material/Sick';
import HomeIcon from '@mui/icons-material/Home';
import { AppRouteModel } from '@models/AppRouteModel';

const routes: AppRouteModel[] = [
  {
    labelKey: 'LABEL_HOME',
    path: '/home/',
    icon: () => <HomeIcon />,
    tooltipKey: 'TOOLTIP_HOME',
  },
  {
    labelKey: 'LABEL_PATIENTS',
    path: '/patients/',
    icon: () => <PatientIcon />,
    tooltipKey: 'TOOLTIP_PATIENTS',
  },
];

export { routes };
