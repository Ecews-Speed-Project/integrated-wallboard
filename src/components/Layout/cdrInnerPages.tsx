import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Avatar,
  CssBaseline,
  Container,
  Button,
  Card,
  CardContent,
  ThemeProvider,
  Menu,
  MenuItem,
  Drawer,
} from "@mui/material";
import BackgroundImage from '../../assets/images/nav-bg.png';
import Dropdown from "../profileMenu";
import theme from "../theme";
import DynamicBreadCrumb from "../DynamicBreadCrumb";
import { Link, NavLink } from "react-router-dom";
import "./App.css"

const CdrInnerPages: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div>
          <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", pb: 4 }}>
            {/* Header */}
            <AppBar position="static" color="default" elevation={0} sx={{
              backgroundColor: "#2E7D32",
              height: "64px",
              color: "#ffffff",
            }}>
              <Toolbar sx={{
                height: "100%",
                padding: "0 2rem",
                "& a": {
                  textDecoration: "none",
                  color: "#ffffff",
                  fontWeight: "500",
                },
                "& a:hover": {
                  color: "#ffffff",
                  opacity: 0.9,
                },
              }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <div className="bg-white/80 p-2 rounded-md shadow-sm backdrop-blur-sm">
                      <img src="images/pepfar-logo.svg" alt="FHPLUS logo" className="h-8" />
                    </div>
                    <div className="bg-white/80 p-2 rounded-md shadow-sm backdrop-blur-sm">
                      <img src="images/cdc.svg" alt="CDC logo" className="h-8" />
                    </div>
                    <div className="bg-white/80 p-2 rounded-md shadow-sm backdrop-blur-sm">
                      <img src="images/nigeria.svg" alt="Nigeria coat of arms" className="h-8" />
                    </div>
                    <div className="bg-white/80 p-2 rounded-md shadow-sm backdrop-blur-sm">
                      <img src="images/ecews.svg" alt="ECEWS logo" className="h-8" />
                    </div>
                  </Box>
                </Typography>

                {/* Navigation Menu */}
                <div className="hidden md:flex items-center space-x-6">
                  <Link to="/cdr-dashboard" className="text-white hover:text-gray-200 transition-colors">
                    Home
                  </Link>

                  {/* Uploads Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter('uploads')}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button className="text-white hover:text-gray-200 transition-colors font-medium">
                      Uploads
                    </button>
                    {activeDropdown === 'uploads' && (
                      <div className="absolute top-full left-0 w-48 bg-white rounded-md shadow-lg py-2 z-[100]">
                        <Link to="/upload-data" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Upload Data
                        </Link>
                        <Link to="/previous-upload" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Previous Upload
                        </Link>
                        <Link to="/upload-tracker" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Upload Tracker
                        </Link>
                        <Link to="/generate-linelist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Generate Linelist
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Reports Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter('reports')}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button className="text-white hover:text-gray-200 transition-colors font-medium">
                      Reports
                    </button>
                    {activeDropdown === 'reports' && (
                      <div className="absolute top-full left-0 w-48 bg-white rounded-md shadow-lg py-2 z-[100]">
                        <Link to="/cdr-treatment" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Treatment Dashboard
                        </Link>
                        <Link to="/cdr-treatment-trend" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Treatment Trend
                        </Link>
                        <Link to="/cdr-vl" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          VL Dashboard
                        </Link>
                        <Link to="/cdr-vl-age-sex" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          VL By Age & Sex Dashboard
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* User Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter('user')}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button className="text-white hover:text-gray-200 transition-colors font-medium">
                      User
                    </button>
                    {activeDropdown === 'user' && (
                      <div className="absolute top-full left-0 w-48 bg-white rounded-md shadow-lg py-2 z-[100]">
                        <Link to="/user-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Profile
                        </Link>
                        <Link to="/user-settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Settings
                        </Link>
                        <Link to="/user-preferences" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Preferences
                        </Link>
                        <Link to="/user-security" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Security
                        </Link>
                      </div>
                    )}
                  </div>

                  <Dropdown />
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden text-white"
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </Toolbar>
            </AppBar>

            {/* Mobile Menu */}
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              className="md:hidden"
            >
              <div className="w-64 bg-white p-4">
                <Link to="/cdr-dashboard" className="block py-2 text-gray-700 hover:text-gray-900">
                  Home
                </Link>
                
                {/* Uploads Section */}
                <div className="relative">
                  <button
                    className="w-full text-left py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setActiveDropdown(activeDropdown === 'uploads' ? null : 'uploads')}
                  >
                    Uploads
                    <span className="float-right">{activeDropdown === 'uploads' ? '▼' : '▶'}</span>
                  </button>
                  {activeDropdown === 'uploads' && (
                    <div className="pl-4">
                      <Link to="/upload-data" className="block py-2 text-gray-600 hover:text-gray-900">
                        Upload Data
                      </Link>
                      <Link to="/previous-upload" className="block py-2 text-gray-600 hover:text-gray-900">
                        Previous Upload
                      </Link>
                      <Link to="/upload-tracker" className="block py-2 text-gray-600 hover:text-gray-900">
                        Upload Tracker
                      </Link>
                      <Link to="/generate-linelist" className="block py-2 text-gray-600 hover:text-gray-900">
                        Generate Linelist
                      </Link>
                    </div>
                  )}
                </div>

                {/* Reports Section */}
                <div className="relative">
                  <button
                    className="w-full text-left py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setActiveDropdown(activeDropdown === 'reports' ? null : 'reports')}
                  >
                    Reports
                    <span className="float-right">{activeDropdown === 'reports' ? '▼' : '▶'}</span>
                  </button>
                  {activeDropdown === 'reports' && (
                    <div className="pl-4">
                      <Link to="/cdr-treatment" className="block py-2 text-gray-600 hover:text-gray-900">
                        Treatment Dashboard
                      </Link>
                      <Link to="/cdr-treatment-trend" className="block py-2 text-gray-600 hover:text-gray-900">
                        Treatment Trend
                      </Link>
                      <Link to="/cdr-vl" className="block py-2 text-gray-600 hover:text-gray-900">
                        VL Dashboard
                      </Link>
                      <Link to="/cdr-vl-age-sex" className="block py-2 text-gray-600 hover:text-gray-900">
                        VL By Age & Sex Dashboard
                      </Link>
                    </div>
                  )}
                </div>

                {/* User Section */}
                <div className="relative">
                  <button
                    className="w-full text-left py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                  >
                    User
                    <span className="float-right">{activeDropdown === 'user' ? '▼' : '▶'}</span>
                  </button>
                  {activeDropdown === 'user' && (
                    <div className="pl-4">
                      <Link to="/user-profile" className="block py-2 text-gray-600 hover:text-gray-900">
                        Profile
                      </Link>
                      <Link to="/user-settings" className="block py-2 text-gray-600 hover:text-gray-900">
                        Settings
                      </Link>
                      <Link to="/user-preferences" className="block py-2 text-gray-600 hover:text-gray-900">
                        Preferences
                      </Link>
                      <Link to="/user-security" className="block py-2 text-gray-600 hover:text-gray-900">
                        Security
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Dropdown />
                </div>
              </div>
            </Drawer>

            <div className="content-container px-6">{children}</div>

            {/* Footer */}
            <Box sx={{ textAlign: "center", py: 2, mt: 4, borderTop: "1px solid #ddd" }}>
              <Typography variant="body2">All rights reserved @ ecews.org 2023</Typography>
            </Box>
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
};

export default CdrInnerPages;
