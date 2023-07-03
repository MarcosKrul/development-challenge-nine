import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';
import SectionDivider from '@components/SectionDivider';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableColumnModel } from '@models/TableColumnModel';
import {
  PatientsTableCollapseDataSection,
  PatientsTableCollapseText,
} from './styles';
import { TableBody, TableContainer, TableHead, Tooltip } from '@mui/material';
import { ListPatientsApiResponseModel } from '@context/Patients/models/ListPatientsApiResponseModel';

interface IPatientsTableProps {
  deleteFn: (id: string) => void;
  editFn: (id: string) => void;
  rows: ListPatientsApiResponseModel[];
}

const columns: TableColumnModel[] = [
  { id: 0, labelKey: null },
  { id: 1, labelKey: 'LABEL_NAME' },
  { id: 2, labelKey: 'LABEL_EMAIL' },
  { id: 3, labelKey: 'LABEL_BIRTH_DATE_AND_AGE' },
  { id: 4, labelKey: 'LABEL_ACTIONS' },
];

const PatientsTable = ({ rows, deleteFn, editFn }: IPatientsTableProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<string>('');

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {columns.map(({ id, labelKey, align }) => (
              <TableCell align={align || 'left'} key={id}>
                {labelKey ? t(labelKey) : ''}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <React.Fragment key={row.id}>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                  <Tooltip
                    title={
                      open === row.id
                        ? t('TOOLTIP_TO_RECALL')
                        : t('TOOLTIP_EXPAND')
                    }
                  >
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() =>
                        open === row.id ? setOpen('') : setOpen(row.id)
                      }
                    >
                      {open === row.id ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">
                  {row.birthDate} ({row.age} {t('LABEL_AGE')})
                </TableCell>
                <TableCell align="left">
                  <Tooltip title={t('TOOLTIP_EDIT')}>
                    <IconButton onClick={() => editFn(row.id)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('TOOLTIP_DELETE')}>
                    <IconButton onClick={() => deleteFn(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={open === row.id} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <SectionDivider fontSize={14}>
                        {t('LABEL_ADDRESS')}
                      </SectionDivider>

                      <PatientsTableCollapseDataSection>
                        <PatientsTableCollapseText>
                          <span>{t('LABEL_ZIP_CODE')}: </span>
                          {row.address.zipCode}
                        </PatientsTableCollapseText>
                        <PatientsTableCollapseText>
                          <span>{t('LABEL_CITY')}: </span>
                          {row.address.city}
                        </PatientsTableCollapseText>
                        <PatientsTableCollapseText>
                          <span>{t('LABEL_STATE')}: </span>
                          {row.address.state}
                        </PatientsTableCollapseText>
                        <PatientsTableCollapseText>
                          <span>{t('LABEL_DISTRICT')}: </span>
                          {row.address.district}
                        </PatientsTableCollapseText>
                        <PatientsTableCollapseText>
                          <span>{t('LABEL_PUBLIC_AREA')}: </span>
                          {row.address.publicArea}
                        </PatientsTableCollapseText>
                        {row.address.complement ? (
                          <PatientsTableCollapseText>
                            <span>{t('LABEL_COMPLEMENT')}: </span>
                            {row.address.complement}
                          </PatientsTableCollapseText>
                        ) : null}
                      </PatientsTableCollapseDataSection>

                      <SectionDivider fontSize={14}>
                        {t('LABEL_PATIENT_AUX_DATA')}
                      </SectionDivider>

                      <PatientsTableCollapseDataSection>
                        <PatientsTableCollapseText>
                          <span>{t('LABEL_CREATED_AT')}: </span>
                          {row.createdAt.date} ({row.createdAt.readableDate})
                        </PatientsTableCollapseText>
                        <PatientsTableCollapseText>
                          <span>{t('LABEL_UPDATED_AT')}: </span>
                          {row.updatedAt.date} ({row.updatedAt.readableDate})
                        </PatientsTableCollapseText>
                      </PatientsTableCollapseDataSection>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { PatientsTable };
