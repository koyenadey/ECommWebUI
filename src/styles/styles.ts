import { Link } from "react-router-dom";
import { Box, styled } from "@mui/system";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightIcon from "@mui/icons-material/Copyright";

export const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "#030303",
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

export const StyledBtnFooter = styled(Button)(({ theme }) => ({
  margin: "3rem 1rem",
  color: "white",
  opacity: "60%",
  fontFamily: "Roboto, sans-serif",
  textAlign: "center",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    margin: "3rem 0rem",
    fontSize: "0.5rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    fontSize: "1rem",
    margin: "3rem 0.5rem",
  },
  [theme.breakpoints.up("lg")]: {
    width: "60%",
    fontSize: "1rem",
  },
}));

export const SaveButton = styled("input")({
  backgroundColor: "#393b39",
  color: "white",
  marginTop: "1%",
  width: "100%",
  padding: "2%",
  textAlign: "center",
  borderRadius: "6px",
  transition: "background-color 0.3s ease",
  fontSize: "1rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "white",
    color: "#393b39",
  },
});

export const EditButton = styled(Button)({
  backgroundColor: "#393b39",
  color: "white",
  marginTop: "1%",
  width: "100%",
  "&:hover": {
    backgroundColor: "white",
    color: "#393b39",
    border: "1px solid #393b39",
    cursor: "pointer",
  },
});

export const CreateAccountBtn = styled(Button)({
  color: "#393b39",
  "&:hover": {
    backgroundColor: "white",
  },
  "&:active": {
    backgroundColor: "white",
  },
  "&:focus": {
    backgroundColor: "white",
  },
});

export const RegisterButton = styled(Button)({
  color: "#393b39",
  width: "50%",
  padding: "2%",
  margin: "5%",
  border: "1px solid #393b39",
  "&:hover": {
    border: "1px solid #393b39",
  },
});

export const RegisterContainer = styled(Container)({
  marginTop: "13%",
  width: "50%",
  border: "1px solid black",
  textAlign: "center",
});

export const FormInput = styled(Box)({
  margin: "5%",
});

export const ProductItemIcon = styled(IconButton)({
  color: "rgba(255, 255, 255, 0.54)",
});

export const SubscribeBox = styled(Box)({
  margin: "auto",
  width: "70%",
  textAlign: "center",
});

export const SubscribeText = styled(TextField)({
  border: "1px solid white",
  color: "white",
  width: "30%",
  marginTop: "2%",
  "&:active": {
    border: "2px solid white",
    color: "white",
  },
});

export const SubscribeBtn = styled(Button)({
  margin: "3% 2%",
  padding: "1%",
  backgroundColor: "white",
  color: "#393b39",
  width: "20%",
  "&:hover": {
    backgroundColor: "#393b39",
    color: "white",
  },
});

export const StyledFacebookIcon = styled(FacebookIcon)({
  color: "white",
  margin: "3% 2%",
});
export const StyledInstagramIcon = styled(InstagramIcon)({
  color: "white",
  margin: "3% 2%",
});
export const StyledYoutubeIcon = styled(YouTubeIcon)({
  color: "white",
  margin: "3% 2%",
});
export const StyledCopyrightIcon = styled(CopyrightIcon)({
  color: "white",
  fontSize: "90%",
  opacity: "40%",
});
export const StyledCopyrightText = styled("span")({
  color: "white",
  opacity: "40%",
});

export const StyledInfoSections = styled(Typography)({
  padding: "5%",
  borderBottom: "1px solid #393b39",
  color: "#393b39",
});

export const StyledListItem = styled(ListItemText)({
  textAlign: "center",
});
