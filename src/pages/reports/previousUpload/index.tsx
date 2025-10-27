// MainGrid.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { 
  Box, 
  Button,
  Typography,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import '../../../App.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { VIEW_UPLOADS, DOWNLOAD_UPLOAD } from '../../../utils/constants';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';

const MainGrid: React.FC = () => {
  const [state, setState] = useState({
    data: [] as GridRowsProp,
    page: 0,
    pageSize: 10,
    rowCount: 0,
    totalFile: 0,
    allPending: 0,
    allProcessed: 0,
    loading: false,
  });

  const userData = useSelector((state: RootState) => state.auth);

  const handleDownload = async (fileId: string, fileName: string) => {
    try {
      const response = await fetch(`${DOWNLOAD_UPLOAD}/${fileId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'PROCESSED':
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

  const columns: GridColDef[] = [
    { 
      field: 'uploadFileName', 
      headerName: 'File Name', 
      width: 300,
      flex: 1
    },
    { 
      field: 'fileSize', 
      headerName: 'File Size', 
      width: 120,
      type: 'number', // ✅ Important!
      valueFormatter: (value ) => {
        console.log(value)
        if (!value) return '0 MB';
        if (value < 1024) return `${value} B`;
        if (value < 1024 * 1024) return `${(value / 1024).toFixed(2)} KB`;
        return `${(value / (1024 * 1024)).toFixed(2)} MB`;
      }
    },
    { 
      field: 'processingStatus', 
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
          {params.value}
        </Box>
      ),
    },
    {
      field: 'uploadDate',
      headerName: 'Upload Date',
      width: 180,
     valueFormatter: (value) => value ? new Date(value).toLocaleString() : ''
    },
    { 
      field: 'numberOfRows', 
      headerName: 'Total Patients', 
      width: 130,
      type: 'number'
    },
    { 
      field: 'uploadType', 
      headerName: 'Upload Type', 
      width: 150
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          startIcon={<i className="fas fa-download" style={{ fontSize: '0.875rem' }}></i>}
          onClick={() => handleDownload(params.row.fileId, params.row.uploadFileName)}
          disabled={params.row.processingStatus !== 'PROCESSED'}
          sx={{
            bgcolor: params.row.processingStatus === 'PROCESSED' ? '#1e2a3b' : '#E5E7EB',
            color: params.row.processingStatus === 'PROCESSED' ? '#fff' : '#9CA3AF',
            fontSize: '0.75rem',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: params.row.processingStatus === 'PROCESSED' ? '#162030' : '#E5E7EB',
              boxShadow: params.row.processingStatus === 'PROCESSED' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
            },
          }}
        >
          Download
        </Button>
      ),
    },
  ];

  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch(`${VIEW_UPLOADS}?page=${state.page + 1}&pageSize=${state.pageSize}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        },
        body: JSON.stringify({
          state: userData.stateId,
          lga: 0,
          reportWeek: 0,
          reportYear: 0
        }),
      });
      const jsonResponse = await response.json();
      setState((prevState) => ({
        ...prevState,
        data: jsonResponse.uploads,
        rowCount: jsonResponse.totalCount,
        totalFile: jsonResponse.totalCount,
        allProcessed: jsonResponse.allProcessed,
        allPending: jsonResponse.allPending,
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [state.page, state.pageSize, userData.token, userData.stateId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 4 }}>
      <Box sx={{ width: '100%', mx: 'auto', px: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
              Previous Uploads
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
                    <i className="fas fa-upload" style={{ fontSize: '1.25rem', color: '#fff' }}></i>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#fff', opacity: 0.9 }}>
                    Total Uploads
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#fff' }}>
                    {state.totalFile}
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
                    Processed Uploads
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#fff' }}>
                    {state.allProcessed}
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
                    Pending Uploads
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#fff' }}>
                    {state.allPending}
                  </Typography>
                </CardContent>
              </Card>
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
              getRowId={(row) => row.fileId}
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

export default MainGrid;
