// MainGrid.tsx
import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

import PaginationComponent from '../../components/Pagination';
import BreadCrumb from '../../components/BreadCrumb';
import '../../App.css';

const MainGrid: React.FC = () => {
    const [data, setData] = useState<GridRowsProp>([]);
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [rowCount, setRowCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const columns: GridColDef[] = [
        { field: 'uploadFileName', headerName: 'File Name', width: 500 },
        { field: 'fileSize', headerName: 'File Size', width: 200, type: 'number' },
        { field: 'processingStatus', headerName: 'Status', width: 200 },
        { field: 'uploadDate', headerName: 'Upload Date', width: 200 },
        { field: 'inUse', headerName: 'In Use', width: 100, type: 'boolean' },
        { field: 'numberOfRows', headerName: 'Total Patients', width: 300, type: 'number' },
        { field: 'uploadType', headerName: 'Upload Type', width: 300, type: 'string' },

    ];

    // Fetch data function that simulates API calls
    const fetchData = async () => {
        setLoading(true);
        // Simulate API 
        const user = JSON.parse(localStorage.getItem('user') as string);

        const response = await fetch(`http://eboard.ecews.org/api/import/view-uploads?page=${page}&pageSize=${pageSize}`, {
            headers: { Authorization: `Bearer  ${user!.token}` },
        });
        const jsonResponse = await response.json();
        setData(jsonResponse.uploads); // Replace this with real API data
        setRowCount(jsonResponse.totalPages); // Set total rows for pagination
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page, pageSize]);
 // Calculate the statistics
 // Calculate the statistics
 const totalUploads = data.length;
 const processedUploads = data.filter((upload) => upload.processingStatus === 'PROCESSED').length;
 const pendingUploads = data.filter((upload) => upload.processingStatus === 'PENDING').length;

    return (
        <div className="bg-container container-fluid  mt-2">
            <BreadCrumb state={"General"} page={"Previous Upload"}></BreadCrumb>

            <div style={{ height: 400, width: '100%' }}>
            <Box sx={{ padding: 2 }}>

{/* Cards displaying the statistics */}
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
                    getRowId={(row) => row.fileId}
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

export default MainGrid;
