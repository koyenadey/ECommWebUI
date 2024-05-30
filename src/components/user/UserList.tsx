import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  List,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  IconButton,
  Card,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@mui/material";

import { UserType } from "../../misc/type";
import { AppState } from "../../redux/store";

import {
  StyledDivider,
  StyledEditIcon,
  StyledListItem,
  StyledTableHeader,
} from "../../styles/styles";
import EditIcon from "@mui/icons-material/Edit";

const UserList = () => {
  const navigate = useNavigate();

  const editRoleHandler = (id: string) => {
    navigate(`/dashboard/${"edit"}/users/${id}`);
  };

  const users: UserType[] = useSelector(
    (state: AppState) => state.userReducer.users
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card sx={{ maxWidth: "750px", width: "80%" }}>
        <Box sx={{ overflowX: "auto", width: "100%" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <StyledTableHeader>Avatar</StyledTableHeader>
                <StyledTableHeader>User name</StyledTableHeader>
                <StyledTableHeader>User email</StyledTableHeader>
                <StyledTableHeader>User role</StyledTableHeader>
                <StyledTableHeader>Manage</StyledTableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow hover key={user.id}>
                    <TableCell>
                      <Avatar
                        alt={user.userName}
                        src={user.avatar}
                        sx={{ width: "80px", height: "80px" }}
                      />
                    </TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => editRoleHandler(user.id)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
};

export default UserList;
