import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";
import {
  Background,
  BackgroundImage,
  CustomFilledButton,
  CustomOutlinedButton,
  LogoContainer,
} from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import BannerImage from "../../images/BannerImage.jpeg";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <Background component="section" aria-labelledby="banner-title">

      <Container sx={{ textAlign: 'left' }}>
        <Typography variant="h1" id="banner-title" fontWeight="600">
          Be uniquely you!
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          limited spring collections
        </Typography>
        <Box mt={3}>
          <CustomFilledButton
            component={Link}
            onClick={() => navigate("/products/all")}
            variant="contained"
            color="primary"
            aria-label="Shop Now"
          >
            Shop Now
          </CustomFilledButton>
          <CustomOutlinedButton
            component={Link}
            onClick={() => navigate("/aboutus")}
            variant="outlined"
            color="primary"
            aria-label="Find More"
          >
            Find More
          </CustomOutlinedButton>
        </Box>
      </Container>
      <LogoContainer aria-hidden="true">
        <img src="/logoipsum-1.png" alt="" />
        <img src="/logoipsum-2.png" alt="" />
        <img src="/logoipsum-3.png" alt="" />
        <img src="/logoipsum-4.png" alt="" />
      </LogoContainer>
    </Background>
  );
};

export default Banner;
