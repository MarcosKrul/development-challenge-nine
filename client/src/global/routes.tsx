import React, { ReactNode } from 'react';
import PatientIcon from '@mui/icons-material/Sick';
import HomeIcon from '@mui/icons-material/Home';
import { getMessage } from '@helpers/getMessage';

interface IAppRoute {
  path: string;
  label: string;
  icon: () => ReactNode;
}

const routes: IAppRoute[] = [
  {
    label: getMessage('LABEL_HOME'),
    path: '/home/',
    icon: (): ReactNode => <HomeIcon />,
  },
  {
    label: getMessage('LABEL_PATIENTS'),
    path: '/patients/',
    icon: (): ReactNode => <PatientIcon />,
  },
];

export { routes };
