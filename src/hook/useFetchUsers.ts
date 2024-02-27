import { useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import fetchUsers from "../redux/thunks/fetchUsers";
import { USER_GETURL } from "../constants";

const useFetchUsers = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers(USER_GETURL));
  }, [dispatch]);
};

export default useFetchUsers;
