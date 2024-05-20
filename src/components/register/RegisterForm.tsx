import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { TextField, Typography } from "@mui/material";

import { FormInput, RegisterContainer, SaveButton } from "../../styles/styles";
import { RegisterFormType, UserType } from "../../misc/type";
import { AppState, useAppDispatch } from "../../redux/store";
import fetchUsers from "../../redux/thunks/fetchUsers";
import { USER_GETURL, USER_LOGINURL } from "../../constants";
import createUsers from "../../redux/thunks/createUsers";
import { useSelector } from "react-redux";
import createUserLogin from "../../redux/thunks/createUserLogin";

const initialValues: RegisterFormType = {
  name: "",
  email: "",
  password: "",
  avatar: "",
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({ defaultValues: initialValues });

  const token = localStorage.getItem("refresh_token") ?? "";

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers({ baseUrl: USER_GETURL, token }));
  }, [dispatch]);

  const allUsers: UserType[] = useSelector(
    (state: AppState) => state.userReducer.users
  );

  const registerUserHandler = (data: RegisterFormType) => {
    const userIfExist: UserType | undefined = allUsers.find(
      (user) => user.email.toLowerCase() === data.email.toLowerCase()
    );
    if (userIfExist)
      setError("User already exists! Please try with another email...");
    else {
      dispatch(createUsers({ baseUrl: USER_GETURL, user: data }));
      dispatch(
        createUserLogin({
          baseUrl: USER_LOGINURL,
          userData: { email: data.email, password: data.password },
        })
      );
      setError("");
      navigate("/");
    }
  };

  return (
    <RegisterContainer>
      <Typography variant="h5">Create your Account</Typography>
      <form onSubmit={handleSubmit(registerUserHandler)}>
        <FormInput>
          <TextField
            {...register("name", {
              required: "Cannot be empty",
              minLength: {
                value: 3,
                message: "Cannot be less than 3",
              },
            })}
            fullWidth
            variant="standard"
            type="text"
            label="Name"
          />
          <Typography color="red" variant="subtitle1">
            {errors?.name?.message}
          </Typography>
        </FormInput>
        <FormInput>
          <TextField
            {...register("email", {
              required: "Cannot be empty",
              pattern: {
                value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                message: "Invalid email",
              },
            })}
            fullWidth
            variant="standard"
            type="email"
            label="Email"
          />
          <Typography color="red" variant="subtitle1">
            {errors?.email?.message}
          </Typography>
        </FormInput>
        <FormInput>
          <TextField
            {...register("password", {
              required: "Cannot be empty",
              minLength: {
                value: 6,
                message: "Cannot be less than 6",
              },
            })}
            fullWidth
            variant="standard"
            type="password"
            label="Password"
          />
          <Typography color="red" variant="subtitle1">
            {errors?.password?.message}
          </Typography>
        </FormInput>
        <FormInput>
          <TextField
            {...register("avatar", {
              required: "Cannot be empty",
            })}
            fullWidth
            variant="standard"
            type="text"
            label="Avatar"
          />
          <Typography color="red" variant="subtitle1">
            {errors?.avatar?.message}
          </Typography>
        </FormInput>
        <FormInput>
          <SaveButton type="submit" value="CONTINUE" />
        </FormInput>
      </form>
      <Typography variant="body1" color="red">
        {error}
      </Typography>
    </RegisterContainer>
  );
};

export default RegisterForm;
