import { useEffect, useState } from "react";

import MasterPage from "../components/master-page/MasterPage";

import ProfileEditForm from "../components/profile/ProfileEditForm";
import ProfileDisplayForm from "../components/profile/ProfileDisplayForm";
import useFetchToken from "../hook/useFetchUser";
import { Box, Tab, Tabs } from "@mui/material";
import { StyledContainer } from "../styles/styles";
import AddressList from "../components/address/AddressList";
import { AppState, useAppDispatch } from "../redux/store";
import fetchUserAddress from "../redux/thunks/fetchUserAddress";
import { USER_ADDRESSURL } from "../constants";
import fetchDefaultAddress from "../redux/thunks/fetchDefaultAddress";
import { useSelector } from "react-redux";

const Profile = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const userId: string =
    useSelector((state: AppState) => state.userReducer.user?.id) ?? "";

  const dispatch = useAppDispatch();

  const token = localStorage.getItem("refresh-token") ?? "";

  useFetchToken();

  useEffect(() => {
    dispatch(fetchUserAddress({ baseUrl: USER_ADDRESSURL, token }));
    dispatch(
      fetchDefaultAddress({
        baseUrl: `${USER_ADDRESSURL}/default/${userId}`,
        token,
      })
    );
  }, [dispatch, token, userId]);

  const editProfileHandler = () => {
    setIsEditable((prev) => !prev);
  };
  const buttonText = isEditable ? "Save" : "Edit Profile";

  const [value, setValue] = useState<string>("user");

  const changeTabHandler = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <MasterPage>
      <StyledContainer component="div" aria-label="user-profiles">
        <Tabs
          value={value}
          onChange={changeTabHandler}
          textColor="inherit"
          indicatorColor="primary"
        >
          <Tab value="user" label="User" />
          <Tab value="addresses" label="Addresses" />
        </Tabs>
        <Box>
          {isEditable && value === "user" ? (
            <ProfileEditForm canEdit={setIsEditable} />
          ) : !isEditable && value === "user" ? (
            <ProfileDisplayForm
              buttonText={buttonText}
              onSave={editProfileHandler}
            />
          ) : (
            <AddressList />
          )}
        </Box>
      </StyledContainer>
    </MasterPage>
  );
};

export default Profile;
