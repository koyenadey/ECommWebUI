import { TableContainer, Table } from "@mui/material";
import { EditButton } from "../../styles/styles";
import ProfileBody from "./ProfileBody";
import ProfileHeader from "./ProfileHeader";

interface DisplayForm {
  buttonText: string;
  onSave: () => void;
}

const ProfileDisplayForm = ({ buttonText, onSave }: DisplayForm) => {
  return (
    <TableContainer sx={{ margin: "15% auto", width: "50%" }}>
      <Table>
        <ProfileHeader />
        <ProfileBody />
      </Table>
      <EditButton onClick={onSave}>{buttonText}</EditButton>
    </TableContainer>
  );
};

export default ProfileDisplayForm;
