import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IColumn } from '../../../../interfaces';
import { AppDeleteButton, AppEditButton } from '../app-button/app-button.component';

import styles from './app-table.module.scss';

interface AppTableProps {
  data: any;
  columns: IColumn[];
  hasActions?: boolean;
  onDeleteClick?: (item: unknown) => void;
}

export default function AppTable(props: AppTableProps) {
  const { columns, data, hasActions = false, onDeleteClick } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column: IColumn, index: number) => (
              <StyledTableCell key={index}>{column.name}</StyledTableCell>
            ))}
            {hasActions && <StyledTableCell>Actions</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <StyledTableRow key={row.name}>
              {columns.map((currentColumn: IColumn, index: number) => (
                <StyledTableCell key={index}>{row[currentColumn.value]}</StyledTableCell>
              ))}
              {hasActions && (
                <StyledTableCell align="right">
                  <div className={styles.buttonsContainer}>
                    <AppEditButton />
                    <AppDeleteButton
                      onClick={() => {
                        onDeleteClick && onDeleteClick(row);
                      }}
                    />
                  </div>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'purple',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
