import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import fetchUserAddress from "../redux/thunks/fetchUserAddress";

import fetchUser from "../redux/thunks/fetchUser";
import { CATGET_URL, LOGGEDIN_USERURL, USER_ADDRESSURL } from "../constants";
import fetchAllCategories from "../redux/thunks/fetchAllCategories";
import MasterPage from "../components/master-page/MasterPage";
import Home from "../components/home/Home";
import { Box, styled } from "@mui/system";
import BannerImage from "../images/BannerImage.jpeg";
import fetchDefaultAddress from "../redux/thunks/fetchDefaultAddress";

export const BackgroundImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  backgroundImage: `url(${BannerImage})`,
  zIndex: -1,
  backgroundPosition: "right",
  [theme.breakpoints.down("sm")]: {
    backgroundPosition: "center",
  },
}));

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const refreshToken = localStorage.getItem("refresh-token");

  useEffect(() => {
    if (refreshToken) {
      dispatch(fetchUser({ baseUrl: LOGGEDIN_USERURL, token: refreshToken }));
      dispatch(
        fetchUserAddress({ baseUrl: USER_ADDRESSURL, token: refreshToken })
      );
      dispatch(fetchAllCategories(CATGET_URL));
    }
  }, [dispatch, refreshToken]);

  return (
    <>
      <BackgroundImage />
      <MasterPage>
        <Home />
      </MasterPage>
    </>
  );
};

export default HomePage;
