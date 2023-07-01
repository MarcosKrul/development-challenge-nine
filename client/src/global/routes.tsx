import React, { ReactNode } from 'react';
import PatientIcon from '@mui/icons-material/Sick';
import HomeIcon from '@mui/icons-material/Home';

interface IAppRoute {
  path: string;
  labelKey: string;
  icon: () => ReactNode;
}

const routes: IAppRoute[] = [
  {
    labelKey: 'LABEL_HOME',
    path: '/home/',
    icon: (): ReactNode => <HomeIcon />,
  },
  {
    labelKey: 'LABEL_PATIENTS',
    path: '/patients/',
    icon: (): ReactNode => <PatientIcon />,
  },
];

export { routes };
