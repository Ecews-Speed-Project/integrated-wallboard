// PaginationComponent.tsx
import React from 'react';
import { Pagination } from '@mui/material';

interface PaginationProps {
  page: number;
  rowCount: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  page,
  rowCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(rowCount / pageSize);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <Pagination
        count={totalPages}
        page={page + 1} // Material-UI Pagination component is 1-indexed, hence add 1
        onChange={(event, newPage) => onPageChange(newPage - 1)} // Convert to 0-indexed
      />
      <select
        value={pageSize}
        onChange={(event) => onPageSizeChange(parseInt(event.target.value, 10))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default PaginationComponent;
