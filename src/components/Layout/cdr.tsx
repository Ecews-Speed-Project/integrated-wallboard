import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Container, ThemeProvider } from "@mui/material";
import GooglePlayIcon from '../../assets/images/google-play-icon.svg';
import AppleStoreIcon from '../../assets/images/apple-store-icon.svg';
import BackgroundImage from '../../assets/images/background.png';

import EcewsLogo from '../../assets/images/ecews.svg';
import CustomCard from "../customCards";
import theme from "../theme";
import Dropdown from "../profileMenu";
import { Link } from "react-router-dom";
import "./App.css"

const CDRDashboard = () => {
    const styles = {
        root: {
            height: "100vh",
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            padding: "20px",
        },
    };
    const tiles = [
        {
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "16px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            position: "bottom-right",  // Custom position
            text: "Integrated <br/> Wall Board",
            width: "40%",
            height: "70%",
            backgroundColor: "#DA545B",
            overlayColor: "#F1878C;",
            path:"/dashboard"

        },
        {
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "16px",
            position: "top-right",  // Custom position
            text: "ECEWS <br/> CDR",
            width: "40%",
            height: "70%",
            backgroundColor: "#017D65",
            overlayColor: "#269A84;",
                 path:"/cdr-treatment"
        },
        {
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "0px",
            borderBottomRightRadius: "16px",
            borderBottomLeftRadius: "0px",
            position: "top-left",  // Custom position
            text: "OVC <br/>  Dashboard",
            width: "40%",
            height: "70%",
            backgroundColor: "#213562",
            overlayColor: "#3D5180;",
             path:"/ovc-dashboard"
        },
        {
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "0px",
            borderBottomRightRadius: "16px",
            borderBottomLeftRadius: "0px",
            position: "top-left",  // Custom position
            text: "Performance  <br/>  Dashboard",
            width: "60%",
            height: "70%",
            backgroundColor: "#B8BC63",
            overlayColor: "#CDD18E;",
            path:"/"

        },
        {
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "16px",
            position: "top-right",  // Custom position
            text: "Case Management   <br/> PlayStore",
            width: "40%",
            height: "40%",
            icon: GooglePlayIcon,
            alt: "Apple Store",

            backgroundColor: "#10BDDC",
            overlayColor: "#59D1E6;",
            path:"/"

        },
        {
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "16px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            position: "bottom-right",  // Custom position
            text: "Case Management  <br/> AppStore",
            width: "40%",
            height: "50%",
            icon: AppleStoreIcon,
            alt: "Google Play",

            backgroundColor: "#000",
            overlayColor: "#272E3D;",
               path:"/"
        },

    ];

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Box sx={styles.root}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            // alignItems: "center",
                            paddingBottom: 2,
                        }}
                    >
                        {/* Left: Logo */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <img
                                src={EcewsLogo}
                                alt="ECEWS Logo"
                                style={{ width: 150, height: "auto" }}
                            />
                        </Box>



                        {/* Right: User Profile */}
                        <Box display="flex" alignItems="center" gap={3}>
                            {/* Timestamp */}
                            <Typography variant="body1" sx={{ fontWeight: 500, color: "#6C757D", fontFamily: 'Satoshi' }}>
                                TUE 28 May, 01:40PM
                            </Typography>
                            {/* Profile Section */}
                            <Dropdown />

                        </Box>
                    </Box>
                    {/* Header Section */}
                    <Container
                        sx={{

                            marginTop: 2, // Space from the top
                            marginBottom: 5, // Space from the bottom
                            position: "relative",
                        }}
                    >

                        {/* Middle: Welcome Message */}
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                flex: 1,
                                textAlign: "center",
                                color: "#333",
                            }}
                        >
                            Welcome Joshua!
                        </Typography>
                        {/* Dashboard Tiles */}
                        <Grid container spacing={3} mt={3}>
                            {tiles.map((tile, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Link to={tile.path || "/"}><CustomCard
                                        borderTopRightRadius={tile.borderTopRightRadius}
                                        borderTopLeftRadius={tile.borderTopLeftRadius}
                                        borderBottomRightRadius={tile.borderBottomRightRadius}
                                        borderBottomLeftRadius={tile.borderBottomLeftRadius}
                                        position={tile.position}  // Custom position
                                        text={tile.text}
                                        width={tile.width}
                                        height={tile.height}
                                        backgroundColor={tile.backgroundColor}
                                        overlayColor={tile.overlayColor} />
                                        </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </div>
        </ThemeProvider>
    );
};

export default CDRDashboard;
