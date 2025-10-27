import React from "react";
import { Box, Typography } from "@mui/material";

const CustomCard = (
    {
        borderTopRightRadius = "12px", // Default value for top-right radius
        borderTopLeftRadius = "12px", // Default value for top-left radius
        borderBottomRightRadius = "12px", // Default value for bottom-right radius
        borderBottomLeftRadius = "12px",
        position = "bottom-right",
        text = "Integrated Wall Board", // Default text
        width = "40%", // Default width
        height = "40%", // Default height
        backgroundColor = "#FF6F61", // Default background color
        overlayColor = "rgba(255, 255, 255, 0.2)", // Default overlay color
    }
) => {

    let positionStyle = {};
    switch (position) {
      case "top-left":
        positionStyle = { top: 0, left: 0 };
        break;
      case "top-right":
        positionStyle = { top: 0, right: 0 };
        break;
      case "bottom-left":
        positionStyle = { bottom: 0, left: 0 };
        break;
      case "bottom-right":
      default:
        positionStyle = { bottom: 0, right: 0 };
        break;
    }

    const borderRadiusStyle = {
        borderTopRightRadius,
        borderTopLeftRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
      };

    const overlayPosition = {
        position: "absolute",
        ...positionStyle, // Spread the passed position values
        width: width, // You can adjust the size
        height: height, // You can adjust the size
        backgroundColor: overlayColor,
        ...borderRadiusStyle, // Dynamic border radius
      };

    
    return (
        <Box
            sx={{
                width: '100%', // Adjust as needed
                height: 338, // Adjust as needed
                backgroundColor: backgroundColor, // Main background color
                borderRadius: "12px", // Rounded corners
                position: "relative", // For overlay positioning
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
                display: "flex",
                alignItems: "flex-end", // Align content to the bottom
                padding: "16px", // Space for text
                overflow: "hidden", // Clip overflow for the overlay
            }}
        >
            {/* Overlay */}
            <Box
                sx={overlayPosition}
            />

            {/* Text Content */}
            <Typography
                sx={{
                    color: "white", // Text color
                    fontSize: "24px", // Adjust text size
                    fontWeight: "bold",
                    lineHeight: 1.2, // Line height for spacing
                    whiteSpace: "pre-line", // This allows <br /> to work within the text

                }}
                dangerouslySetInnerHTML={{ __html: text }}
            >
               

            </Typography>
        </Box>
    );
};

export default CustomCard;
