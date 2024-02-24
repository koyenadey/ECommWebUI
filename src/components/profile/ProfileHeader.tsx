import { TableCell, TableHead, TableRow, Typography } from "@mui/material";

const ProfileHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" colSpan={2}>
          <Typography variant="h6">Profile Details</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
export default ProfileHeader;
