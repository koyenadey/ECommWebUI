import { TableCell, TableHead, TableRow } from "@mui/material";
import { StyledProfileHeader } from "../../styles/styles";

const ProfileHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" colSpan={2}>
          <StyledProfileHeader variant="h6">
            Profile Details
          </StyledProfileHeader>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
export default ProfileHeader;
