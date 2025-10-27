import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { logout } from "../../features/auth/authSlice";

function Dropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option:any) => {
    console.log(option); // Perform action based on selected option
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());  // Dispatch logout action
    navigate('/');       // Redirect to the login page after logout
  };


  return (
    <Box>
      {/* Profile Button */}
      <Button
        onClick={handleClick}
        style={{
          textTransform: "none", // Disable uppercase
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "20px",
          padding: "5px 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            backgroundColor: "#ddd",
            color: "#333",
            fontSize: "14px",
            fontWeight: "bold",
            width: "30px",
            height: "30px",
          }}
        >
          JD
        </Avatar>
        <Typography
          style={{
            marginLeft: "10px",
            fontSize: "14px",
            fontWeight: "normal",
            color: "#333",
          }}
        >
         {userData.state ?? 'Unknown State'}
        </Typography>
      </Button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
       
        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default Dropdown;
