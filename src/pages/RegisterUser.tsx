import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  TextFieldProps,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PhotoCameraIcon from "@mui/icons-material/PhotoCameraOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import modaMorphLogo from "../images/moda-morph.png";

import { useNavigate } from "react-router-dom";
import {
  FormInput,
  RegisterBoxFormItemsWrapper,
  RegisterBoxSigupMethodHeader,
  RegisterBoxSigupMethodWrapper,
  RegisterGridContainer,
  RegisterGridImageItemsWrapper,
  RegisterGridImageWrapper,
  StyledCreateAccountButton,
  StyledHeaderWelcomeBack,
  StyledImageUploadButton,
  StyledSignInSocialBtn,
  StyledSignupAvatar,
  StyledSignupButtonWrapperBox,
} from "../styles/styles";
import { useForm } from "react-hook-form";
import { RegisterFormType, UserType } from "../misc/type";
import { useAppDispatch } from "../redux/store";
import fetchUsers from "../redux/thunks/fetchUsers";
import { USER_CHECKMAIL, USER_GETURL, USER_LOGINURL } from "../constants";
import { useSelector } from "react-redux";
import { transformToFormDataUser } from "../utils/utils";
import checkEmailExists from "../redux/thunks/checkEmailExists";
import createUsers from "../redux/thunks/createUsers";
import createUserLogin from "../redux/thunks/createUserLogin";

const ErrorMessage = ({ message }: { message?: string }) =>
  message ? (
    <Typography color="red" variant="subtitle1">
      {message}
    </Typography>
  ) : (
    <></>
  );

const getFormFields = (
  props: TextFieldProps,
  fieldLabel: string,
  message?: string
) => {
  const finalProps: TextFieldProps = { ...props, type: "text" };
  if (fieldLabel === "Email address") {
    finalProps.type = "email";
  }
  if (fieldLabel === "Password") {
    finalProps.type = "password";
  }
  if (fieldLabel === "Avatar image") {
    finalProps.type = "file";
    finalProps.InputLabelProps = { shrink: true };
  }

  return (
    <FormControl fullWidth>
      <TextField
        {...finalProps}
        margin="normal"
        required
        fullWidth
        size="small"
        label={fieldLabel}
      />
      <ErrorMessage message={message} />
    </FormControl>
  );
};

const initialValues: RegisterFormType = {
  UserName: "",
  Email: "",
  Password: "",
  Avatar: undefined,
  AddresLine1: "",
  Street: "",
  City: "",
  Postcode: "",
  Country: "",
  PhoneNumber: "",
  Landmark: "",
};

const RegisterUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string>("");
  const [signupMethod, setSignupMethod] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({ defaultValues: initialValues });

  const token = localStorage.getItem("refresh_token");

  useEffect(() => {
    if (token) dispatch(fetchUsers({ baseUrl: USER_GETURL, token }));
  }, [dispatch]);

  const registerUserHandler = async (data: RegisterFormType) => {
    const formData = transformToFormDataUser(data);

    try {
      const userIfExist: boolean = await dispatch(
        checkEmailExists({ baseUrl: USER_CHECKMAIL, email: data.Email })
      ).unwrap();
      if (userIfExist)
        setError("User already exists! Please try with another email...");
      else {
        const result = await dispatch(
          createUsers({ baseUrl: USER_GETURL, user: formData })
        );
        if (result) {
          var result1 = await dispatch(
            createUserLogin({
              baseUrl: USER_LOGINURL,
              userData: { email: data.Email, password: data.Password },
            })
          );
          if (result1) {
            setError("");
            navigate("/");
          }
        }
      }
    } catch (err) {}
  };

  return (
    <RegisterGridContainer container>
      <RegisterGridImageWrapper item xs={0} sm={5} md={6}>
        <RegisterGridImageItemsWrapper item md={12}>
          <Box marginTop="30px">
            <img
              src={modaMorphLogo}
              alt="logo image"
              loading="lazy"
              style={{
                height: "200px",
                width: "200px",
                fontFamily: "Arial",
                fontSynthesisWeight: "auto",
              }}
            />
          </Box>
          <StyledHeaderWelcomeBack>
            Join us today and enjoy 10% discount!
          </StyledHeaderWelcomeBack>
        </RegisterGridImageItemsWrapper>
      </RegisterGridImageWrapper>
      <Grid item xs={12} sm={7} md={6}>
        <RegisterBoxFormItemsWrapper>
          {!signupMethod && (
            <RegisterBoxSigupMethodWrapper>
              <StyledSignupAvatar>
                <PersonAddAltIcon />
              </StyledSignupAvatar>
              <Typography
                textAlign="center"
                width="100%"
                fontSize="20px"
                fontWeight="800"
              >
                Sign up
              </Typography>
              <Typography textAlign="center" width="100%">
                Already have an account?{" "}
                <Link onClick={() => navigate("/login")}>Sign-in</Link> instead
              </Typography>
              <Grid container spacing={2} marginTop="10px">
                <Grid item xs={12}>
                  <StyledSignInSocialBtn
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    onClick={() => setSignupMethod("emailSignup")}
                    fullWidth
                  >
                    Continue with email
                  </StyledSignInSocialBtn>
                </Grid>
                <Grid item xs={12}>
                  <StyledSignInSocialBtn
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    fullWidth
                  >
                    Continue with Google
                  </StyledSignInSocialBtn>
                </Grid>
              </Grid>
            </RegisterBoxSigupMethodWrapper>
          )}
          {signupMethod && (
            <>
              <RegisterBoxSigupMethodHeader>
                <StyledSignupAvatar>
                  <PersonAddAltIcon />
                </StyledSignupAvatar>
                <Typography
                  fontWeight="800"
                  fontSize="20px"
                  width="100%"
                  textAlign="center"
                  color="#2172a1"
                >
                  Fill-in details to create account
                </Typography>
                <Typography color="#4e4e4e" fontSize="14px">
                  Fields marked with * are mandatory
                </Typography>
              </RegisterBoxSigupMethodHeader>
              <form noValidate onSubmit={handleSubmit(registerUserHandler)}>
                <Box width="100%">
                  {getFormFields(
                    {
                      ...register("UserName", {
                        required: "Cannot be empty",
                        minLength: {
                          value: 3,
                          message: "Cannot be less than 3",
                        },
                      }),
                    },
                    "User name",
                    errors?.UserName?.message
                  )}
                  {getFormFields(
                    {
                      ...register("Email", {
                        required: "Cannot be empty",
                        pattern: {
                          value:
                            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                          message: "Invalid email",
                        },
                      }),
                    },
                    "Email address",
                    errors?.Email?.message
                  )}
                  {getFormFields(
                    {
                      ...register("Password", {
                        required: "Cannot be empty",
                        minLength: {
                          value: 6,
                          message: "Cannot be less than 6",
                        },
                      }),
                    },
                    "Password",
                    errors?.Password?.message
                  )}
                  <Grid container columnSpacing={2}>
                    <Grid item md={6} xs={12}>
                      {getFormFields(
                        {
                          ...register("Street", {
                            required: "Cannot be empty",
                            minLength: {
                              value: 5,
                              message: "Cannot be less than 5",
                            },
                            maxLength: {
                              value: 20,
                              message: "Cannot be more than 20",
                            },
                          }),
                        },
                        "Street",
                        errors?.Street?.message
                      )}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {getFormFields(
                        {
                          ...register("AddresLine1", {
                            required: "Cannot be empty",
                            minLength: {
                              value: 5,
                              message: "Cannot be less than 5",
                            },
                          }),
                        },
                        "Address line",
                        errors?.AddresLine1?.message
                      )}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {getFormFields(
                        {
                          ...register("City", {
                            required: "Cannot be empty",
                            minLength: {
                              value: 5,
                              message: "Cannot be less than 5",
                            },
                            maxLength: {
                              value: 20,
                              message: "Cannot be more than 20",
                            },
                          }),
                        },
                        "City",
                        errors?.City?.message
                      )}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {getFormFields(
                        {
                          ...register("Landmark", {
                            required: "Cannot be empty",
                          }),
                        },
                        "Landmark",
                        errors?.Landmark?.message
                      )}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {getFormFields(
                        {
                          ...register("Postcode", {
                            required: "Cannot be empty",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Postcode must be a number",
                            },
                          }),
                        },
                        "PostCode",
                        errors?.Postcode?.message
                      )}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {getFormFields(
                        {
                          ...register("Country", {
                            required: "Cannot be empty",
                            minLength: {
                              value: 5,
                              message: "Cannot be less than 5",
                            },
                            maxLength: {
                              value: 20,
                              message: "Cannot be more than 20",
                            },
                          }),
                        },
                        "Country",
                        errors?.Country?.message
                      )}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {getFormFields(
                        {
                          ...register("PhoneNumber", {
                            required: "Cannot be empty",
                          }),
                        },
                        "PhoneNumber",
                        errors?.PhoneNumber?.message
                      )}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {getFormFields(
                        {
                          ...register("Avatar", {
                            required: "Upload an image",
                            validate: {
                              checkFileType: (value: FileList | undefined) => {
                                if (!value || !value[0])
                                  return "Upload an image";
                                const file = value[0];
                                return (
                                  file.type === "image/jpeg" ||
                                  file.type === "image/png" ||
                                  file.type === "image/jpg" ||
                                  "Only jpeg, jpg or png is supported"
                                );
                              },
                              checkFileSize: (value: FileList | undefined) => {
                                if (!value || !value[0])
                                  return "Upload an image";
                                return (
                                  value[0].size <= 1000000 ||
                                  "File size is too big"
                                );
                              },
                            },
                          }),
                        },
                        "Avatar image",
                        errors.Avatar?.message
                      )}
                    </Grid>
                  </Grid>

                  <StyledSignupButtonWrapperBox>
                    <ErrorMessage message={error} />
                    <StyledCreateAccountButton
                      type="submit"
                      variant="contained"
                    >
                      Create Account
                    </StyledCreateAccountButton>
                    <Button variant="text" sx={{ textTransform: "none" }}>
                      <Link
                        onClick={() => setSignupMethod(undefined)}
                        sx={{ textDecoration: "none" }}
                      >
                        Cancel and go back
                      </Link>
                    </Button>
                  </StyledSignupButtonWrapperBox>
                </Box>
              </form>
            </>
          )}
        </RegisterBoxFormItemsWrapper>
      </Grid>
    </RegisterGridContainer>
  );
};

export default RegisterUser;
