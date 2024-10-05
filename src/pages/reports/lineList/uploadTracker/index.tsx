// MainGrid.tsx
import '../../../../App.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import React, { useState, useEffect, useCallback } from 'react';
import BreadCrumb from '../../../../components/BreadCrumb';
import { LINE_LIST_REPORT } from '../../../../utils/constants';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import PaginationComponent from '../../../../components/Pagination';

const UploadTracker: React.FC = () => {
  const [state, setState] = useState({
    data: [] as GridRowsProp,
    page: 0,
    pageSize: 10,
    rowCount: 0,
    loading: false,
  });

  const userData = useSelector((state: RootState) => state.auth);

  const columns: GridColDef[] = [
    { field: 'state', headerName: 'State', width: 500 },
    { field: 'datimCode', headerName: 'Datim code', width: 200, type: 'string' },
    { field: 'facilityName', headerName: 'Facility Name', width: 200 },
    { field: 'txCurrent', headerName: 'TX_CURR', width: 200, type: 'number' },
    { field: 'dateGenerate', headerName: 'Date Generate', width: 200, type: 'string' },
    { field: 'lastEMRDate', headerName: 'Last EMR Date', width: 200, type: 'string' },
  ];

  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch(LINE_LIST_REPORT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          page: state.page,
          state: 0,
          pageSize: state.pageSize,
        }),
      });
      const jsonResponse = await response.json();
      setState((prevState) => ({
        ...prevState,
        data: jsonResponse.uploads,
        rowCount: jsonResponse.totalPages,
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

  const totalUploads = state.data.length;
  const processedUploads = state.data.length;
  const pendingUploads = state.data.length;

  return (
    <div className="bg-container container-fluid mt-2">
      <BreadCrumb state="General" page="Upload Tracker" />
      <div style={{ height: 400, width: '100%' }}>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Total States
                  </Typography>
                  <Typography variant="h4">{totalUploads}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#4caf50', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Total Recent uploads
                  </Typography>
                  <Typography variant="h4">{processedUploads}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#f44336', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Total TX_CURR
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
            getRowId={(row) => row.datimCode}
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

export default UploadTracker;
