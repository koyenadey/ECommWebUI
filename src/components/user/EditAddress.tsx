import {
  Avatar,
  Box,
  Button,
  Divider,
  InputLabel,
  TextField,
} from "@mui/material";
import react, { useState } from "react";
import { AppState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

interface EditUserDetailsProps {
  id: string;
}

const EditAddress = ({ id }: EditUserDetailsProps) => {
  const dispatch = useAppDispatch();
  const currentUserData = useSelector((state: AppState) =>
    state.userReducer.users.find((user) => user.id === id)
  );
  const [username, setUsername] = useState(currentUserData?.userName);

  const editUserDetailsHandler = (event: react.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ margin: "2%" }}>
      <form onSubmit={editUserDetailsHandler}>
        <InputLabel htmlFor="username">UserName</InputLabel>
        <TextField
          variant="outlined"
          id="username"
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(event?.target?.value)
          }
        />
        <Divider sx={{ margin: "1%" }} />
        <InputLabel>Avatar</InputLabel>
        <Avatar
          alt={currentUserData ? currentUserData.avatar : "user-name"}
          src={currentUserData ? currentUserData.avatar : "U"}
          sx={{ width: 56, height: 56, margin: "2%" }}
        />
        <TextField type="file" />
        <Divider sx={{ margin: "1%" }} />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default EditAddress;
