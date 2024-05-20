import { useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import fetchUsers from "../redux/thunks/fetchUsers";
import { USER_GETURL } from "../constants";

const useFetchUsers = () => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("refresh-token") ?? "";

  useEffect(() => {
    dispatch(fetchUsers({ baseUrl: USER_GETURL, token }));
  }, [dispatch]);
};

export default useFetchUsers;
