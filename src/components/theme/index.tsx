// src/theme.js or src/Theme.js (create a new file for the theme if you don't have one)
import { createTheme } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: "'Satoshi', sans-serif", // Set the Inter font as the default font
    h1: {
      fontFamily: "'Inter', sans-serif", // Example: setting for heading 1
    },
    h6: {
      fontFamily: "'Satoshi', sans-serif", // Example: setting for heading 1
      fontSize:"12px",
      color:"#000"
    },
    h2: {
      fontFamily: "'Inter', sans-serif", // Example: setting for heading 2
    },
    body1: {
        fontFamily: "'Satoshi', sans-serif", // Keep Inter for body text
        fontWeight: 400, // Regular weight for body1
      },
      

     
    // You can customize other typography variants like h3, h4, body1, body2, etc.
  },
  
});

export default theme;
