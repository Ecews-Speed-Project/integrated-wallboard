import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'scheduled';
  startDate: string;
  endDate: string;
}

const UserProfile: React.FC = () => {
  const theme = useTheme();
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Administrator',
      department: 'IT',
      status: 'active',
      startDate: '2024-03-22',
      endDate: '2024-03-29',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Manager',
      department: 'HR',
      status: 'scheduled',
      startDate: '2024-03-25',
      endDate: '2024-04-01',
    },
    // Add more mock data as needed
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [newUser, setNewUser] = useState<Partial<UserData>>({
    status: 'scheduled'
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleCreateUser = () => {
    if (newUser.name && newUser.email && newUser.role && newUser.department) {
      const user: UserData = {
        id: (users.length + 1).toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        status: newUser.status || 'scheduled',
        startDate: newUser.startDate || new Date().toISOString().split('T')[0],
        endDate: newUser.endDate || new Date().toISOString().split('T')[0],
      };
      setUsers([...users, user]);
      setOpenCreateModal(false);
      setNewUser({ status: 'scheduled' });
    }
  };

  const handleEditUser = () => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? selectedUser : user
      ));
      setOpenEditModal(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'scheduled':
        return {
          bgcolor: '#F3E8FF',
          color: '#9333EA',
        };
      case 'active':
        return {
          bgcolor: '#DCFCE7',
          color: '#15803D',
        };
      case 'over':
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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const UserDialog = ({ open, onClose, title, user, setUser, onSave }: any) => (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          width: '100%',
          maxWidth: '480px',
        }
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: '1px solid #E5E7EB', 
        bgcolor: '#fff',
        px: 3,
        py: 2.5,
      }}>
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>{title}</Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={user.name || ''}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                  bgcolor: '#fff',
                  '& fieldset': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D1D5DB',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2563EB',
                    borderWidth: '1px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#6B7280',
                  '&.Mui-focused': {
                    color: '#2563EB',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={user.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                  bgcolor: '#fff',
                  '& fieldset': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D1D5DB',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2563EB',
                    borderWidth: '1px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#6B7280',
                  '&.Mui-focused': {
                    color: '#2563EB',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: '#6B7280' }}>Role</InputLabel>
              <Select
                value={user.role || ''}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                label="Role"
                sx={{
                  borderRadius: '6px',
                  bgcolor: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D1D5DB',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563EB',
                    borderWidth: '1px',
                  },
                }}
              >
                <MenuItem value="Administrator">Administrator</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: '#6B7280' }}>Status</InputLabel>
              <Select
                value={user.status || 'scheduled'}
                onChange={(e) => setUser({ ...user, status: e.target.value })}
                label="Status"
                sx={{
                  borderRadius: '6px',
                  bgcolor: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D1D5DB',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563EB',
                    borderWidth: '1px',
                  },
                }}
              >
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="over">Over</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={user.startDate || ''}
              onChange={(e) => setUser({ ...user, startDate: e.target.value })}
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                  bgcolor: '#fff',
                  '& fieldset': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D1D5DB',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2563EB',
                    borderWidth: '1px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#6B7280',
                  '&.Mui-focused': {
                    color: '#2563EB',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={user.endDate || ''}
              onChange={(e) => setUser({ ...user, endDate: e.target.value })}
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                  bgcolor: '#fff',
                  '& fieldset': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D1D5DB',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2563EB',
                    borderWidth: '1px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#6B7280',
                  '&.Mui-focused': {
                    color: '#2563EB',
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ 
        borderTop: '1px solid #E5E7EB',
        px: 3,
        py: 2.5,
        gap: 1,
      }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ 
            borderColor: '#E5E7EB',
            color: '#374151',
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '6px',
            px: 3,
            '&:hover': {
              borderColor: '#1e2a3b',
              bgcolor: '#F9FAFB',
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onSave}
          variant="contained"
          sx={{
            bgcolor: '#1e2a3b',
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '6px',
            px: 3,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#162030',
              boxShadow: 'none',
            },
          }}
        >
          {title === 'Create User' ? 'Create' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 4 }}>
      <Box sx={{ width: '100%', mx: 'auto', px: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
            User List
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenCreateModal(true)}
            startIcon={<i className="fas fa-plus" style={{ fontSize: '0.75rem' }}></i>}
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
            Add New User
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search users..."
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
              maxWidth: 300,
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
        </Box>

        <TableContainer sx={{ bgcolor: 'white', borderRadius: 1, border: '1px solid #E5E7EB' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Start Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #E5E7EB' }}>End Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', borderBottom: '1px solid #E5E7EB' }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow 
                  key={user.id}
                  sx={{ 
                    '&:hover': { bgcolor: '#F9FAFB' },
                  }}
                >
                  <TableCell sx={{ 
                    py: 1.5,
                    borderBottom: '1px solid #E5E7EB',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box 
                        component="img"
                        src="https://via.placeholder.com/32"
                        sx={{ 
                          width: 32,
                          height: 32,
                          borderRadius: '4px',
                          bgcolor: '#F3F4F6',
                        }}
                      />
                      <Box>
                        <Typography sx={{ fontWeight: 500, color: '#111827' }}>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6B7280' }}>
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #E5E7EB' }}>{user.startDate}</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #E5E7EB' }}>{user.endDate}</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #E5E7EB' }}>
                    <Box
                      component="span"
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: '16px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        display: 'inline-block',
                        ...getStatusStyle(user.status),
                      }}
                    >
                      {user.status}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #E5E7EB' }} align="right">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenEditModal(true);
                      }}
                      sx={{ color: '#6B7280' }}
                    >
                      <i className="fas fa-edit"></i>
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteUser(user.id)}
                      sx={{ color: '#6B7280', ml: 1 }}
                    >
                      <i className="fas fa-trash"></i>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              size="small"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#6B7280',
                },
                '& .Mui-selected': {
                  bgcolor: '#1e2a3b !important',
                  color: 'white !important',
                },
              }}
            />
          </Box>
        )}
      </Box>

      <UserDialog
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title="Create User"
        user={newUser}
        setUser={setNewUser}
        onSave={handleCreateUser}
      />

      <UserDialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit User"
        user={selectedUser || {}}
        setUser={setSelectedUser}
        onSave={handleEditUser}
      />
    </Box>
  );
};

export default UserProfile; 