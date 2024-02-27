import { useEffect } from "react";

import fetchUser from "../redux/thunks/fetchUser";
import { LOGGEDIN_USERURL } from "../constants";
import { AppState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";

const useFetchUser = () => {
  const dispatch = useAppDispatch();

  const accessToken = useSelector(
    (state: AppState) => state.userReducer.tokens.access_token
  );

  useEffect(() => {
    if (localStorage.getItem("refresh-token"))
      dispatch(fetchUser({ baseUrl: LOGGEDIN_USERURL, token: accessToken }));
  }, [dispatch, accessToken]);
};

export default useFetchUser;
