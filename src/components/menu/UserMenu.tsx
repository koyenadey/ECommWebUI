import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

interface UserMenuProps {
  isLoggedIn: boolean;
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: (value: string) => void;
}
const menuProps = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

const UserMenu = (props: UserMenuProps) => {
  const { anchorEl, open, handleClose, isLoggedIn } = props;
  const LogOutIn = isLoggedIn ? "LogOut" : "LogIn";
  const isAdmin =
    useSelector((state: AppState) => state.userReducer.user?.role) === "admin"
      ? true
      : false;
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={() => handleClose("Close")}
      onClick={() => handleClose("Close")}
      PaperProps={{
        elevation: 0,
        sx: menuProps,
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {isLoggedIn && (
        <MenuItem onClick={() => handleClose("Profile")}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
      )}
      {isAdmin && (
        <MenuItem onClick={() => handleClose("Dashboard")}>
          <ListItemIcon>
            <SupervisorAccountIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
      )}
      <Divider />
      <MenuItem onClick={() => handleClose("About Us")}>
        <ListItemIcon>
          <InfoIcon fontSize="small" />
        </ListItemIcon>
        About Us
      </MenuItem>
      <MenuItem onClick={() => handleClose("Shipping & Returns")}>
        <ListItemIcon>
          <LocalShippingIcon fontSize="small" />
        </ListItemIcon>
        Shipping & Returns
      </MenuItem>
      <MenuItem onClick={() => handleClose("Customer Care")}>
        <ListItemIcon>
          <SupportAgentIcon fontSize="small" />
        </ListItemIcon>
        Customer Care
      </MenuItem>
      <MenuItem onClick={() => handleClose(LogOutIn)}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        {LogOutIn}
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
