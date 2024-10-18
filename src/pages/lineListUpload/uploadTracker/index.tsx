// MainGrid.tsx
import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';


import '../../../App.css';
import { useSelector } from 'react-redux';
import { LINE_LIST_REPORT } from '../../../utils/constants';
import { RootState } from '../../../store';
import BreadCrumb from '../../../components/BreadCrumb';
import PaginationComponent from '../../../components/Pagination';

const UploadTracker : React.FC = () => {
  const [data, setData] = useState<GridRowsProp>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.auth);

  const columns: GridColDef[] = [
    { field: 'state', headerName: 'State', width: 500 },
    { field: 'datimCode', headerName: 'Datim code', width: 200, type: 'string' },
    { field: 'facilityName', headerName: 'Facility Name', width: 200 },
    { field: 'txCurrent', headerName: 'TX_CURR', width: 200,  type: 'number'  },
    { field: 'dateGenerate', headerName: 'Date Generate', width: 200, type: 'string' },
    { field: 'lastEMRDate', headerName: 'Last  EMR Date', width: 200, type: 'string' },
  ];

  // Fetch data function that simulates API calls
  const fetchData = async () => {
    setLoading(true);
    // Simulate API 

    const response = await fetch(`${LINE_LIST_REPORT}`, {
      method: 'POST', // Change method to POST
      headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
          Authorization: `Bearer  ${userData!.token}`
      },
      body: JSON.stringify({
          page: page, 
          state:0,     // Include parameters in the request body
          pageSize: pageSize
      }),
  });
    const jsonResponse = await response.json();
    setData(jsonResponse.uploads); // Replace this with real API data
    setRowCount(jsonResponse.totalCount); // Set total rows for pagination
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);
  // Calculate the statistics
  // Calculate the statistics
  const totalUploads = rowCount;
  const processedUploads = data.length;
  const pendingUploads = data.length;

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
                  <Typography variant="h4">{3}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#4caf50', color: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                  Total Recent uploads
                  </Typography>
                  <Typography variant="h4">{rowCount}</Typography>
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
            rows={data}
            columns={columns}
            paginationMode="server" // Enable server-side pagination
            loading={loading}
            rowCount={rowCount}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pageSize,
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
            page={page}
            rowCount={rowCount}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </Box>
      </div>
    </div>
  );
};

export default UploadTracker;
