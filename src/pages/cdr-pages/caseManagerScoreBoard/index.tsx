import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { getMap, getNigeriaMapForSomasData, getSomaLiveMapData, hivStateMap, mapChat, somasMap, stateMaps } from '../../../services/Charts.service';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from "highcharts/modules/map";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DynamicBreadCrumb from '../../../components/DynamicBreadCrumb';
import { summaryApiData } from '../../../services/main.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { DiseaseData, ConfirmedCasesByLGA, LGAData, Totals } from '../../../types/interfaces';
import SmallCard20x from '../../../components/SmallCard20x';
import Paper from '@mui/material/Paper';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

highchartsMap(Highcharts);

const CaseManagerScoreBoard: FunctionComponent = () => {
  const userData = useSelector((state: RootState) => state.auth);

  const [chartData, setChartData] = useState({});
  const [chart1Data, setChart1Data] = useState({});

  const [loading, setLoading] = useState(false);
  const [choleraCases, setCholeraCases] = useState<DiseaseData>({
    suspectedCases: 0,
    confirmedCases: 0,
    evaluatedCases: 0,
    rdtRapidDiagnostictestPositive: 0,
    cultured: 0,
  });


    const metrics = [
      { title: "Total Appointments", value: 105, change: "+10%", changeColor: "green" },
      { title: "Missed Appointments", value: 15, change: "-5%", changeColor: "red" },
      { title: "Case Managers", value: 64, change: "0%", changeColor: "grey" },
      { title: "Patients with Base Print", value: 1258, change: "+15%", changeColor: "green" },
      { title: "Patients without Base Print", value: 125, change: "-10%", changeColor: "red" },
      { title: "Active Patients", value: 1200, change: "+7%", changeColor: "green" },
    ];
  
    const caseManagers = [
      { name: "Naomi Ezeoke", totalPatients: 86, dropPickup: 17, clinicAppointment: 42, EAC: 59, viralLoad: 16, totalScore: "5%" },
      { name: "Elizabeth Yahaya", totalPatients: 16, dropPickup: 8, clinicAppointment: 72, EAC: 92, viralLoad: 98, totalScore: "97%" },
      { name: "Daniel Amiesimaka", totalPatients: 22, dropPickup: 56, clinicAppointment: 70, EAC: 12, viralLoad: 64, totalScore: "21%" },
      { name: "Hannah Iwowari", totalPatients: 52, dropPickup: 76, clinicAppointment: 51, EAC: 3, viralLoad: 13, totalScore: "96%" },
      { name: "Lydia Suleiman", totalPatients: 32, dropPickup: 25, clinicAppointment: 5, EAC: 27, viralLoad: 74, totalScore: "54%" },
      { name: "Simon Ekisagha", totalPatients: 68, dropPickup: 90, clinicAppointment: 36, EAC: 84, viralLoad: 72, totalScore: "33%" },
      { name: "Stephen Opuogbo", totalPatients: 16, dropPickup: 4, clinicAppointment: 10, EAC: 82, viralLoad: 45, totalScore: "55%" },
    ];
    
  return (
    <>
    <Paper
              elevation={0} // Removes the shadow effect
              sx={{
                backgroundColor: "#EBE8E8", // Light gray background for the container
                padding: "20px", // Padding around the metrics section
                borderRadius: "10px", // Rounded corners for a clean look
                margin: "-60px 80px 80px 80px"
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between" // Evenly distribute items
                flexWrap="wrap" // Allow wrapping on smaller screens
                gap={2} // Space between items
              >
                {metrics.map((metric, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: "1 1 calc(16.6% - 16px)", // Ensures 6 evenly spaced metrics per row
                      minWidth: 150, // Ensures readability on smaller screens
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {metric.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {metric.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: metric.changeColor,
                        mt: 1,
                      }}
                    >
                      {metric.change}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

            <div style={{marginLeft: "80px", marginRight: "80px" }}>

              {/* Table Section */}
              <Typography variant="h5" sx={{ mb: 2 }}>
                <div  style={{fontSize: "16px" }}>
              <DynamicBreadCrumb page="Case Manager Score Board" />
              </div>
              </Typography>
              <TableContainer component={Paper} elevation={3}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name of Case Manager</TableCell>
                      <TableCell align="right">Total Patients</TableCell>
                      <TableCell align="right">Drop Pickup</TableCell>
                      <TableCell align="right">Clinic Appointment</TableCell>
                      <TableCell align="right">EAC</TableCell>
                      <TableCell align="right">Viral Load Appointment</TableCell>
                      <TableCell align="right">Total Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {caseManagers.map((manager, index) => (
                      <TableRow key={index}>
                        <TableCell>{manager.name}</TableCell>
                        <TableCell align="right">{manager.totalPatients}</TableCell>
                        <TableCell align="right">{manager.dropPickup}</TableCell>
                        <TableCell align="right">{manager.clinicAppointment}</TableCell>
                        <TableCell align="right">{manager.EAC}</TableCell>
                        <TableCell align="right">{manager.viralLoad}</TableCell>
                        <TableCell align="right">{manager.totalScore}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            </>
  );
};

export default CaseManagerScoreBoard;
