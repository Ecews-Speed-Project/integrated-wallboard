// MainGrid.tsx
import '../../../../App.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import BreadCrumb from '../../../../components/BreadCrumb';
import PaginationComponent from '../../../../components/Pagination';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { DOWNLOAD_LINE_LIST, GENERATE_LINE_LIST, GET_LINE_LIST } from '../../../../utils/constants';

const GenerateLineList: React.FC = () => {
  const [state, setState] = useState({
    data: [] as GridRowsProp,
    page: 0,
    pageSize: 10,
    rowCount: 0,
    loading: false,
    selectedUploadType: 'ALL',
  });

  const userData = useSelector((state: RootState) => state.auth);

  const columns: GridColDef[] = [
    { field: 'linkCode', headerName: 'Batch No', width: 500 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'jobStatusChangedAt', headerName: 'Updated At', width: 200, type: 'number' },
    { field: 'email', headerName: 'Owner', width: 200, type: 'string' },
    { field: 'jobStatus', headerName: 'Job Status', width: 200, type: 'string' },
    {
      field: 'goToLink',
      headerName: 'Download Line List',
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.open(`${DOWNLOAD_LINE_LIST}${params.row.linkCode}`, '_blank')}
        >
          Download Line List
        </Button>
      ),
    },
  ];

  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch(`${GET_LINE_LIST}?page=${state.page + 1}&pageSize=${state.pageSize}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData!.token}`,
        },
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

  const generateList = async () => {
    try {
      await fetch(GENERATE_LINE_LIST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData!.token}`,
        },
        body: JSON.stringify({ state: 0 }),
      });
      fetchData();
    } catch (error) {
      console.error('Error generating list:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [state.page, state.pageSize, userData.stateId, fetchData]);

  return (
    <div className="bg-container container-fluid mt-2">
      <BreadCrumb state="General" page="Generate Linelist" />
      <div style={{ height: 400, width: '100%' }}>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2} mb={4} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" onClick={generateList}>
                Generate new linelist
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="upload-type-label">Upload Type</InputLabel>
                <Select
                  labelId="upload-type-label"
                  value={state.selectedUploadType}
                  onChange={(e) => setState((prevState) => ({ ...prevState, selectedUploadType: e.target.value }))}
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
            getRowId={(row) => row.linkCode}
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

export default GenerateLineList;
