import React, { useEffect, useState } from "react";

import { Box, Container, Tab, Tabs, Typography } from "@mui/material";

import useFetchProducts from "../hook/useFetchProducts";
import UserList from "../components/user/UserList";
import ProductsList from "../components/products/ProductsList";
import useFetchUsers from "../hook/useFetchUsers";
import MasterPage from "../components/master-page/MasterPage";
import { AppState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import fetchUser from "../redux/thunks/fetchUser";
import { ATOKEN_URL, LOGGEDIN_USERURL } from "../constants";
import fetchAcessToken from "../redux/thunks/fetchAccessToken";
import { StyledContainer } from "../styles/styles";

const Dashboard = () => {
  useFetchUsers();
  useFetchProducts();

  const dispatch = useAppDispatch();
  // const accessToken = useSelector(
  //   (state: AppState) => state.userReducer.tokens.access_token
  // );
  const refreshToken = localStorage.getItem("refresh-token");
  const token = {
    refreshToken: refreshToken ?? "",
  };
  useEffect(() => {
    if (refreshToken) {
      dispatch(fetchUser({ baseUrl: LOGGEDIN_USERURL, token: refreshToken }));
    }
  }, [dispatch, , refreshToken]);

  const [value, setValue] = useState<string>("users");

  const changeTabHandler = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <MasterPage>
      <StyledContainer component="div" aria-label="products">
        <Typography variant="h4">
          {value[0].toUpperCase().concat(value.substring(1))} List
        </Typography>
        <Tabs
          value={value}
          onChange={changeTabHandler}
          textColor="inherit"
          indicatorColor="primary"
        >
          <Tab value="users" label="User" />
          <Tab value="products" label="Products" />
        </Tabs>
        <Box>{value === "users" ? <UserList /> : <ProductsList />}</Box>
      </StyledContainer>
    </MasterPage>
  );
};

export default Dashboard;
