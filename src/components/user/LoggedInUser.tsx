import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

import { Avatar } from "@mui/material";
import { CustomAvatar } from "../../styles/styles";

const LoggedInUser = () => {
  const userData = useSelector((state: AppState) => state.userReducer.user);
  return (
    <CustomAvatar
      alt={userData ? userData.userName : "user-name"}
      src={userData ? userData.avatar : ""}
      sx={{ width: 56, height: 56 }}
    />
  );
};

export default LoggedInUser;
