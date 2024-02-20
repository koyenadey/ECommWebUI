import { useNavigate } from "react-router-dom";

import { StyledLink, NavBar, StyledMenuIcon } from "../../styles/styles";
import { Box, Toolbar, IconButton, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import Logo from "../../images/M.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <NavBar position="fixed">
        <Toolbar>
          <IconButton onClick={() => navigate("/")}>
            <Avatar variant="square" src={Logo}>
              Home
            </Avatar>
          </IconButton>
          <StyledLink to="/products">Products</StyledLink>
          <Box>
            <IconButton onClick={() => navigate("/login")}>
              <PersonIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton>
              <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
            >
              <StyledMenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </NavBar>
    </Box>
  );
};

export default Navbar;
