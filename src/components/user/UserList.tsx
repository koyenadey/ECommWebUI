import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  List,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
} from "@mui/material";

import { UserType } from "../../misc/type";
import { AppState } from "../../redux/store";

import {
  StyledDivider,
  StyledEditIcon,
  StyledListItem,
} from "../../styles/styles";

const UserList = () => {
  const navigate = useNavigate();

  const editRoleHandler = (id: string) => {
    console.log(id);
    navigate(`/dashboard/${"edit"}/users/${id}`);
  };

  const users: UserType[] = useSelector(
    (state: AppState) => state.userReducer.users
  );

  return (
    <List>
      {users.map((user) => (
        <Box component="article" key={user.id} alignContent="center">
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={user.userName} src={user.avatar} />
            </ListItemAvatar>
            <StyledListItem>{user.userName}</StyledListItem>
            <StyledListItem>{user.email}</StyledListItem>
            <StyledListItem>{user.role}</StyledListItem>
            <ListItemIcon onClick={() => editRoleHandler(user.id)}>
              <StyledEditIcon />
            </ListItemIcon>
          </ListItem>
          <StyledDivider />
        </Box>
      ))}
    </List>
  );
};

export default UserList;
