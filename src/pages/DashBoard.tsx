import React, { useEffect, useState } from "react";

import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";

import useFetchProducts from "../hook/useFetchProducts";
import UserList from "../components/user/UserList";
import ProductsList from "../components/products/ProductsList";
import useFetchUsers from "../hook/useFetchUsers";
import MasterPage from "../components/master-page/MasterPage";
import { AppState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import fetchUser from "../redux/thunks/fetchUser";
import { LOGGEDIN_USERURL } from "../constants";
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
      <Box margin="2%" aria-label="products">
        <Typography
          variant="h4"
          fontWeight="600"
          textAlign="center"
          color="#2272a1"
        >
          Admin dashboard - Manage your data, easily!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Tabs
            value={value}
            onChange={changeTabHandler}
            textColor="inherit"
            indicatorColor="primary"
            sx={{ fontWeight: "700" }}
          >
            <Tab value="users" label="Manage user List" />
            <Tab value="products" label="Manage product List" />
          </Tabs>
        </Box>
        <Divider
          sx={{
            borderWidth: "1px",
            marginTop: "-1px",
            marginBottom: "50px",
            width: "100%",
          }}
        />

        <Box>{value === "users" ? <UserList /> : <ProductsList />}</Box>
      </Box>
    </MasterPage>
  );
};

export default Dashboard;
