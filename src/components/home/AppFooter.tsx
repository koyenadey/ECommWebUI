import React from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  Facebook,
  YouTube,
  Instagram,
  Twitter,
  Google,
} from "@mui/icons-material";
import modamorphLogo from "../../images/modamorph-white-logo.png";
import { Category } from "../../misc/type";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const SubscribeBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const SubscribeButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  backgroundColor: "#ff4081",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#e6006f",
  },
}));

const AppFooter = () => {
  const categories: Category[] = useSelector(
    (state: AppState) => state.productReducer.categories
  );

  return (
    <FooterContainer>
      <Divider sx={{ width: "100%" }} />
      <Grid
        container
        spacing={2}
        marginY="40px"
        paddingX="20px"
        justifyContent="space-between"
      >
        <Grid item xs={12} md={3} width="100%">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
          >
            <Box>
              <img
                src={modamorphLogo}
                alt="logo image"
                loading="lazy"
                style={{ height: "80px", width: "80px" }}
              />
            </Box>
            <Box
              flexDirection="column"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6" component="div" fontWeight="700">
                ModaMorph
              </Typography>
              <Typography variant="body1">Be uniquely you!</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={3} display="flex" justifyContent="center">
          <Box>
            <Typography variant="h6" component="div">
              Product by categories
            </Typography>
            {categories.map((c) => (
              <Box key={`${c.id}_category`}>
                <Link href="#" underline="hover">
                  {c.name}
                </Link>
                <br />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={6} md={3} display="flex" justifyContent="center">
          <Box>
            <Typography variant="h6" component="div">
              Know more
            </Typography>
            <Link href="#" underline="hover">
              About us
            </Link>
            <br />
            <Link href="#" underline="hover">
              Shipping & returns
            </Link>
            <br />
            <Link href="#" underline="hover">
              Customer care
            </Link>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Typography variant="h6" component="div">
              Subscribe
            </Typography>
            <SubscribeBox>
              <TextField
                variant="outlined"
                placeholder="Your email address..."
                inputProps={{ "aria-label": "Your email address" }}
              />
              <SubscribeButton variant="contained">SUBSCRIBE</SubscribeButton>
            </SubscribeBox>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        marginY="20px"
        paddingX="20px"
      >
        <Box display="flex" justifyContent="center">
          <Facebook aria-label="Facebook" />
          <YouTube aria-label="YouTube" />
          <Instagram aria-label="Instagram" />
          <Twitter aria-label="Twitter" />
          <Google aria-label="Google" />
        </Box>
        <Box textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Copyright © 2024 ModaMorph. Powered by ModaMorph.
          </Typography>
        </Box>
      </Box>
    </FooterContainer>
  );
};

export default AppFooter;
