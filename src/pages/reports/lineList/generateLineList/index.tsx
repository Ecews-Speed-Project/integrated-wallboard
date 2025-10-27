// MainGrid.tsx
import '../../../../App.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { 
  Box, 
  Button, 
  FormControl, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import { DOWNLOAD_LINE_LIST, GENERATE_LINE_LIST, GET_LINE_LIST } from '../../../../utils/constants';
import DynamicBreadCrumb from '../../../../components/DynamicBreadCrumb';

const GenerateLineList: React.FC = () => {
  const [state, setState] = useState({
    data: [] as GridRowsProp,
    page: 0,
    pageSize: 10,
    rowCount: 0,
    loading: false,
    selectedUploadType: 'ALL',
    totalGenerations: 0,
    pendingJobs: 0,
    completedJobs: 0,
  });

  const userData = useSelector((state: RootState) => state.auth);

  const columns: GridColDef[] = [
    { field: 'linkCode', headerName: 'Batch No', width: 200, flex: 1 },
    { 
      field: 'createdAt', 
      headerName: 'Created At', 
      width: 180,
      valueFormatter: (value) => value ? new Date(value).toLocaleString() : ''
    },
    { 
      field: 'jobStatusChangedAt', 
      headerName: 'Updated Atg', 
      width: 180,
      valueFormatter: (value) => value ? new Date(value).toLocaleString() : ''
/* 
      valueFormatter: ({ value, row }) => {
       
        return String(value).replace('T', ' ');      } */
    },
    { field: 'email', headerName: 'Owner', width: 200 },
    { 
      field: 'jobStatus', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params) => (
        <Box
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 1,
            ...getStatusStyle(params.value as string),
          }}
        >
          {params.value || 'Unknown'}
        </Box>
      ),
    },
    {
      field: 'goToLink',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => {
        const handleDownload = async () => {
          window.open(`${DOWNLOAD_LINE_LIST}${params.row.linkCode}`, '_blank')
        };

        return (
          <Button
            variant="contained"
            size="medium"
            startIcon={<i className="fas fa-download" style={{ fontSize: '1rem' }}></i>}
            onClick={handleDownload}
            disabled={params.row.jobStatus !== 'Completed' || !params.row.filePath}
            sx={{
              bgcolor: (params.row.jobStatus === 'Completed' && params.row.filePath) ? '#1e2a3b' : '#E5E7EB',
              color: (params.row.jobStatus === 'Completed' && params.row.filePath) ? '#fff' : '#9CA3AF',
              fontSize: '0.875rem',
              textTransform: 'none',
              boxShadow: 'none',
              minWidth: '140px',
              '&:hover': {
                bgcolor: (params.row.jobStatus === 'Completed' && params.row.filePath) ? '#162030' : '#E5E7EB',
                boxShadow: (params.row.jobStatus === 'Completed' && params.row.filePath) ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
              },
            }}
          >
            Download Line List
          </Button>
        );
      },
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'COMPLETED':
        return {
          bgcolor: '#DCFCE7',
          color: '#15803D',
        };
      case 'PENDING':
        return {
          bgcolor: '#FEF9C3',
          color: '#854D0E',
        };
      case 'PROCESSING':
        return {
          bgcolor: '#E0F2FE',
          color: '#0369A1',
        };
      case 'FAILED':
        return {
          bgcolor: '#FEE2E2',
          color: '#B91C1C',
        };
      default:
        return {
          bgcolor: '#F3F4F6',
          color: '#6B7280',
        };
    }
  };

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
        rowCount: jsonResponse.totalCount,
        totalGenerations: jsonResponse.uploads.length || 0,
        pendingJobs: jsonResponse.uploads.filter((upload: any) => upload.jobStatus === "Completed").length || 0,
        completedJobs: jsonResponse.uploads.filter((upload: any) => upload.jobStatus === "Pending").length || 0,
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [state.page, state.pageSize, userData.token]);

  const generateList = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      let stateId = (state.selectedUploadType === 'ALL') ? 0 : parseInt(state.selectedUploadType) 
      const response = await fetch(GENERATE_LINE_LIST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData!.token}`,
        },
        body: JSON.stringify({ 
          state: stateId
        }),
      });
      console.log(response)
      
      
      await fetchData();
    } catch (error) {
      console.error('Error generating list:', error);
      alert('Failed to generate line list. Please try again.');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 4 }}>
      <Box sx={{ width: '100%', mx: 'auto', px: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
              Generate Line List
            </Typography>
          </Box>

          <Grid container spacing={2.5} mb={4}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ 
                bgcolor: '#8B5CF6',
                boxShadow: 'none',
                height: '100%',
                borderRadius: 3,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px -10px rgba(139, 92, 246, 0.3)',
                }
              }}>
                <CardContent sx={{ position: 'relative' }}>
                  <Box sx={{ 
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="fas fa-list" style={{ fontSize: '1.25rem', color: '#fff' }}></i>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#fff', opacity: 0.9 }}>
                    Total Generations
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#fff' }}>
                    {state.totalGenerations}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ 
                bgcolor: '#F59E0B',
                boxShadow: 'none',
                height: '100%',
                borderRadius: 3,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px -10px rgba(245, 158, 11, 0.3)',
                }
              }}>
                <CardContent sx={{ position: 'relative' }}>
                  <Box sx={{ 
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="fas fa-clock" style={{ fontSize: '1.25rem', color: '#fff' }}></i>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#fff', opacity: 0.9 }}>
                    Pending Jobs
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#fff' }}>
                    {state.pendingJobs}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ 
                bgcolor: '#10B981',
                boxShadow: 'none',
                height: '100%',
                borderRadius: 3,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px -10px rgba(16, 185, 129, 0.3)',
                }
              }}>
                <CardContent sx={{ position: 'relative' }}>
                  <Box sx={{ 
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="fas fa-check-circle" style={{ fontSize: '1.25rem', color: '#fff' }}></i>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#fff', opacity: 0.9 }}>
                    Completed Jobs
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#fff' }}>
                    {state.completedJobs}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={4} alignItems="center">
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: '#6B7280' }}>Select State</InputLabel>
                <Select
                  value={state.selectedUploadType}
                  onChange={(e) => setState((prev) => ({ ...prev, selectedUploadType: e.target.value }))}
                  label="Select State"
                  sx={{
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB',
                    },
                  }}
                >
                  <MenuItem value="ALL">Generate All States</MenuItem>
                  <MenuItem value="1">Generate line list for Delta</MenuItem>
                  <MenuItem value="2">Generate line list for Ekiti</MenuItem>
                  <MenuItem value="3">Generate line list for Osun</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={generateList}
                disabled={state.loading}
                startIcon={<i className="fas fa-plus" style={{ fontSize: '0.875rem' }}></i>}
                sx={{
                  bgcolor: '#1e2a3b',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  height: '40px',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#162030',
                    boxShadow: 'none',
                  },
                }}
              >
                Generate New Line List
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ 
            height: 600, 
            width: '100%',
            bgcolor: 'white',
            borderRadius: 1,
            border: '1px solid #E5E7EB',
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: '#1e293b',
              borderBottom: '1px solid #E5E7EB',
              minHeight: '48px !important',
              maxHeight: '48px !important',
              lineHeight: '48px !important',
              '& .MuiDataGrid-columnHeader': {
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.875rem',
                padding: '0 16px',
                '&:focus': {
                  outline: 'none',
                },
                '&:focus-within': {
                  outline: 'none',
                },
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
            },
            '& .MuiDataGrid-virtualScroller': {
              marginTop: '48px !important',
              bgcolor: 'white',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #E5E7EB',
              color: '#111827',
              fontSize: '0.875rem',
              '&:focus': {
                outline: 'none',
              },
              '&:focus-within': {
                outline: 'none',
              },
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                bgcolor: '#F9FAFB',
              },
              minHeight: '48px !important',
            },
            '& .MuiDataGrid-footer': {
              borderTop: '1px solid #E5E7EB',
              backgroundColor: '#fff',
            },
            '& .MuiTablePagination-root': {
              color: '#6B7280',
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: '#6B7280',
            },
            '& .MuiTablePagination-select': {
              color: '#374151',
            },
            '& .MuiTablePagination-selectIcon': {
              color: '#6B7280',
            },
            '& .MuiIconButton-root.Mui-disabled': {
              color: '#D1D5DB',
            },
            '& .MuiIconButton-root': {
              color: '#6B7280',
              '&:hover': {
                color: '#374151',
              },
            },
          }}>
            <DataGrid
              rows={state.data}
              columns={columns}
              pagination
              paginationMode="server"
              loading={state.loading}
              rowCount={state.rowCount}
              paginationModel={{
                page: state.page,
                pageSize: state.pageSize,
              }}
              onPaginationModelChange={(model) => {
                setState(prev => ({
                  ...prev,
                  page: model.page,
                  pageSize: model.pageSize,
                }));
              }}
              pageSizeOptions={[10, 20, 50, 100]}
              getRowId={(row) => row.linkCode}
              disableColumnMenu
              disableRowSelectionOnClick
              hideFooterSelectedRowCount
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GenerateLineList;

