import { Link as RLink } from "react-router-dom";

import { Box, styled } from "@mui/system";
import {
  AppBar,
  Breadcrumbs,
  Button,
  Card,
  Container,
  IconButton,
  InputLabel,
  ListItemText,
  Paper,
  Link,
  TextField,
  Typography,
  List,
  ListItemIcon,
  ListItem,
  TableCell,
  Divider,
  Select,
  Pagination,
  Toolbar,
  Grid,
  Accordion,
  ImageList,
  Avatar,
} from "@mui/material";
import { InputBase } from "@mui/material";
import modaMorphModel from "../images/model1.jpg";

import MenuIcon from "@mui/icons-material/Menu";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightIcon from "@mui/icons-material/Copyright";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const StyledLink = styled(RLink)(({ theme }) => ({
  fontFamily: "Roboto, sans-serif",
  textDecoration: "none",
  color: theme.palette.mode === "dark" ? "#f2f2f2" : "#393b39",
}));

export const NavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#393b39" : "#f2f2f2",
})) as typeof AppBar;

export const StyledDarkMode = styled(DarkModeIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#f2f2f2" : "#001200",
}));
export const StyledLightMode = styled(Brightness5Icon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#f2f2f2" : "#001200",
}));

export const StyledMenuIcon = styled(MenuIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#f2f2f2" : "#393b39",
}));

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
})) as typeof Typography;

export const CustomFooter = styled(Box)(({ theme }) => ({
  backgroundColor: "#2272A1",
  color: "white",
  padding: "4%4%",

  // [theme.breakpoints.down("sm")]: {
  //   width: "50%",
  // },
})) as typeof Box;

export const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#393b39" : "##2272A1",
  //backgroundColor: "#2272A1",
  color: "white",
  padding: "4%4%",
  //width: "100%",

  [theme.breakpoints.down("sm")]: {},
})) as typeof Box;

export const StyledInformation = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "auto",
  [theme.breakpoints.down("xs")]: {
    //width: "20%",
  },
  [theme.breakpoints.between("xs", "sm")]: {
    width: "60%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "60%",
  },
})) as typeof Box;

export const StyledBtnFooter = styled(Button)(({ theme }) => ({
  margin: "3rem 1rem",
  color: theme.palette.mode === "dark" ? "white" : "black",
  opacity: "60%",
  fontFamily: "Roboto, sans-serif",
  textAlign: "center",
  fontSize: "16px",

  [theme.breakpoints.down("xs")]: {
    //margin: "1rem 1rem",
    fontSize: "0.5rem",
    minWidth: "0",
  },

  [theme.breakpoints.between("xs", "sm")]: {
    margin: "1rem 1rem",
    fontSize: "0.5rem",
    minWidth: "0",
  },

  [theme.breakpoints.between("sm", "md")]: {
    margin: "1rem 0.5rem",
    fontSize: "0.8rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    width: "60%",
    margin: "2rem 1rem",
    fontSize: "1rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    width: "60%",
    fontSize: "1rem",
  },
})) as typeof Button;

export const SaveButton = styled("input")({
  backgroundColor: "#393b39",
  color: "white",
  marginTop: "1%",
  width: "40%",
  padding: "1%",
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
  marginTop: "5%",
  marginBottom: "5%",
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

export const SubscribeBox = styled(Box)(({ theme }) => ({
  margin: "auto",
  width: "70%",
  textAlign: "center",
  [theme.breakpoints.between("xs", "sm")]: {},
}));

export const SubscribeText = styled(TextField)(({ theme }) => ({
  border: "1px solid white",
  color: "white",
  width: "30%",
  marginTop: "2%",
  "&:active": {
    border: "2px solid white",
    color: "white",
  },
  [theme.breakpoints.between("xs", "sm")]: {
    marginTop: "10%",
    width: "50%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    marginTop: "0%",
    width: "50%",
    fontSize: "0.5rem",
    outerHeight: "5%",
    innerHeight: "2%",
  },
  [theme.breakpoints.between("md", "lg")]: {
    marginTop: "2%",
    width: "50%",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    marginTop: "2%",
    width: "50%",
  },
})) as typeof TextField;

export const SubscribeBtn = styled(Button)(({ theme }) => ({
  margin: "3% 2%",
  padding: "1%",
  backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
  color: theme.palette.mode === "dark" ? "black" : "white",
  width: "20%",

  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#666666" : "#f2f2f2",
    color: theme.palette.mode === "dark" ? "#f2f2f2" : "#393b39",
  },
  [theme.breakpoints.between("xs", "sm")]: {
    width: "50%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    marginTop: "0%",
    width: "20%",
    fontSize: "0.6rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    marginTop: "3%",
    width: "20%",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    marginTop: "3.8%",
    width: "20%",
  },
})) as typeof Button;

export const StyledFacebookIcon = styled(FacebookIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "white" : "black",
  margin: "3% 2%",
  [theme.breakpoints.between("xs", "sm")]: {
    margin: "5% 2%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    margin: "5% 2%",
  },
  [theme.breakpoints.between("md", "lg")]: {
    margin: "2% 2%",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    margin: "3% 2%",
  },
  [theme.breakpoints.up("xl")]: {
    margin: "3% 2%",
  },
}));

export const StyledInstagramIcon = styled(InstagramIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "white" : "black",
  margin: "3% 2%",
  [theme.breakpoints.between("xs", "sm")]: {
    margin: "5% 2%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    margin: "5% 2%",
  },
  [theme.breakpoints.between("md", "lg")]: {
    margin: "2% 2%",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    margin: "3% 2%",
  },
  [theme.breakpoints.up("xl")]: {
    margin: "3% 2%",
  },
}));

export const StyledYoutubeIcon = styled(YouTubeIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "white" : "black",
  margin: "3% 2%",
  [theme.breakpoints.between("xs", "sm")]: {
    margin: "5% 2%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    margin: "5% 2%",
  },
  [theme.breakpoints.between("md", "lg")]: {
    margin: "2% 2%",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    margin: "3% 2%",
  },
  [theme.breakpoints.up("xl")]: {
    margin: "3% 2%",
  },
}));
export const StyledCopyrightIcon = styled(CopyrightIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "white" : "black",
  fontSize: "90%",
  opacity: "40%",
}));

export const StyledCopyrightText = styled("span")(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "white" : "black",
  opacity: "40%",
  [theme.breakpoints.between("xs", "sm")]: {
    margin: "3% 2%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    margin: "5% 2%",
  },
  [theme.breakpoints.between("md", "lg")]: {
    margin: "5% 2%",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    margin: "10% 2%",
  },
}));

export const StyledInfoSections = styled(Typography)(({ theme }) => ({
  padding: "5%",
  borderBottom: "1px solid #393b39",
  color: "#393b39",
  fontSize: "3rem",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "2.2rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "2.3rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "2.4rem",
  },
})) as typeof Typography;

export const StyledAboutDesc = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
  margin: "2rem",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "0.8rem",
    margin: "0.8rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "1rem",
    margin: "1rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1.1rem",
    margin: "1.4rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.3rem",
    margin: "2rem",
  },
})) as typeof Typography;

export const StyledListItem = styled(ListItemText)({
  textAlign: "center",
});

export const StyledSearchBar = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  m: "auto",
  [theme.breakpoints.between("xs", "sm")]: {
    display: "flex",
    width: "50%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    display: "flex",
    width: "50%",
  },
  [theme.breakpoints.between("md", "lg")]: {
    display: "flex",
    width: "50%",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    display: "flex",
    width: "50%",
  },
  marginTop: "4%",
  height: "30%",
})) as typeof Paper;

export const StyledMagnifyingGlass = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.between("xs", "sm")]: {
    margin: "0",
    padding: "0",
  },
  [theme.breakpoints.between("sm", "md")]: {
    margin: "0",
    padding: "0",
  },
  [theme.breakpoints.between("md", "lg")]: {
    margin: "0",
    padding: "0",
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  [theme.breakpoints.between("xs", "sm")]: {
    width: "90%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: "90%",
  },
}));

export const StyledBredCrumbs = styled(Breadcrumbs)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#393b39" : "#393b39",

  [theme.breakpoints.between("xs", "sm")]: {
    marginTop: "20%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    marginTop: "10%",
  },
  [theme.breakpoints.between("md", "lg")]: {
    marginTop: "10%",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    marginTop: "10%",
  },
  [theme.breakpoints.up("xl")]: {
    marginTop: "10%",
  },
}));

export const StyledBannerHeader = styled(Typography)(({ theme }) => ({
  fontSize: "6rem",
  [theme.breakpoints.down("xs")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "4rem",
  },
})) as typeof Typography;

export const StyledPrdDetails = styled(Card)(({ theme }) => ({
  maxWidth: "50%",
  margin: "auto",
  [theme.breakpoints.between("xs", "sm")]: {
    marginBottom: "5%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    marginBottom: "5%",
  },
  [theme.breakpoints.between("md", "lg")]: {
    marginBottom: "5%",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    marginBottom: "5%",
  },
  [theme.breakpoints.up("xl")]: {
    marginBottom: "5%",
  },
})) as typeof Card;

export const StyledDetailsHeader = styled(Typography)(({ theme }) => ({
  fontSize: "50px",
  fontWeight: "700",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "1.8rem",
    fontWeight: "500",
    margin: "2%",
    padding: "2%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "2.5rem",
    fontWeight: "500",
    margin: "2%",
    padding: "2%",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "2.5rem",
    fontWeight: "500",
    margin: "2%",
    padding: "2%",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "2.5rem",
    fontWeight: "500",
    margin: "2%",
    padding: "2%",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "3rem",
    fontWeight: "500",
    margin: "2%",
    padding: "2%",
  },
})) as typeof Typography;

export const StyledSubTotalPrice = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.between("xs", "sm")]: {},
})) as typeof Box;

export const StyledPrdDesc = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.1rem",
  },
})) as typeof Typography;

export const StyledPrice = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "1.3rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.5rem",
  },
})) as typeof Typography;

export const StyledCartBtn = styled(Button)(({ theme }) => ({
  fontSize: "1.1rem",
  backgroundColor: theme.palette.mode === "dark" ? "#f2f2f2" : "#d9d9d9",
  color: theme.palette.mode === "dark" ? "#666666" : "black",

  [theme.breakpoints.between("xs", "sm")]: {
    color: "#030303",
    fontSize: "0.7rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    color: "#030303",
    fontSize: "0.8rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    color: "#030303",
    fontSize: "1rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    color: "#030303",
    fontSize: "1rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    color: "#030303",
    fontSize: "1rem",
  },
})) as typeof Button;

export const StyledQtyDdl = styled(Select)(({ theme }) => ({
  fontSize: "1.2rem",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.1rem",
  },
}));

export const StyledCartHeader = styled(Typography)(({ theme }) => ({
  marginBottom: "1%",
  fontSize: "1.7rem",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "1.3rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.7rem",
  },
})) as typeof Typography;

export const StyledCartSumm = styled(Typography)(({ theme }) => ({
  marginBottom: "1%",
  fontSize: "1.7rem",

  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.7rem",
  },
})) as typeof Typography;

export const StyledSubTot = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.2rem",
  },
})) as typeof Typography;

export const StyledEstiDel = styled(Link)(({ theme }) => ({
  fontSize: "1rem",
  color: "#383838",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1rem",
  },
}));

export const StyledCartTot = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.2rem",
  },
})) as typeof Typography;

export const StyledCartTotVal = styled(Typography)(({ theme }) => ({
  marginLeft: "10%",
  fontSize: "1.2rem",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.2rem",
  },
})) as typeof Typography;

export const StyledCheckOut = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  marginLeft: "0.4rem",
  color: theme.palette.mode === "dark" ? "#393b39" : "#393b39",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "0.5rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "0.7rem",
    marginLeft: "0.4rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1rem",
    marginLeft: "0.4rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1rem",
    marginLeft: "0.4rem",
  },
})) as typeof Typography;

export const StyledLock = styled(LockIcon)(({ theme }) => ({
  fontSize: "large",
  color: theme.palette.mode === "dark" ? "#393b39" : "#393b39",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "small",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "medium",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "large",
  },
}));

export const StyledOrderDetList = styled(List)(({ theme }) => ({
  bgcolor: "background.paper",
  width: "60%",
  margin: "2%",
  [theme.breakpoints.between("xs", "sm")]: {},
  [theme.breakpoints.between("sm", "md")]: {},
  [theme.breakpoints.between("md", "lg")]: {},
  [theme.breakpoints.between("lg", "xl")]: {},
})) as typeof List;

export const StyledAddQty = styled(Box)(({ theme }) => ({
  minWidth: "80px",
  margin: "10%",
  border: "1px solid black",
  display: "flex",
  justifyContent: "space-evenly",
  [theme.breakpoints.between("xs", "sm")]: {
    minWidth: "50px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    minWidth: "70px",
  },
  [theme.breakpoints.between("md", "lg")]: {
    minWidth: "80px",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    minWidth: "80px",
  },
})) as typeof Box;

export const StyledQty = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.between("xs", "sm")]: {
    padding: "10px",
    width: "0.3rem",
    height: "0.3rem",
  },
})) as typeof IconButton;

export const StyledQtyVal = styled(Typography)(({ theme }) => ({
  padding: "1px",
  margin: "3px",
  fontSize: "1.2rem",
  [theme.breakpoints.between("xs", "sm")]: {
    padding: 0,
    margin: 0,
    fontSize: "1rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    padding: "3px",
    margin: "2px",
    fontSize: "1rem",
  },
  [theme.breakpoints.between("md", "lg")]: {
    padding: "1px",
    margin: "3px",
    fontSize: "1rem",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    padding: "2px",
    margin: "3px",
    fontSize: "1rem",
  },
})) as typeof Typography;

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  minWidth: "50px",
  [theme.breakpoints.between("xs", "sm")]: {
    minWidth: "50px",
    margin: "5px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    minWidth: "50px",
    margin: "5px",
  },
  [theme.breakpoints.between("md", "lg")]: {
    minWidth: "30px",
    margin: "8px",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    minWidth: "30px",
    margin: "8px",
  },
})) as typeof ListItemText;

export const StyledPrdTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  marginLeft: "10px",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "0.6rem",
    marginLeft: "10px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "1rem",
    marginLeft: "10px",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1rem",
    marginLeft: "8px",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.3rem",
    marginLeft: "10px",
  },
})) as typeof Typography;

export const StyledOrderListItem = styled(ListItem)(({ theme }) => ({
  [theme.breakpoints.between("xs", "sm")]: {
    padding: "0",
  },
}));

export const StyledTotItemPrice = styled(Typography)(({ theme }) => ({
  margin: "5%",
  textAlign: "center",
  minWidth: "80px",
  fontSize: "1.3rem",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "0.6rem",
    margin: "35px",
    minWidth: "50px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    fontSize: "1rem",
    marginLeft: "35px",
    minWidth: "50px",
  },
  [theme.breakpoints.between("md", "lg")]: {
    fontSize: "1.1rem",
    marginLeft: "50px",
    minWidth: "50px",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    fontSize: "1.3rem",
    marginLeft: "30px",
    minWidth: "60px",
  },
})) as typeof Typography;

export const StyledRemItemQty = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "50px",
  textAlign: "center",

  [theme.breakpoints.between("xs", "sm")]: {
    padding: 0,
    minWidth: "30px",
    marginLeft: "60px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    padding: 0,
    minWidth: "35px",
    marginLeft: "50px",
  },
  [theme.breakpoints.between("md", "lg")]: {
    padding: 0,
    minWidth: "30px",
    marginLeft: "45px",
  },
})) as typeof ListItemIcon;

export const StyledActionBtnsClose = styled(CloseIcon)(({ theme }) => ({
  height: "1.2em",
  width: "1.2em",
  cursor: "pointer",
  color: theme.palette.mode === "dark" ? "#999999" : "#999999",
  [theme.breakpoints.between("xs", "sm")]: {
    height: "0.8em",
    width: "0.8em",
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: "1.3em",
    width: "1.3em",
  },
  [theme.breakpoints.between("md", "lg")]: {
    height: "1.3em",
    width: "1.3em",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    height: "1.3em",
    width: "1.3em",
  },
}));
export const StyledActionBtnsAdd = styled(AddIcon)(({ theme }) => ({
  height: "1.2em",
  width: "1.2em",
  cursor: "pointer",
  color: theme.palette.mode === "dark" ? "#999999" : "#999999",
  [theme.breakpoints.between("xs", "sm")]: {
    height: "0.8em",
    width: "0.8em",
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: "1.3em",
    width: "1.3em",
  },
  [theme.breakpoints.between("md", "lg")]: {
    height: "1em",
    width: "1em",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    height: "1em",
    width: "1em",
  },
}));
export const StyledActionBtnsRemove = styled(RemoveIcon)(({ theme }) => ({
  height: "1.3em",
  width: "1.3em",
  cursor: "pointer",
  color: theme.palette.mode === "dark" ? "#999999" : "#999999",
  [theme.breakpoints.between("xs", "sm")]: {
    height: "0.8em",
    width: "0.8rem",
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: "1em",
    width: "1em",
  },
  [theme.breakpoints.between("md", "lg")]: {
    height: "1em",
    width: "1em",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    height: "1.2em",
    width: "1.2em",
  },
}));

export const StyledSectionBox = styled(Box)(({ theme }) => ({
  height: "70vh",
  [theme.breakpoints.between("xs", "sm")]: {
    height: "30vh",
  },
  [theme.breakpoints.between("xs", "sm")]: {
    height: "50vh",
  },
  [theme.breakpoints.between("md", "lg")]: {
    height: "60vh",
  },
  [theme.breakpoints.between("lg", "xl")]: {
    height: "70vh",
  },
})) as typeof Box;

export const StyledProfileHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "black" : "black",
})) as typeof Typography;

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "black" : "black",
})) as typeof TableCell;

export const StyledProfileDetails = styled(TextField)(({ theme }) => ({
  width: "100%",
  variants: "outlined",
})) as typeof TextField;

export const StyledDivider = styled(Divider)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#bfbfbf" : "#bfbfbf",
})) as typeof Divider;

export const StyledSelect = styled(Select)(({ theme }) => ({
  background: theme.palette.background.paper,
}));

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#4e4e4e" : "#4e4e4e",
})) as typeof InputLabel;

export const StyledEditIcon = styled(EditIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#4e4e4e" : "#4e4e4e",
}));
export const StyledDeleteIcon = styled(DeleteIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#4e4e4e" : "#4e4e4e",
}));

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  borderRadius: "4px",
  background: theme.palette.background.paper,
})) as typeof Pagination;

export const StyledContainer = styled(Container)(({ theme }) => ({
  border: "1px solid black",
  marginBottom: "2%",
  marginTop: "2%",
  marginX: "auto",
})) as typeof Container;

export const CustomOutlinedButton = styled(Button)(() => ({
  borderColor: "white",
  color: "white",
  padding: "1%3%",
  "&:hover": {
    borderColor: "white",
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "black",
  },
})) as typeof Button;

export const CustomFilledButton = styled(Button)(() => ({
  backgroundColor: "white",
  color: "black",
  padding: "1%3%",
  marginRight: "2%",
  "&:hover": {
    backgroundColor: "black",
    color: "white",
  },
})) as typeof Button;

export const LogoContainer = styled(Box)({
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "15px",
});

export const BackgroundImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -1,
});

export const Background = styled(Box)({
  position: "relative",
  color: "white",
  padding: "50px 20px",
  textAlign: "center",
  height: "90vh", // 90% of the viewport height
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}) as typeof Box;

export const Section = styled(Box)(({ theme }) => ({
  //backgroundColor: "#f0f2f5",
  padding: `${theme.spacing(8)}px 0`, // Ensure px units are added
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  margin: "5%0%",
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
})) as typeof Box;

export const Feature = styled(Box)(({ theme }) => ({
  textAlign: "center",
  margin: theme.spacing(2),
  flex: "1 1 200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})) as typeof Box;

export const Icon = styled("span")(({ theme }) => ({
  fontSize: "3rem",
  marginBottom: theme.spacing(1),
}));

export const FeatureIcon = styled("img")(({ theme }) => ({
  fontSize: "3rem",
  marginBottom: theme.spacing(1),
  width: "30px", // Adjust the width and height as needed
  height: "30px",
}));

export const StyledProdCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: "100px",
  display: "flex",
  alignItems: "center",
  margin: "1%0%",
  justifyContent: "space-between",
  padding: "0 1rem",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "30%",
    padding: "0",
  },
}));

export const CustomLink = styled(Link)({
  fontWeight: "bolder",
  fontSize: "1.1rem",
  fontFamily: "sans-serif",
  alignSelf: "center",
  cursor: "pointer",
  "@media (max-width: 600px)": {
    fontSize: "0.8rem",
    marginTop: "1%",
  },
}) as typeof Link;

export const CustomAvatar = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "50px",
    height: "50px",
  },
})) as typeof Avatar;

/*export const NavLinksBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  [theme.breakpoints.between("xs", "sm")]: {
    gap: "0.5rem",
    fontSize: "0.75rem",
    width: "100%", // Ensure it adapts to smaller screens
    flexDirection: "column",
  },
  [theme.breakpoints.up("sm")]: {
    gap: "1rem",
    fontSize: "1rem",
    width: "auto", // Adjust width for larger screens
  },
  [theme.breakpoints.up("md")]: {
    gap: "1.5rem",
    fontSize: "1.25rem",
  },
  [theme.breakpoints.up("lg")]: {
    gap: "2rem",
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("xl")]: {
    gap: "2.5rem",
    fontSize: "1.75rem",
  },
})); */

export const NavLinksBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  [theme.breakpoints.down("xs")]: {
    gap: "1rem",
    fontSize: "0.5rem",
    width: "50%",
    display: "none",
  },
  [theme.breakpoints.between("xs", "sm")]: {
    gap: "1rem",
    fontSize: "0.5rem",
    width: "50%",
    display: "none",
  },
  [theme.breakpoints.between("sm", "md")]: { display: "none" },
  [theme.breakpoints.between("md", "lg")]: {},
  [theme.breakpoints.between("lg", "xl")]: {},
}));

export const NavLinksMobileViewBox = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "1rem",
  [theme.breakpoints.down("xs")]: {
    // gap: "1rem",
    // fontSize: "0.5rem",
    // width: "50%",
    display: "flex",
  },
  [theme.breakpoints.between("xs", "sm")]: {
    gap: "1rem",
    fontSize: "0.5rem",
    width: "50%",
    display: "flex",
  },
  [theme.breakpoints.between("sm", "md")]: { display: "flex" },
  [theme.breakpoints.between("md", "lg")]: {},
  [theme.breakpoints.between("lg", "xl")]: {},
}));

export const StyledLoginImgGrid = styled(Grid)(({ theme }) => ({
  backgroundImage: `url(${modaMorphModel})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "8px",
  height: "580px",
  width: "580px",
}));

export const StyledMainGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  maxWidth: "1000px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "10vh",
})) as typeof Grid;

export const HeaderWelcomeBack = styled(Typography)(({ theme }) => ({
  fontFamily: "Kanit, sans-serif",
  fontWeight: "700",
  fontSize: "40px",
  width: "100%",
  textAlign: "center",
  color: "#f0f2f2",
  mt: "30px",
})) as typeof Typography;

export const HeaderLoginBody = styled(Typography)(({ theme }) => ({
  marginTop: "40px",
  fontSize: "20px",
  textAlign: "center",
  color: "#f2f2f2",
  width: "80%",
  marginLeft: "auto",
  marginRight: "auto",
})) as typeof Typography;

export const StyledLoginHeader = styled(Box)(({ theme }) => ({
  margin: "4%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  height: "100%",
  textAlign: "center",
})) as typeof Box;

export const StyledLoginImage = styled(Typography)(({ theme }) => ({
  fontFamily: "Kanit, sans-serif",
  fontWeight: "700",
  fontSize: "20px",
  width: "100%",
  textAlign: "center",
})) as typeof Typography;

export const StyledLoginSignupHeader = styled(Typography)(({ theme }) => ({
  fontFamily: "Kanit, sans-serif",
  fontSize: "15px",
  width: "100%",
})) as typeof Typography;

export const StyledHeaderWelcomeBack = styled(Typography)(({ theme }) => ({
  fontFamily: "Kanit, sans-serif",
  fontWeight: "700",
  fontSize: "40px",
  width: "100%",
  textAlign: "center",
  color: "#f0f2f2",
})) as typeof Typography;

export const StyledCreateAccountBox = styled(Box)(({ theme }) => ({
  mt: "15px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignSelf: "center",
})) as typeof Box;

export const StyledSignInBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignSelf: "center",
})) as typeof Box;

export const StyledSignInButton = styled(Button)(({ theme }) => ({
  marginTop: "1%",
  marginBottom: "2%",
  width: "150px",
  backgroundColor: "#2172a1",
})) as typeof Button;

export const StyledSignInGoogleBtn = styled(Button)(({ theme }) => ({
  fontFamily: "Kanit, sans-serif",
  textTransform: "none",
  borderColor: "#2172a1",
  color: "#2172a1",
  fontWeight: "400",
  fontSize: "15px",
})) as typeof Button;

export const StyledSignInFbBtn = styled(Button)(({ theme }) => ({
  fontFamily: "Kanit, sans-serif",
  textTransform: "none",
  borderColor: "#2172a1",
  color: "#2172a1",
  fontWeight: "400",
  fontSize: "15px",
})) as typeof Button;

export const StyledImageList = styled(ImageList)(({ theme }) => ({
  width: "100%",
  height: "800px",
  overflow: "hidden",
  marginTop: "40px",
})) as typeof ImageList;

export const StyledProductCatParentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  alignItems: "left",
})) as typeof Box;

export const StyledProductChildBox = styled(Box)(({ theme }) => ({
  height: "35%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  textAlign: "left",
  marginTop: "30px",
})) as typeof Box;

export const StyledProdName = styled(Typography)(({ theme }) => ({
  fontFamily: "Faustina, sans-serif",
  fontSize: "40px",
  fontWeight: "700",
})) as typeof Typography;

export const StyledProdPrice = styled(Typography)(({ theme }) => ({
  fontFamily: "Cambay, sans-serif",
  marginLeft: "20px",
  fontSize: "20px",
  color: "#686868",
})) as typeof Typography;

export const StyledProductDesc = styled(Box)(({ theme }) => ({
  height: "40%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  textAlign: "left",
  marginTop: "30px",
})) as typeof Box;

export const StyledReturnsAccordian = styled(Accordion)(({ theme }) => ({
  border: "2px solid #efefef",
  boxShadow: "0",
  borderRadius: "0px",
  margin: "5px",
})) as typeof Accordion;

export const StyledDeliveryAccordian = styled(Accordion)(({ theme }) => ({
  border: "2px solid #efefef",
  boxShadow: "0",
  borderRadius: "0px",
  margin: "5px",
  backgroundColor: "unset",
})) as typeof Accordion;

export const StyledProdDesc = styled(Typography)(({ theme }) => ({
  fontFamily: "Cambay, sans-serif",
  marginY: "20px",
  fontWeight: "700",
  fontSize: "20px",
})) as typeof Typography;

export const StyledProdSpec = styled(Typography)(({ theme }) => ({
  fontFamily: "Cambay, sans-serif",
  marginY: "20px",
  fontWeight: "700",
  fontSize: "20px",
})) as typeof Typography;

export const StyledReviews = styled(Typography)(({ theme }) => ({
  fontFamily: "Cambay, sans-serif",
  marginY: "20px",
  fontWeight: "700",
  fontSize: "20px",
})) as typeof Typography;

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "100",
  height: "100",
  borderRadius: "0",
})) as typeof Avatar;

export const CustomFilledFeaturedButton = styled(Button)(() => ({
  backgroundColor: "#2272A1",
  color: "white",
  padding: "1%5%",
  marginRight: "2%",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    color: "black",
  },
})) as typeof Button;
