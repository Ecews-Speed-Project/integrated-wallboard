// MainGrid.tsx
import '../../../../App.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import React, { useState, useEffect, useCallback } from 'react';
import { LINE_LIST_REPORT } from '../../../../utils/constants';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import DynamicBreadCrumb from '../../../../components/DynamicBreadCrumb';

interface UploadData {
  datimCode: string;
  state: string;
  facilityName: string;
  txCurrent: number;
  dateGenerate: string;
  lastEMRDate: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return dateString
 // const date = new Date(dateString.toString().split('T')[0]);
  //return dateString.toString().split('T')[0];
};

const UploadTracker: React.FC = () => {
  const [state, setState] = useState({
    data: [] as UploadData[],
    page: 0,
    pageSize: 100,
    rowCount: 0,
    totalState: 0,
    totalFacilities: 0,
    totalTxCurr: 0,
    loading: false,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  const userData = useSelector((state: RootState) => state.auth);

  // Add state options based on user's state ID
  const stateOptions = [
    { id: 'all', name: 'All States' },
    { id: '1', name: 'Delta' },
    { id: '2', name: 'Ekiti' },
    { id: '3', name: 'Osun' },
  ];

  // Filter state options based on user's state ID
  const filteredStateOptions = userData.stateId === 0 
    ? stateOptions 
    : stateOptions.filter(option => option.id === String(userData.stateId));

  const columns: GridColDef[] = [
    { field: 'state', headerName: 'State', width: 200, flex: 1 },
    { field: 'datimCode', headerName: 'Datim Code', width: 150 },
    { field: 'facilityName', headerName: 'Facility Name', width: 200, flex: 1 },
    { field: 'txCurrent', headerName: 'TX_CURR', width: 120, type: 'number' },
    {
      field: 'dateGenerate',
      headerName: 'Date Generated',
      width: 250,
     // valueFormatter: ({ value }) => formatDate(value)
    },
    {
      field: 'lastEMRDate',
      headerName: 'Last EMR Date',
      width: 250,
     // valueFormatter: ({ value }) => formatDate(value )
    },
  ];

  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch(`${LINE_LIST_REPORT}?page=${state.page + 1}&pageSize=${state.pageSize}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          state: (selectedState !== "all") ? selectedState : userData.stateId,
          facilityName: searchQuery,
          selectedState: selectedState !== 'all' ? selectedState : undefined,
          startDate: dateRange.startDate || undefined,
          endDate: dateRange.endDate || undefined,
          page: state.page + 1,
          pageSize: state.pageSize
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
  }, [state.page, state.pageSize, userData.token, searchQuery, selectedState, dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExport = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await fetch(`${LINE_LIST_REPORT}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          state: userData.stateId,
          searchQuery: searchQuery,
          selectedState: selectedState !== 'all' ? selectedState : undefined,
          startDate: dateRange.startDate || undefined,
          endDate: dateRange.endDate || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`);
      }

      // Set the correct headers for Excel download
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        throw new Error('Invalid response format');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }));

      const a = document.createElement('a');
      const date = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `upload-tracker-${date}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url); // Clean up the URL
      document.body.removeChild(a); // Clean up the link
    } catch (error) {
      console.error('Error exporting data:', error);
      // Add error notification or alert here if you have a notification system
      alert('Failed to export data. Please try again.');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    // Only update page and trigger search if value is empty or at least 3 characters
    if (value === '' || value.length >= 3) {
      setState(prev => ({ ...prev, page: 0 }));
    }
  };

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (value !== null && value !== undefined) {
      setSelectedState(value);
      setState(prev => ({ ...prev, page: 0 }));
    }
  };

  const handleDateChange = (type: 'startDate' | 'endDate') => (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange(prev => ({
      ...prev,
      [type]: event.target.value
    }));
    setState(prev => ({ ...prev, page: 0 }));
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return {
          bgcolor: '#DCFCE7',
          color: '#15803D',
        };
      case 'pending':
        return {
          bgcolor: '#FEF9C3',
          color: '#854D0E',
        };
      default:
        return {
          bgcolor: '#F3F4F6',
          color: '#6B7280',
        };
    }
  };

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 2 }}>
      <Box sx={{ width: '100%', mx: 'auto', px: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
              Upload Tracker
            </Typography>
           {/*  <Button
              variant="contained"
              startIcon={<i className="fas fa-download" style={{ fontSize: '0.875rem' }}></i>}
              onClick={handleExport}
              sx={{
                bgcolor: '#1e2a3b',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                borderRadius: '6px',
                px: 3,
                height: '36px',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#162030',
                  boxShadow: 'none',
                },
              }}
            >
              Export Data
            </Button> */}
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fas fa-search" style={{ color: '#9CA3AF' }}></i>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                    },
                    '&:hover fieldset': {
                      borderColor: '#D1D5DB',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: '#6B7280' }}>State</InputLabel>
                <Select
                  value={selectedState}
                  onChange={handleStateChange}
                  label="State"
                  sx={{
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB',
                    },
                  }}
                >
                  {filteredStateOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2.75}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={dateRange.startDate}
                onChange={handleDateChange('startDate')}
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{
                  bgcolor: 'white',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2.75}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={dateRange.endDate}
                onChange={handleDateChange('endDate')}
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{
                  bgcolor: 'white',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

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
                    <i className="fas fa-map-marker-alt" style={{ fontSize: '1.25rem', color: '#fff' }}></i>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#fff', opacity: 0.9 }}>
                    Total States
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#fff' }}>
                    {state.totalState}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{
                bgcolor: '#EC4899',
                boxShadow: 'none',
                height: '100%',
                borderRadius: 3,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px -10px rgba(236, 72, 153, 0.3)',
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
                    <i className="fas fa-hospital" style={{ fontSize: '1.25rem', color: '#fff' }}></i>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#fff', opacity: 0.9 }}>
                    Total Facilities Uploaded
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#fff' }}>
                    {state.totalFacilities}
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
                    <i className="fas fa-users" style={{ fontSize: '1.25rem', color: '#fff' }}></i>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#fff', opacity: 0.9 }}>
                    Total TX_CURR
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#fff' }}>
                    {state.totalTxCurr}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{
            height: 'auto',
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
              getRowId={(row) => `${row.datimCode}-${row.facilityName}`}
              disableColumnMenu
              disableRowSelectionOnClick
              hideFooterSelectedRowCount
              autoHeight
              sx={{
                '& .MuiDataGrid-main': {
                  overflow: 'visible'
                },
                '& .MuiDataGrid-virtualScroller': {
                  overflow: 'visible'
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadTracker;
