// MainGrid.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import PaginationComponent from '../../../components/Pagination';
import BreadCrumb from '../../../components/BreadCrumb';
import '../../../App.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { VIEW_UPLOADS } from '../../../utils/constants';

const MainGrid: React.FC = () => {
  const [state, setState] = useState({
    data: [] as GridRowsProp,
    page: 0,
    pageSize: 10,
    rowCount: 0,
    totalFile:0,
    loading: false,
  });

  const userData = useSelector((state: RootState) => state.auth);

  const columns: GridColDef[] = [
    { field: 'uploadFileName', headerName: 'File Name', width: 500 },
    { field: 'fileSize', headerName: 'File Size', width: 200, type: 'number' },
    { field: 'processingStatus', headerName: 'Status', width: 200 },
    { field: 'uploadDate', headerName: 'Upload Date', width: 200 },
    { field: 'inUse', headerName: 'In Use', width: 100, type: 'boolean' },
    { field: 'numberOfRows', headerName: 'Total Patients', width: 300, type: 'number' },
    { field: 'uploadType', headerName: 'Upload Type', width: 300, type: 'string' },
  ];

  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch(`${VIEW_UPLOADS}?page=${state.page}&pageSize=${state.pageSize}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      const jsonResponse = await response.json();
      setState((prevState) => ({
        ...prevState,
        data: jsonResponse.uploads,
        rowCount: jsonResponse.totalPages,
        totalFile : jsonResponse.totalCount,
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [state.page, state.pageSize, userData.token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalUploads = state.totalFile;
  const processedUploads = state.data.filter((upload) => upload.processingStatus === 'PROCESSED').length;
  const pendingUploads = state.data.filter((upload) => upload.processingStatus === 'PENDING').length;

  return (
    <div className="bg-container container-fluid mt-2">
      <BreadCrumb state="General" page="Previous Upload" />
      <div style={{ height: 400, width: '100%' }}>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Total Uploads
                  </Typography>
                  <Typography variant="h4">{totalUploads}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#4caf50', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Processed Uploads
                  </Typography>
                  <Typography variant="h4">{processedUploads}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#f44336', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Pending Uploads
                  </Typography>
                  <Typography variant="h4">{pendingUploads}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <DataGrid
            rows={state.data}
            columns={columns}
            paginationMode="server"
            loading={state.loading}
            rowCount={state.rowCount}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: state.pageSize,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            getRowId={(row) => row.fileId}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#333333',
                color: '#ffffff',
                fontWeight: 'bold',
                textAlign: 'center',
              },
              '& .MuiDataGrid-cell': {
                color: '#333',
              },
              '& .MuiDataGrid-row': {
                '&:nth-of-type(odd)': {
                  backgroundColor: '#f5f5f5',
                },
                '&:nth-of-type(even)': {
                  backgroundColor: '#ffffff',
                },
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#e0f7fa',
              },
            }}
          />
          <PaginationComponent
            page={state.page}
            rowCount={state.rowCount}
            pageSize={state.pageSize}
            onPageChange={(newPage) => setState((prevState) => ({ ...prevState, page: newPage }))}
            onPageSizeChange={(newPageSize) => setState((prevState) => ({ ...prevState, pageSize: newPageSize }))}
          />
        </Box>
      </div>
    </div>
  );
};

export default MainGrid;
