// MainGrid.tsx
import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';


import '../../../App.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../../components/BreadCrumb';
import { RootState } from '../../../store';
import { DOWNLOAD_LINE_LIST, GENERATE_LINE_LIST, GET_LINE_LIST } from '../../../utils/constants';
import PaginationComponent from '../../../components/Pagination';

const GenerateLineList: React.FC = () => {
  const [data, setData] = useState<GridRowsProp>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUploadType, setSelectedUploadType] = useState('ALL');
  const userData = useSelector((state: RootState) => state.auth);


  const columns: GridColDef[] = [
    { field: 'linkCode', headerName: 'Batch No', width: 500 },
    { field: 'createdAt', headerName: 'created At', width: 200 },
    { field: 'jobStatusChangedAt', headerName: 'Updated At', width: 200,  type: 'number'  },
    { field: 'email', headerName: 'Owner', width: 200, type: 'string' },
    { field: 'jobStatus', headerName: 'Job Status', width: 200, type: 'string' },
    {
      field: 'goToLink',
      headerName: 'Dowload Line list',
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.open(`${DOWNLOAD_LINE_LIST}${params.row.linkCode}`, '_blank')}
        >
          Dowload Line list
        </Button>
      ),
    },
    

  ];

  // Fetch data function that simulates API calls
  const fetchData = async () => {
    setLoading(true);
    // Simulate API 

    const response = await fetch(`${GET_LINE_LIST}?page=1&pageSize=10`, {
      method: 'GET', // Change method to POST
      headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
          Authorization: `Bearer  ${userData!.token}`
      },
     });
    const jsonResponse = await response.json();
    setData(jsonResponse.uploads); // Replace this with real API data
    setRowCount(jsonResponse.totalPages); // Set total rows for pagination
    setLoading(false);
  };

  const generateList = async () => {
    try {
      // Simulate a file upload
      const formData = new FormData();
      formData.append('file', new Blob(['sample data'], { type: 'text/plain' }), 'example.txt');

      // Post the file to the upload API
      await  fetch(`${GENERATE_LINE_LIST}`, {
        method: 'POST', // Change method to POST
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
            Authorization: `Bearer  ${userData!.token}`
        },
        body: JSON.stringify({
          state:0,   

        })
      });

      // After upload, reload the data in the grid
      fetchData();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);
  // Calculate the statistics
  // Calculate the statistics
  const totalUploads = data.length;
  const processedUploads = data.length;
  const pendingUploads = data.length;

  return (
    <div className="bg-container container-fluid  mt-2">
      <BreadCrumb state={"General"} page={"Generate Linelist"}></BreadCrumb>

      <div style={{ height: 400, width: '100%' }}>
        <Box sx={{ padding: 2 }}>
        <Grid container spacing={2} mb={4} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={generateList}  // Uploads and reloads the grid on click
          >
            Generate new linelist
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="upload-type-label">Upload Type</InputLabel>
            <Select
              labelId="upload-type-label"
              value={selectedUploadType}
              onChange={(e) => setSelectedUploadType(e.target.value)}
              label="Upload Type"
            >
              <MenuItem value="ALL">Generate All</MenuItem>
              <MenuItem value="1">Generate line list for Delta</MenuItem>
              <MenuItem value="2">Generate line list for Osun</MenuItem>
              <MenuItem value="3">Generate line list for Ekiti</MenuItem>

            </Select>
          </FormControl>
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
            getRowId={(row) => row.linkCode}
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

export default GenerateLineList;
