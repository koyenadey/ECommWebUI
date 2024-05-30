import { Button, Chip, Divider, FormControl, styled } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import FacebookIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import modaMorphLogo from "../images/moda-morph.png";
import modaMorphModel from "../images/model1.jpg";

import { useForm } from "react-hook-form";
import { AppState, useAppDispatch } from "../redux/store";
import createUserLogin from "../redux/thunks/createUserLogin";
import { USER_LOGINURL } from "../constants";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  HeaderLoginBody,
  StyledCreateAccountBox,
  StyledHeaderWelcomeBack,
  StyledLoginHeader,
  StyledLoginImage,
  StyledLoginImgGrid,
  StyledLoginSignupHeader,
  StyledMainGrid,
  StyledSignInBox,
  StyledSignInButton,
  StyledSignInSocialBtn,
} from "../styles/styles";

type InitialValues = {
  email: string;
  password: string;
};

const initialValues: InitialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    <StyledMainGrid container component="main">
      <StyledLoginImgGrid item xs={0} sm={5} md={6}>
        <Grid item md={12}>
          <Box sx={{ mt: "50px", textAlign: "center" }}>
            <img
              src={modaMorphLogo}
              alt="logo image"
              loading="lazy"
              style={{ height: "150px", width: "150px" }}
            />
          </Box>
          <StyledHeaderWelcomeBack component="h1">
            Welcome back!
          </StyledHeaderWelcomeBack>
          <HeaderLoginBody component="h4">
            Log in now and unlock exclusive access to personalized content,
            features, and benefits. Don’t have an account? Sign up today!
          </HeaderLoginBody>
        </Grid>
      </StyledLoginImgGrid>
      <Grid item xs={12} sm={7} md={6}>
        <StyledLoginHeader>
          <Avatar sx={{ bgcolor: "#2172a1" }}>
            <LockOutlinedIcon />
          </Avatar>
          <StyledLoginImage component="h1">Sign in</StyledLoginImage>
          <StyledLoginSignupHeader component="h1">
            Dont have an account yet?{" "}
            <Link onClick={() => navigate("/register")}>Sign-up</Link> here
          </StyledLoginSignupHeader>
          <Box>
            <form onSubmit={handleSubmit(submitHandler)}>
              <FormControl fullWidth>
                <TextField
                  {...register("email", {
                    required: "Email cannot be empty",
                    pattern: {
                      value:
                        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                      message: "Incorrect email",
                    },
                  })}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  size="small"
                />
                <Typography color="red">{errors.email?.message}</Typography>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  {...register("password", {
                    required: "Password cannot be empty",
                    minLength: {
                      value: 5,
                      message: "Password cannot be less than 5 charecters!",
                    },
                  })}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                />
              </FormControl>
              {error && (
                <Typography color="error">
                  Incorrect credentials. Please try again!
                </Typography>
              )}
              <StyledCreateAccountBox>
                <Link
                  onClick={() => navigate("/register")}
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                >
                  Create an account
                </Link>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </StyledCreateAccountBox>
              <StyledSignInBox>
                <StyledSignInButton type="submit" variant="contained">
                  Sign In
                </StyledSignInButton>
                <Button variant="text" sx={{ textTransform: "none" }}>
                  <Link
                    onClick={() => navigate("/")}
                    sx={{ textDecoration: "none", mt: 0 }}
                  >
                    Cancel and go back
                  </Link>
                </Button>
              </StyledSignInBox>
            </form>
          </Box>
          <Box width="100%">
            <Divider>
              <Chip label="Or" size="small" />
            </Divider>
            <Grid container spacing={2} marginTop="10px">
              <Grid item xs={12} xl={12}>
                <StyledSignInSocialBtn
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  fullWidth
                >
                  Sign in with Google
                </StyledSignInSocialBtn>
              </Grid>
              <Grid item xs={12} xl={12}>
                {/*<StyledSignInSocialBtn
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  fullWidth
                >
                  Sign in with Facebook
                </StyledSignInSocialBtn>*/}
              </Grid>
            </Grid>
          </Box>
        </StyledLoginHeader>
      </Grid>
    </StyledMainGrid>
  );
};
export default Login;
