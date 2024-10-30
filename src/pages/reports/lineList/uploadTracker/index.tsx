// MainGrid.tsx
import '../../../../App.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import React, { useState, useEffect, useCallback } from 'react';
import { LINE_LIST_REPORT } from '../../../../utils/constants';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import PaginationComponent from '../../../../components/Pagination';
import DynamicBreadCrumb from '../../../../components/DynamicBreadCrumb';

const UploadTracker: React.FC = () => {
  const [state, setState] = useState({
    data: [] as GridRowsProp,
    page: 0,
    pageSize: 20,
    rowCount: 0,
    totalState: 0,
    totalFacilities: 0,
    totalTxCurr: 0,
    loading: false,
  });

  const userData = useSelector((state: RootState) => state.auth);

  const columns: GridColDef[] = [
    { field: 'state', headerName: 'State', width: 500 },
    { field: 'datimCode', headerName: 'Datim code', width: 200, type: 'string' },
    { field: 'facilityName', headerName: 'Facility Name', width: 200 },
    { field: 'txCurrent', headerName: 'TX_CURR', width: 200, type: 'number' },
    { 
      field: 'dateGenerate', 
      headerName: 'Date Generate', 
      width: 200, 
      type: 'string',
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-GB'); // or use other locales e.g., 'en-US' for US format
      }
    },
    { 
      field: 'lastEMRDate', 
      headerName: 'Last EMR Date', 
      width: 200, 
      type: 'string',
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-GB');
      }
    },
  ];

  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch(`${LINE_LIST_REPORT}?page=${state.page+1}&pageSize=${state.pageSize}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          state:userData.stateId,
        }),
      });
      const jsonResponse = await response.json();
      setState((prevState) => ({
        ...prevState,
        data: jsonResponse.uploads,
        rowCount: jsonResponse.totalCount,
        totalState: jsonResponse.stats.totalState,
        totalFacilities: jsonResponse.stats.totalFacility,
        totalTxCurr: jsonResponse.stats.totalTxCurr,

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

  return (
    <div className="bg-container container-fluid mt-2">
      <DynamicBreadCrumb page="Upload Tracker" />
      <div style={{ height: 400, width: '100%' }}>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2} mb={4}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Total States
                  </Typography>
                  <Typography variant="h4">{state.totalState}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#4caf50', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Total Facilities Uploaded
                  </Typography>
                  <Typography variant="h4">{state.totalFacilities}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#f44336', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Total TX_CURR
                  </Typography>
                  <Typography variant="h4">{state.totalTxCurr}</Typography>
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
