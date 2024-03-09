import { useEffect } from "react";
import { useSelector } from "react-redux";

import fetchUser from "../redux/thunks/fetchUser";
import { AppState, useAppDispatch } from "../redux/store";

import Home from "../components/home/Home";
import MasterPage from "../components/master-page/MasterPage";
import { ATOKEN_URL, LOGGEDIN_USERURL } from "../constants";
import fetchAcessToken from "../redux/thunks/fetchAccessToken";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const accessToken = useSelector(
    (state: AppState) => state.userReducer.tokens.access_token
  );
  const refreshToken = localStorage.getItem("refresh-token");
  const token = {
    refreshToken: refreshToken ?? "",
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUser({ baseUrl: LOGGEDIN_USERURL, token: accessToken }));
    } else {
      if (refreshToken) {
        dispatch(fetchAcessToken({ baseUrl: ATOKEN_URL, token }));
      }
    }
  }, [dispatch, accessToken, refreshToken]);

  return (
    <MasterPage>
      <Home />
    </MasterPage>
  );
};

export default HomePage;
