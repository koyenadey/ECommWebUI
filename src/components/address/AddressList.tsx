import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddressCard from "./AddressCard";
import { AddressType } from "../../misc/type";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const AddressList = () => {
  const navigate = useNavigate();

  const addresses: AddressType[] = useSelector(
    (state: AppState) => state.userReducer.addresses
  );

  const [isChecked, setIsChecked] = useState<string>();

  const handleRadioChange = (id: string) => {
    setIsChecked(id);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1">
        Your Addresses
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            aria-label="Add new address"
            sx={{
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Button
                startIcon={<AddIcon />}
                aria-label="Add new address"
                sx={{ height: "100%", width: "100%", textTransform: "none" }}
                onClick={() => navigate("/address/create")}
              >
                Add address
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {addresses.map((address, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AddressCard
              isChecked={address.id === isChecked}
              handleRadioChange={handleRadioChange}
              address={address}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AddressList;
