import { useSelector } from "react-redux";

import {
  List,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  Divider,
} from "@mui/material";

import { UserType } from "../../misc/type";
import { AppState } from "../../redux/store";

import { StyledListItem } from "../../styles/styles";
import EditIcon from "@mui/icons-material/Edit";

const UserList = () => {
  const editRoleHandler = (id: number) => {
    console.log(id);
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
              <Avatar alt={user.name} src={user.avatar} />
            </ListItemAvatar>
            <StyledListItem>{user.name}</StyledListItem>
            <StyledListItem>{user.email}</StyledListItem>
            <StyledListItem>{user.role}</StyledListItem>
            <ListItemIcon onClick={() => editRoleHandler(user.id)}>
              <EditIcon />
            </ListItemIcon>
          </ListItem>
          <Divider />
        </Box>
      ))}
    </List>
  );
};

export default UserList;
