import React, { ReactNode, useEffect } from "react";

import { useSelector } from "react-redux";

import { AppState, useAppDispatch } from "../../redux/store";

import Footer from "../footer/Footer";
import NavigationBar from "../navigation/NavBar";
import { useNavigate } from "react-router-dom";
import fetchAcessToken from "../../redux/thunks/fetchAccessToken";
import { LOGGEDIN_USERURL } from "../../constants";

interface MasterPageProps {
  children: ReactNode;
}

const MasterPage = ({ children }: MasterPageProps) => {
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
      dispatch(fetchAcessToken({ baseUrl: LOGGEDIN_USERURL, token }));
    } else {
      //navigate("/");
    }
  }, [dispatch, localRToken, isLoggedIn, navigate]);

  return (
    <>
      <NavigationBar isLoggedIn={isLoggedIn} />
      {children}
      <Footer />
    </>
  );
};

export default MasterPage;
