import React, { ReactNode, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { AppState, useAppDispatch } from "../../redux/store";

import Footer from "../footer/Footer";
import NavigationBar from "../navigation/NavBar";
import { useNavigate } from "react-router-dom";
import fetchAcessToken from "../../redux/thunks/fetchAccessToken";
import { ATOKEN_URL } from "../../constants";
import ActiveBreadcrumbs from "../breadcrumbs/ActiveBreadcrumbs";
import ThemeContext, { ThemeContextType } from "../../context/ThemeContext";

interface MasterPageProps {
  children: ReactNode;
}

const MasterPage = ({ children }: MasterPageProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const themeContextVal: ThemeContextType = {
    isDarkMode,
    setIsDarkMode,
  };

  const isLoggedIn = useSelector(
    (state: AppState) => state.userReducer.isLoggedIn
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const localRToken = localStorage.getItem("refresh-token");
  const token = {
    refreshToken: localRToken as string,
  };

  useEffect(() => {
    if (!isLoggedIn && localRToken) {
      dispatch(fetchAcessToken({ baseUrl: ATOKEN_URL, token }));
    } else {
      //navigate("/");
    }
  }, [dispatch, localRToken, isLoggedIn, navigate]);

  return (
    <ThemeContext.Provider value={themeContextVal}>
      <NavigationBar isLoggedIn={isLoggedIn} />
      <ActiveBreadcrumbs />
      {children}
      <Footer />
    </ThemeContext.Provider>
  );
};

export default MasterPage;
