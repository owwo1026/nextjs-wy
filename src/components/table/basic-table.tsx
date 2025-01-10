import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';

import cn from '@/utils/className';

type Order = 'asc' | 'desc';

const paginationLimitOptions = [2, 5, 10, 25, 50, 100];

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return (a, b) => {
    const comparison = a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
    return order === 'desc' ? -comparison : comparison;
  };
}

export interface HeadCell {
  id: string;
  label: string;
  numeric?: boolean;
  disablePadding?: boolean;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
  render?: (value: any) => any;
  renderRowIndex?: boolean;
}

interface EnhancedTableProps {
  columns: Array<HeadCell>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  checkable: boolean;
  renderRowIndex: boolean;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { renderRowIndex, checkable, columns, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {checkable && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        {renderRowIndex && (
          <TableCell sx={{ fontSize: '16px' }} align="center">
            項次
          </TableCell>
        )}
        {columns.map((col) => (
          <TableCell
            key={col.id}
            align={col.align || 'left'}
            sx={{ fontSize: '16px' }}
            padding={col.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === col.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === col.id}
              direction={orderBy === col.id ? order : 'asc'}
              onClick={createSortHandler(col.id)}
            >
              {col.label}
              {orderBy === col.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  title?: string;
  numSelected: number;
  onChange?: (value: any) => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { title, numSelected, onChange } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
      ]}
    >
      {title && (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
      )}
      {numSelected > 0 && (
        <div className="flex flex-row gap-2">
          <p className="flex items-center whitespace-nowrap px-2">{`已選擇${numSelected}`}</p>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                onChange && onChange([]);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  );
}

export interface TableProps {
  title?: string;
  columns: Array<HeadCell>; // 定义表头
  data: Array<Record<string, any>>;
  rootClassName?: string;
  padRow?: boolean;
  onRowClick?: (event: React.MouseEvent<unknown>, row: Record<string, any>) => void;
  value?: any;
  onChange?: (value: any) => void;
  checkable?: boolean;
  renderRowIndex?: boolean;
}

export default function BasicTable({
  title,
  columns,
  data,
  rootClassName,
  padRow = true,
  onRowClick,
  value = [],
  onChange,
  checkable = false,
  renderRowIndex = true,
}: TableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  console.log('table data', data);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newSelected = [];
    if (event.target.checked) {
      newSelected = data.map((n) => n.id);
    }
    onChange && onChange(newSelected);
  };

  const handleSelect = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = value.indexOf(id);
    let newSelected: readonly number[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(value, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(value.slice(1));
    } else if (selectedIndex === value.length - 1) {
      newSelected = newSelected.concat(value.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(value.slice(0, selectedIndex), value.slice(selectedIndex + 1));
    }
    onChange && onChange(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () => [...data].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, data],
  );

  return (
    <Paper className={cn('flex flex-col', rootClassName)}>
      <EnhancedTableToolbar title={title} numSelected={value.length} onChange={onChange} />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <EnhancedTableHead
            columns={columns}
            numSelected={value.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            checkable={checkable}
            renderRowIndex={renderRowIndex}
          />
          <TableBody>
            {visibleRows.map((row, index) => (
              <TableRow
                key={index}
                tabIndex={-1}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={(e) => {
                  checkable && handleSelect(e, row.id);
                  onRowClick && onRowClick(e, row);
                }}
                role="checkbox"
                selected={value.includes(row.id)}
              >
                {checkable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={value.includes(row.id)}
                      inputProps={{
                        'aria-labelledby': `enhanced-table-checkbox-${index}`,
                      }}
                    />
                  </TableCell>
                )}
                {renderRowIndex && (
                  <TableCell key={`row-index-${index}`} sx={{ fontSize: '14px' }} align="center">
                    {index + 1}
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    align={col.align || 'left'}
                    sx={{
                      fontSize: '14px',
                    }}
                  >
                    {col.render ? col.render(row[col.id]) : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {/* 未滿筆數的地方補空白 */}
            {padRow && emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={paginationLimitOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="每頁筆數"
      />
    </Paper>
  );
}
