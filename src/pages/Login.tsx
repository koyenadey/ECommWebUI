import {
  IconButton,
  Avatar,
  Container,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { CreateAccountBtn } from "../styles/styles";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppState, useAppDispatch } from "../redux/store";

import { USER_LOGINURL } from "../constants";

import createUserLogin from "../redux/thunks/createUserLogin";
import { useSelector } from "react-redux";

import { SaveButton } from "../styles/styles";
import Logo from "../images/Mtrans.png";

type InitialValues = {
  email: string;
  password: string;
};

const initialValues: InitialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoggedIn: boolean = useSelector(
    (state: AppState) => state.userReducer.isLoggedIn
  );

  const error: string = useSelector(
    (state: AppState) => state.userReducer.error
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const submitHandler = (data: InitialValues) => {
    dispatch(createUserLogin({ baseUrl: USER_LOGINURL, userData: data }));
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate, error]);

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={() => navigate("/")}>
          <Avatar
            sx={{ width: 56, height: 56, margin: "15% 45%", cursor: "default" }}
            variant="square"
            src={Logo}
          />
        </IconButton>
        <CreateAccountBtn variant="text" onClick={() => navigate("/register")}>
          CREATE ACCOUNT
        </CreateAccountBtn>
      </Box>
      <Typography variant="h4">Log in to ModaMorph</Typography>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Box>
          <FormControl fullWidth>
            <TextField
              {...register("email", {
                required: "Email cannot be empty",
                pattern: {
                  value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: "Incorrect email",
                },
              })}
              id="user-mail"
              variant="standard"
              label="Email"
            />
            <Typography color="red">{errors.email?.message}</Typography>
          </FormControl>
          <br />
          <FormControl fullWidth>
            <TextField
              {...register("password", {
                required: "Password cannot be empty",
                minLength: {
                  value: 5,
                  message: "Password cannot be less than 5 charecters!",
                },
              })}
              id="user-password"
              variant="standard"
              label="Password"
              type="password"
            />
            <Typography color="red">{errors.password?.message}</Typography>
          </FormControl>
          <br />
          <br />
          <SaveButton type="submit" value="SUBMIT" />
        </Box>
      </form>
      {error && (
        <Typography variant="h6" color="error">
          Incorrect credentials. Please try again!
        </Typography>
      )}
    </Container>
  );
};

export default Login;
