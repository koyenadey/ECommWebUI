import { useSelector } from "react-redux";

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
  const editRoleHandler = (id: number) => {};

  const users: UserType[] = useSelector(
    (state: AppState) => state.userReducer.users
  );

  return (
    <List>
      {users.map((user) => (
        <Box component="article" key={user.id} alignContent="center">
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.avatar} />
            </ListItemAvatar>
            <StyledListItem>{user.name}</StyledListItem>
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
