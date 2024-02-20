import { Link } from "react-router-dom";
import { Box, styled } from "@mui/system";
import { AppBar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";

export const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "#030303",
  margin: "0rem 1rem",
  fontFamily: "Roboto, sans-serif",
});

export const NavBar = styled(AppBar)({
  backgroundColor: "#f2f2f2",
});

export const StyledMenuIcon = styled(MenuIcon)({
  color: "#030303",
});

export const useHeadingSpace = () => {
  return useMediaQuery("(min-width:600px)");
};

export const Heading = styled(Typography)(({ theme }) => ({
  color: "white",
  marginLeft: "30%",
  marginTop: "50%",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
    fontWeight: "500",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "5rem",
    fontWeight: "500",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "100px",
    fontWeight: "600",
  },
}));

export const StyledFooter = styled(Box)({
  backgroundColor: "#393b39",
  height: "50vh",
  width: "100%",
});

export const StyledInformation = styled(Box)(({ theme }) => ({
  width: "60%",
  display: "flex",
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const StyledItem = styled(Typography)(({ theme }) => ({
  margin: "3rem 1rem",
  color: "white",
  opacity: "60%",
  fontFamily: "Roboto, sans-serif",
  textAlign: "center",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    margin: "3rem 0rem",
    fontSize: "0.8rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    fontSize: "1.5rem",
    margin: "3rem 0.5rem",
  },
  [theme.breakpoints.up("lg")]: {
    width: "60%",
    fontSize: "1rem",
  },
}));
