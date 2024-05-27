import { ReactNode, useContext, useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import getTheme from "../../styles/customTheme";

import { useSelector } from "react-redux";

import { AppState, useAppDispatch } from "../../redux/store";

import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import { setToken } from "../../redux/slices/userSlice";
import Header from "../home/Header";
import Footer from "../home/Footer";
import fetchAllCategories from "../../redux/thunks/fetchAllCategories";
import { CATGET_URL } from "../../constants";

interface MasterPageProps {
  children: ReactNode;
}

const MasterPage = ({ children }: MasterPageProps) => {
  const themeContext = useContext(ThemeContext);

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
    if (!isLoggedIn && !localRToken) {
      dispatch(setToken(token.refreshToken));
      dispatch(fetchAllCategories(CATGET_URL));
    }
  }, [dispatch, localRToken, isLoggedIn, navigate]);

  return (
    <ThemeProvider theme={getTheme(themeContext.mode)}>
      <Header
        isLoggedIn={isLoggedIn}
        mode={themeContext.mode}
        toggleColorMode={themeContext.toggleMode}
      />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default MasterPage;
