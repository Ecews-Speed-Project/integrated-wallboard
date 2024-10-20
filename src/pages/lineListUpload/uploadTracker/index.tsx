// MainGrid.tsx
import React, { useState, useEffect, useCallback, FunctionComponent } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';


import '../../../App.css';
import { useSelector } from 'react-redux';
import { LINE_LIST_REPORT } from '../../../utils/constants';
import { RootState } from '../../../store';
import BreadCrumb from '../../../components/BreadCrumb';
import PaginationComponent from '../../../components/Pagination';

const UploadTracker: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth);

  const [state, setState] = useState({
    data: [] as GridRowsProp,
    page: 0,
    pageSize: 20,
    rowCount: 0,
    totalFile: 0,
    totalState: 0,
    totalFacility: 0,
    txCurr:0,
    totalTxCurr:0,
    loading: false,
  });


  /* 
  
    const [data, setData] = useState<GridRowsProp>([]);
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [rowCount, setRowCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); */

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
        return date.toLocaleDateString('en-GB');
      }
    },
    { 
      field: 'lastEMRDate', 
      headerName: 'Last  EMR Date', 
      width: 200, 
      type: 'string',
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-GB');
      }
    }
  ];

  // Fetch data function that simulates API calls
  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));

    const response = await fetch(`${LINE_LIST_REPORT}?page=${state.page}&pageSize=${state.pageSize}`, {
      method: 'POST', // Change method to POST
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
        Authorization: `Bearer  ${userData!.token}`
      },
      body: JSON.stringify({
        state: userData.stateId     // Include parameters in the request body
      }),
    });
    const jsonResponse = await response.json();
    setState((prevState) => ({
      ...prevState,
      data: jsonResponse.uploads,
      rowCount: jsonResponse.totalPages,
      totalFile: jsonResponse.totalCount,
      totalState: jsonResponse.totalState,
      totalFacility: jsonResponse.totalFacility,
      totalTxCurr: jsonResponse.totalTxCurr,
      loading: false,
    }));

  }, [state.page, state.pageSize, userData.token]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="bg-container container-fluid  mt-2">
      <BreadCrumb state={"General"} page={"Upload Tracker"}></BreadCrumb>

      <div style={{ height: 400, width: '100%' }}>
        <Box sx={{ padding: 2 }}>

          {/* Cards displaying the statistics */}
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
                    Total Facility uploaded
                  </Typography>
                  <Typography variant="h4">{state.rowCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#f44336', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Total TX_CURR
                  </Typography>
                  <Typography variant="h4">{state.txCurr}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <DataGrid
            rows={state.data}
            columns={columns}
            paginationMode="server" // Enable server-side pagination
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
                backgroundColor: '#333333', // Dark background color
                color: '#ffffff',
                fontWeight: 'bold',          // Make text bold
                textAlign: 'center',         // Center-align text         // Light text color
              },
              '& .MuiDataGrid-cell': {
                color: '#333',              // Adjust cell text color if needed
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
                backgroundColor: '#e0f7fa', // Hover effect for rows
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
