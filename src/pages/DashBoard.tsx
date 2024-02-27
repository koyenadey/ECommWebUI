import React, { useState } from "react";

import { Box, Container, Tab, Tabs, Typography } from "@mui/material";

import useFetchProducts from "../hook/useFetchProducts";
import UserList from "../components/user/UserList";
import ProductsList from "../components/products/ProductsList";
import useFetchUsers from "../hook/useFetchUsers";
import MasterPage from "../components/master-page/MasterPage";

const Dashboard = () => {
  useFetchUsers();
  useFetchProducts();

  const [value, setValue] = useState<string>("users");

  const changeTabHandler = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <MasterPage>
      <Container
        component="div"
        aria-label="products"
        sx={{ border: "1px solid black", margin: "2%" }}
      >
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
      </Container>
    </MasterPage>
  );
};

export default Dashboard;
