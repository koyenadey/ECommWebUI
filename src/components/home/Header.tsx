import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  styled,
  Badge,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { Category } from "../../misc/type";
import LoggedInUser from "../user/LoggedInUser";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { userMenuData } from "../../data/data";
import { useLocation, useNavigate } from "react-router-dom";
import { resetLogin, setThemeMode } from "../../redux/slices/userSlice";
import { resetCart } from "../../redux/slices/cartSlice";
import { resetOrder } from "../../redux/slices/orderSlice";
import modamorphlogo from "../../images/moda-morph.png";
import modamorphLogoWhite from "../../images/modamorph-white-logo.png";
import { ShoppingBagOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import fetchAllCategories from "../../redux/thunks/fetchAllCategories";
import { CATGET_URL } from "../../constants";
import { resetProduct } from "../../redux/slices/productSlice";

const CustomAppBar = styled(AppBar)({
  height: "100px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#2272a1",
  // background: 'linear-gradient(to right, #2272a1, transparent)',
});

export const CustomToolbar = styled(Toolbar)({
  minHeight: "100px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
});

export const NavLinksBox = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "1rem",
  [theme.breakpoints.up("md")]: { display: "flex" },
}));

export const NavLinksMobileViewBox = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "1rem",
  [theme.breakpoints.down("md")]: { display: "flex" },
}));

export const StyledDarkMode = styled(DarkModeIcon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#f2f2f2" : "#001200",
  fontSize: "32px",
}));

export const StyledLightMode = styled(Brightness5Icon)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#f2f2f2" : "#001200",
  fontSize: "32px",
}));

interface HeaderProps {
  isLoggedIn: boolean;
  mode: "dark" | "light";
}

export const CustomLink = styled(Link)({
  cursor: "pointer",
  fontWeight: "800",
  "&:hover": {
    color: "#d7d7d7",
  },
}) as typeof Link;

const Header = ({ isLoggedIn, mode }: HeaderProps) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userSettings = userMenuData;

  const categories: Category[] = useSelector(
    (state: AppState) => state.productReducer.categories
  );
  const isHomePage = pathname.length <= 1;

  const cartQty = useSelector((state: AppState) => state.cartReducer.quantity);

  const isAdmin =
    useSelector(
      (state: AppState) => state.userReducer.user?.role
    )?.toUpperCase() === "ADMIN"
      ? true
      : false;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseCategoryMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenCategoryMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchAllCategories(CATGET_URL));
    }
  }, []);

  const handleUserMenuActions = (url: string, state?: string) => {
    if (state) navigate(url, { state });
    else if (url === "/") {
      localStorage.removeItem("refresh-token");
      dispatch(resetLogin());
      dispatch(resetCart());
      dispatch(resetOrder());
      dispatch(resetProduct());
      navigate(url);
    } else navigate(url);
  };

  const handleNavigate = (category: Category) => {
    navigate(`/products/category/${category.name}/${category.id}`);
  };

  return (
    <CustomAppBar
      position="static"
      elevation={0}
      sx={
        isHomePage
          ? { background: "linear-gradient(to right, #2272a1, transparent)" }
          : { backgroundColor: "#2272a1" }
      }
    >
      <CustomToolbar>
        <IconButton onClick={() => navigate("/")}>
          <img
            src={modamorphlogo}
            alt="modamorph logo"
            style={{ height: "80px", width: "100px" }}
          />
        </IconButton>
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <NavLinksBox>
            <CustomLink
              onClick={() => navigate("/products/all")}
              color="inherit"
              underline="none"
            >
              Everything
            </CustomLink>
            {categories.map((c) => {
              return (
                <CustomLink
                  key={c.id}
                  onClick={() => handleNavigate(c)}
                  color="inherit"
                  underline="none"
                >
                  {c.name.split(" ")[0]}
                </CustomLink>
              );
            })}
          </NavLinksBox>
          <IconButton onClick={() => navigate("/checkout/cart")}>
            <Badge badgeContent={cartQty} color="success">
              <ShoppingBagOutlined
                sx={{ fontSize: "38px", color: "#f2f0f0" }}
              />
            </Badge>
          </IconButton>
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                {isLoggedIn ? (
                  <LoggedInUser />
                ) : (
                  <AccountCircleRoundedIcon
                    sx={{ fontSize: "38px", color: "#f2f0f0" }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userSettings.map((setting) => (
                <MenuItem
                  key={setting.type}
                  onClick={() =>
                    handleUserMenuActions(setting.url, setting.state)
                  }
                >
                  <Typography textAlign="center">{setting.type}</Typography>
                </MenuItem>
              ))}
              {isLoggedIn && (
                <Box>
                  <MenuItem
                    onClick={() => handleUserMenuActions("/profile", "")}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleUserMenuActions("/wishlist", "")}
                  >
                    <Typography textAlign="center">My wishlist</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleUserMenuActions("/order-history", "")}
                  >
                    <Typography textAlign="center">Order History</Typography>
                  </MenuItem>
                </Box>
              )}
              {isLoggedIn && isAdmin && (
                <MenuItem
                  onClick={() => handleUserMenuActions("/dashboard", "")}
                >
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              )}
              {isLoggedIn && (
                <MenuItem onClick={() => handleUserMenuActions("/")}>
                  <Typography textAlign="center">LogOut</Typography>
                </MenuItem>
              )}
              {!isLoggedIn && (
                <MenuItem onClick={() => handleUserMenuActions("/login")}>
                  <Typography textAlign="center">LogIn</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <IconButton
            sx={{ ml: 1 }}
            onClick={() =>
              dispatch(setThemeMode(mode === "light" ? "dark" : "light"))
            }
            color="inherit"
          >
            <Tooltip
              title={
                mode === "dark" ? "Enable light theme" : "Enable dark theme"
              }
            >
              {mode === "dark" ? <StyledDarkMode /> : <StyledLightMode />}
            </Tooltip>
          </IconButton>
          <NavLinksMobileViewBox>
            <IconButton onClick={handleOpenCategoryMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseCategoryMenu}
            >
              <MenuItem
                onClick={() => {
                  navigate("/products/all");
                  handleCloseCategoryMenu();
                }}
              >
                Everything
              </MenuItem>
              {categories.map((c) => (
                <MenuItem
                  key={c.id}
                  onClick={() => {
                    handleNavigate(c);
                    handleCloseCategoryMenu();
                  }}
                >
                  <Typography textAlign="center">{c.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </NavLinksMobileViewBox>
        </Box>
      </CustomToolbar>
    </CustomAppBar>
  );
};

export default Header;
