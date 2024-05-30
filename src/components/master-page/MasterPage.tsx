import React, { ReactNode, useContext, useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import getTheme from "../../styles/customTheme";

import { useSelector } from "react-redux";

import { AppState, useAppDispatch } from "../../redux/store";

import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/slices/userSlice";
import Header from "../home/Header";
import fetchAllCategories from "../../redux/thunks/fetchAllCategories";
import { CATGET_URL, ORDER_GETURL } from "../../constants";
import BannerImage from "../../images/BannerImage.jpeg";
import { BackgroundImage } from "../../styles/styles";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import fetchOrders from "../../redux/thunks/fetchOrders";
import AppFooter from "../home/AppFooter";

interface MasterPageProps {
  children: ReactNode;
}

const MasterPage = ({ children }: MasterPageProps) => {
  const isLoggedIn = useSelector(
    (state: AppState) => state.userReducer.isLoggedIn
  );
  const themeMode = useSelector(
    (state: AppState) => state.userReducer.themeMode
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const localRToken = localStorage.getItem("refresh-token");
  const token = {
    refreshToken: localRToken as string,
  };

  useEffect(() => {
    if (!isLoggedIn && !localRToken) {
      dispatch(setToken(token.refreshToken));
      dispatch(fetchAllCategories(CATGET_URL));
    } else {
      dispatch(
        fetchOrders({ baseUrl: ORDER_GETURL, token: token.refreshToken })
      );
    }
  }, [dispatch, localRToken, isLoggedIn, navigate]);

  return (
    <Box>
      <Header isLoggedIn={isLoggedIn} mode={themeMode} />
      {children}
      <AppFooter />
    </Box>
  );
};

export default MasterPage;
