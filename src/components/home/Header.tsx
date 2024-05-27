import React from "react";
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
import {
  CustomLink,
  CustomToolbar,
  NavLinksBox,
  NavLinksMobileViewBox,
  StyledAvatar,
  StyledDarkMode,
  StyledLightMode,
} from "../../styles/styles";
import LoggedInUser from "../user/LoggedInUser";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { userMenuData } from "../../data/data";
import { useNavigate } from "react-router-dom";
import { resetLogin } from "../../redux/slices/userSlice";
import { resetCart } from "../../redux/slices/cartSlice";
import { resetOrder } from "../../redux/slices/orderSlice";
import modamorphlogo from "../../images/moda-morph.png";
import { ShoppingBagOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

const CustomAppBar = styled(AppBar)({
  height: "100px",
  backgroundColor: "#2272A1",
});

interface HeaderProps {
  isLoggedIn: boolean;
  mode: "dark" | "light";
  toggleColorMode: () => void;
}

const Header = ({ isLoggedIn, mode, toggleColorMode }: HeaderProps) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const userSettings = userMenuData;

  const categories: Category[] = useSelector(
    (state: AppState) => state.productReducer.categories
  );

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

  const handleUserMenuActions = (url: string, state?: string) => {
    if (state) navigate(url, { state });
    else if (url === "/") {
      localStorage.removeItem("refresh-token");
      dispatch(resetLogin());
      dispatch(resetCart());
      dispatch(resetOrder());
      navigate(url);
    } else navigate(url);
  };

  const handleNavigate = (category: Category) => {
    navigate(`/products/category/${category.name}/${category.id}`);
  };

  return (
    <CustomAppBar position="static" elevation={0}>
      <CustomToolbar>
        <IconButton onClick={() => navigate("/")}>
          <StyledAvatar variant="square" src={modamorphlogo}>
            Home
          </StyledAvatar>
        </IconButton>
        <NavLinksBox>
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
          <IconButton onClick={() => navigate("/checkout/cart")}>
            <Badge badgeContent={cartQty} color="success">
              <ShoppingBagOutlined sx={{ fontSize: 30 }} />
            </Badge>
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                {isLoggedIn ? (
                  <LoggedInUser />
                ) : (
                  <AccountCircleRoundedIcon
                    sx={{ fontSize: "30px", mt: "2%" }}
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
              <MenuItem onClick={() => handleUserMenuActions("/dashboard", "")}>
                {isLoggedIn && isAdmin && (
                  <Typography textAlign="center">Dashboard</Typography>
                )}
              </MenuItem>
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
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
            >
              {mode === "dark" ? <StyledDarkMode /> : <StyledLightMode />}
            </IconButton>
          </Box>
        </NavLinksBox>
        <NavLinksMobileViewBox>
          <IconButton onClick={() => navigate("/checkout/cart")}>
            <Badge badgeContent={cartQty} color="success">
              <ShoppingBagOutlined sx={{ fontSize: 30 }} />
            </Badge>
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                {isLoggedIn ? (
                  <LoggedInUser />
                ) : (
                  <AccountCircleRoundedIcon
                    sx={{ fontSize: "30px", mt: "2%" }}
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
              <MenuItem onClick={() => handleUserMenuActions("/dashboard", "")}>
                {isLoggedIn && isAdmin && (
                  <Typography textAlign="center">Dashboard</Typography>
                )}
              </MenuItem>
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
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
            >
              {mode === "dark" ? <StyledDarkMode /> : <StyledLightMode />}
            </IconButton>
          </Box>
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
      </CustomToolbar>
    </CustomAppBar>
  );
};

export default Header;
