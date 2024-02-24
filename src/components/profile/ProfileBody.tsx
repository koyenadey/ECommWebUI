import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

import { TableBody, TableCell, TableRow, Typography } from "@mui/material";

const ProfileBody = () => {
  const userData = useSelector((state: AppState) => state.userReducer.user);

  const dataInputName = <Typography>{userData?.name}</Typography>;

  const dataInputMail = <Typography>{userData?.email}</Typography>;

  return (
    <TableBody>
      <TableRow>
        <TableCell align="left">Name</TableCell>
        <TableCell align="right">{dataInputName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">Email</TableCell>
        <TableCell align="right">{dataInputMail}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">Role</TableCell>
        <TableCell align="right">{userData?.role}</TableCell>
      </TableRow>
    </TableBody>
  );
};

export default ProfileBody;
