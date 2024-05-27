import { useEffect } from "react";
import { useSelector } from "react-redux";

import fetchUser from "../../redux/thunks/fetchUser";
import { AppState, useAppDispatch } from "../../redux/store";

import Home1 from "../../components/archive/Home1";
import MasterPage from "../../components/master-page/MasterPage";
import { LOGGEDIN_USERURL, USER_ADDRESSURL } from "../../constants";
import fetchUserAddress from "../../redux/thunks/fetchUserAddress";
//import fetchAcessToken from "../redux/thunks/fetchAccessToken";

const HomePage1 = () => {
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
      dispatch(
        fetchUserAddress({ baseUrl: USER_ADDRESSURL, token: refreshToken })
      );
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
      <Home1 />
    </MasterPage>
  );
};

export default HomePage1;
