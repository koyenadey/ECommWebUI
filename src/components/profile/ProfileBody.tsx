import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

import { TableBody, TableRow, Typography } from "@mui/material";
import { StyledTableCell } from "../../styles/styles";

const ProfileBody = () => {
  const userData = useSelector((state: AppState) => state.userReducer.user);

  const dataInputName = <Typography>{userData?.name}</Typography>;

  const dataInputMail = <Typography>{userData?.email}</Typography>;

  return (
    <TableBody>
      <TableRow>
        <StyledTableCell align="left">Name</StyledTableCell>
        <StyledTableCell align="right">{dataInputName}</StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell align="left">Email</StyledTableCell>
        <StyledTableCell align="right">{dataInputMail}</StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell align="left">Role</StyledTableCell>
        <StyledTableCell align="right">{userData?.role}</StyledTableCell>
      </TableRow>
    </TableBody>
  );
};

export default ProfileBody;
