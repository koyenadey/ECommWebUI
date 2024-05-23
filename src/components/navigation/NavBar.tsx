import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "../menu/UserMenu";

import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";

import {
  NavBar,
  StyledDarkMode,
  StyledLightMode,
  StyledMenuIcon,
} from "../../styles/styles";
import { Box, Toolbar, IconButton, Avatar, Badge } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import Logo from "../../images/M.png";
import LoggedInUser from "../user/LoggedInUser";
import { resetLogin } from "../../redux/slices/userSlice";
import CategoriesMenu from "../menu/CategoriesMenu";
import SearchBar from "../search/SearchBar";
import { resetCart } from "../../redux/slices/cartSlice";
import { resetOrder } from "../../redux/slices/orderSlice";

interface NavBarProps {
  isLoggedIn: boolean;
  mode: "dark" | "light";
  toggleColorMode: () => void;
}

const NavigationBar = (props: NavBarProps) => {
  const { isLoggedIn, mode, toggleColorMode } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEll, setAnchorEll] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const openCat = Boolean(anchorEll);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCatClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEll(event.currentTarget);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartQty = useSelector((state: AppState) => state.cartReducer.quantity);

  const showProfileHandler = (action: string) => {
    if (action === "OrderHistory") navigate("/order-history");
    if (action === "Profile") navigate("/profile");
    if (action === "About Us") navigate("/aboutus", { state: "aboutus" });
    if (action === "Shipping & Returns")
      navigate("/aboutus", { state: "shipping" });
    if (action === "Customer Care")
      navigate("/aboutus", { state: "customercare" });
    if (action === "Dashboard") navigate("/dashboard");
    if (action === "LogOut") {
      localStorage.removeItem("refresh-token");
      dispatch(resetLogin());
      dispatch(resetCart());
      dispatch(resetOrder());
      navigate("/");
    }
    if (action === "LogIn") navigate("/login");

    setAnchorEl(null);
  };

  const showCategoriesHandler = (catName?: string, catId?: string) => {
    if (catId && catName) navigate(`/products/category/${catName}/${catId}`);
    setAnchorEll(null);
  };

  return (
    <Box>
      <NavBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={() => navigate("/")}>
            <Avatar variant="square" src={Logo}>
              Home
            </Avatar>
          </IconButton>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
            >
              {mode === "dark" ? <StyledDarkMode /> : <StyledLightMode />}
            </IconButton>
            <SearchBar />
            <IconButton onClick={handleProfileClick}>
              {isLoggedIn ? (
                <LoggedInUser />
              ) : (
                <PersonIcon sx={{ fontSize: 30 }} />
              )}
            </IconButton>
            <IconButton onClick={() => navigate("/checkout/cart")}>
              <Badge badgeContent={cartQty} color="success">
                <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              aria-controls={openCat ? "categories-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openCat ? "true" : undefined}
              onClick={handleCatClick}
            >
              <StyledMenuIcon />
            </IconButton>
          </Box>
          <CategoriesMenu
            anchorEl={anchorEll}
            open={openCat}
            handleClose={showCategoriesHandler}
          />
          <UserMenu
            anchorEl={anchorEl}
            open={open}
            handleClose={showProfileHandler}
            isLoggedIn={isLoggedIn}
          />
        </Toolbar>
      </NavBar>
    </Box>
  );
};

export default NavigationBar;
