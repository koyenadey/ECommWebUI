import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MasterPage from "../master-page/MasterPage";

import { Box, Tab, Tabs, TextField } from "@mui/material";
import { StyledContainer } from "../../styles/styles";
import ProfileEditForm from "../profile/ProfileEditForm";
import AddressList from "../address/AddressList";
import { useAppDispatch } from "../../redux/store";
import fetchUserAddress from "../../redux/thunks/fetchUserAddress";
import { USER_ADDRESSURL, USER_DefADDRESSURL } from "../../constants";
import fetchDefaultAddress from "../../redux/thunks/fetchDefaultAddress";

const EditUser = () => {
  const { id } = useParams();
  const token = localStorage.getItem("refresh-token");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(
        fetchUserAddress({
          baseUrl: `${USER_ADDRESSURL}/user/${id}`,
          token: token,
        })
      );
      dispatch(
        fetchDefaultAddress({
          baseUrl: `${USER_ADDRESSURL}/default/${id}`,
          token,
        })
      );
    }
  }, [dispatch, token]);

  const [value, setValue] = useState("user-details");
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <MasterPage>
      <StyledContainer
        sx={{ width: "90%" }}
        component="div"
        aria-label="users"
        fixed
      >
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} aria-label="user details">
            <Tab value="user-details" label="User Details" wrapped />
            <Tab value="addresses" label="Addresses" />
          </Tabs>
        </Box>
        <Box>
          {value == "user-details" ? (
            <ProfileEditForm canEdit={setIsEditable} />
          ) : (
            <AddressList />
          )}
        </Box>
      </StyledContainer>
    </MasterPage>
  );
};

export default EditUser;
