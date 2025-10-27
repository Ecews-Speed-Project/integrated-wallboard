import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
} from '@mui/material';

interface Column<T> {
  id: string;
  label: string;
  render: (row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
}

function DataTable<T>({
  columns,
  data,
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  page = 1,
  totalPages = 1,
  onPageChange,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  return (
    <Box>
      {onSearchChange && (
        <TextField
          fullWidth
          variant="outlined"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="mb-6"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="fas fa-search text-gray-400"></i>
              </InputAdornment>
            ),
          }}
        />
      )}

      <TableContainer component={Paper} className="shadow-sm">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ width: column.width }}
                  className="font-semibold"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.render(row)}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8">
                  <Typography color="textSecondary">{emptyMessage}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {onPageChange && totalPages > 1 && (
        <Box className="flex justify-center mt-6">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
}

export default DataTable; 