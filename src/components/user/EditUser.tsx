import react, { useState } from "react";
import { useParams } from "react-router-dom";

import MasterPage from "../master-page/MasterPage";
import EditAddress from "./EditAddress";

import { Box, Tab, Tabs, TextField } from "@mui/material";
import { StyledContainer } from "../../styles/styles";
import ProfileEditForm from "../profile/ProfileEditForm";

const EditUser = () => {
  const { id } = useParams();
  const [value, setValue] = useState("user-details");
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <MasterPage>
      <StyledContainer
        sx={{ width: "50%" }}
        component="div"
        aria-label="users"
        fixed
      >
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} aria-label="user details">
            <Tab value="user-details" label="User Details" wrapped />
            <Tab value="addresses" label="Addresses" />
            <Tab value="three" label="Item Three" />
          </Tabs>
        </Box>
        <Box>
          {value == "user-details" ? (
            <ProfileEditForm canEdit={setIsEditable} />
          ) : (
            <EditAddress id={id ?? ""} />
          )}
        </Box>
      </StyledContainer>
    </MasterPage>
  );
};

export default EditUser;
