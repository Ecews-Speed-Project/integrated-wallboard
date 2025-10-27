import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../utils/constants';

import DropZone from '../../../components/DropZone';
import Lottie from 'lottie-react';
import { 
  Box, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  Paper,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';

// Define the interface for the DropZone configuration
interface DropZoneConfig {
  name: string; // Name of the DropZone
  url: string;  // API endpoint URL for the DropZone
  description: string;
  icon: string;
}

const DropZoneSwitcher: React.FC = () => {
  const [selectedDropZoneIndex, setSelectedDropZoneIndex] = useState<number>(0);
  const [animationData, setAnimationData] = useState<any>(null);

  // Array of objects, each containing the name and URL for a DropZone
  const dropZones: DropZoneConfig[] = [
    { 
      name: 'Select upload Type', 
      url: '', 
      description: 'Choose a type of data to upload',
      icon: 'fas fa-upload'
    },
   /*  { 
      name: 'Retention', 
      url: `${BASE_URL}/import/file-upload?type=RETENTION`,
      description: 'Upload retention data for tracking patient retention rates',
      icon: 'fas fa-users'
    },
    { 
      name: 'Viral Load', 
      url: `${BASE_URL}import/file-upload?type=VL`,
      description: 'Upload viral load test results and monitoring data',
      icon: 'fas fa-virus'
    },
    { 
      name: 'Viralload Age and Sex', 
      url: `${BASE_URL}import/file-upload?type=VLAGESEX`,
      description: 'Upload viral load data categorized by age and sex',
      icon: 'fas fa-chart-pie'
    }, */
    { 
      name: 'SORMAS', 
      url: `${BASE_URL}import/file-upload?type=SORMAS`,
      description: 'Upload SORMAS surveillance and outbreak data',
      icon: 'fas fa-database'
    },
    { 
      name: 'Facility Line list', 
      url: `${BASE_URL}import/file-upload?type=LINELIST`,
      description: 'Upload facility line list data for patient tracking',
      icon: 'fas fa-hospital'
    },
    /* { 
      name: 'Upload Drug Eligibility', 
      url: `${BASE_URL}import/file-upload?type=ELIGIBILITY`,
      description: 'Upload facility line list data for patient tracking',
      icon: 'fas fa-hospital'
    },
    { 
      name: 'Upload VL Eligibility', 
      url: `${BASE_URL}import/file-upload?type=VLELIGIBILITY`,
      description: 'Upload facility line list data for patient tracking',
      icon: 'fas fa-hospital'
    },
    { 
      name: 'Upload LASTQUATERLINELIST', 
      url: `${BASE_URL}import/file-upload?type=LASTQUATERLINELIST`,
      description: 'Upload facility line list data for patient tracking',
      icon: 'fas fa-hospital'
    }, */
    /* { 
      name: 'Upload NDRDATA', 
      url: `http://127.0.0.1:5000/process_data`,
      description: 'Upload facility line list data for patient tracking',
      icon: 'fas fa-hospital'
    }, */
    
  ];

  // Handles dropdown change to switch between different DropZone instances
  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setSelectedDropZoneIndex(Number(event.target.value));
  };

  useEffect(() => {
    // Fetch the animation JSON from the public folder
    fetch(`${process.env.PUBLIC_URL}/animations/waiting.json`)
      .then((response) => response.json())
      .then((data) => {
        setAnimationData(data);
      })
      .catch((error) => {
        console.error('Error loading animation data:', error);
      });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Don't render Lottie until animationData is loaded
  if (!animationData) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        bgcolor: '#F9FAFB'
      }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 4 }}>
      <Box sx={{ width: '100%', mx: 'auto', px: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
              Upload Data
            </Typography>
          </Box>

          <Grid container spacing={2.5} mb={4}>
            <Grid item xs={12}>
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
                    Data Upload
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#fff', opacity: 0.9, maxWidth: '80%' }}>
                    Upload your data files securely. Supported formats include ZIP, CSV, and Excel files.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 'none', border: '1px solid #E5E7EB' }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Select
                value={selectedDropZoneIndex}
                onChange={handleSelectChange}
                displayEmpty
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D1D5DB',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8B5CF6',
                  },
                }}
              >
                {dropZones.map((dropZone, index) => (
                  <MenuItem key={index} value={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <i className={dropZone.icon} style={{ color: '#6B7280' }}></i>
                      <Typography>{dropZone.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {dropZones[selectedDropZoneIndex].url ? (
              <Box>
                <Typography variant="h6" sx={{ mb: 2, color: '#111827', fontWeight: 500 }}>
                  {dropZones[selectedDropZoneIndex].name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: '#6B7280' }}>
                  {dropZones[selectedDropZoneIndex].description}
                </Typography>
                <DropZone uploadUrl={dropZones[selectedDropZoneIndex].url}  tablename={"PBSProcessedData"}/>
              </Box>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                py: 4,
                textAlign: 'center'
              }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#111827', fontWeight: 500 }}>
                  Select an upload type to begin
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: '#6B7280', maxWidth: '400px' }}>
                  Choose the type of data you want to upload from the dropdown menu above
                </Typography>
                <Box sx={{ width: 200, height: 200 }}>
                  <Lottie
                    loop={defaultOptions.loop}
                    autoplay={defaultOptions.autoplay}
                    animationData={animationData}
                    rendererSettings={defaultOptions.rendererSettings}
                  />
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DropZoneSwitcher;
