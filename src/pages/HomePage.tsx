import { useEffect } from "react";
import { useSelector } from "react-redux";

import fetchUser from "../redux/thunks/fetchUser";
import { AppState, useAppDispatch } from "../redux/store";

import Home from "../components/home/Home";
import MasterPage from "../components/master-page/MasterPage";
import { LOGGEDIN_USERURL } from "../constants";
//import fetchAcessToken from "../redux/thunks/fetchAccessToken";

const HomePage = () => {
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
      //dispatch(fetchAcessToken({ baseUrl: ATOKEN_URL, token }));
    }
    //  else {
    //   if (accessToken) {
    //     dispatch(fetchUser({ baseUrl: LOGGEDIN_USERURL, token: accessToken }));
    //   }
    // }
  }, [dispatch /*accessToken*/, refreshToken]);

  return (
    <MasterPage>
      <Home />
    </MasterPage>
  );
};

export default HomePage;
