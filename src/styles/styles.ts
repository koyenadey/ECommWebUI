import { Link as RLink } from "react-router-dom";

import { Box, styled } from "@mui/system";
import {
  AppBar,
  Breadcrumbs,
  Button,
  Card,
  Container,
  IconButton,
  ListItemText,
  Paper,
  Link,
  TextField,
  Typography,
  List,
  ListItemIcon,
  ListItem,
} from "@mui/material";
import { InputBase } from "@mui/material";
import Select from "@mui/material/Select";
import MenuIcon from "@mui/icons-material/Menu";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightIcon from "@mui/icons-material/Copyright";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export const StyledLink = styled(RLink)({
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

export const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: "#393b39",
  height: "50vh",
  width: "100%",

  [theme.breakpoints.down("sm")]: {},
}));
export const StyledInformation = styled(Box)(({ theme }) => ({
  width: "60%",
  display: "flex",
  margin: "auto",
  [theme.breakpoints.between("xs", "sm")]: {
    width: "60%",
  },
  [theme.breakpoints.between("xs", "sm")]: {
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
  backgroundColor: "white",
  color: "#393b39",
  width: "20%",
  "&:hover": {
    backgroundColor: "#393b39",
    color: "white",
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
  color: "white",
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
  color: "white",
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
  color: "white",
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
  color: "white",
  fontSize: "90%",
  opacity: "40%",
}));

export const StyledCopyrightText = styled("span")(({ theme }) => ({
  color: "white",
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

export const StyledPrdHeader = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
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
    fontSize: "1.8rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2rem",
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
  color: "#030303",
  fontSize: "1.1rem",
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
  cursor: "pointer",
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
