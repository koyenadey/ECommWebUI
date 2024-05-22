import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FormHelperText, TextField, Typography } from "@mui/material";

import { FormInput, RegisterContainer, SaveButton } from "../../styles/styles";
import { RegisterFormType, UserType } from "../../misc/type";
import { AppState, useAppDispatch } from "../../redux/store";
import fetchUsers from "../../redux/thunks/fetchUsers";
import { USER_CHECKMAIL, USER_GETURL, USER_LOGINURL } from "../../constants";
import createUsers from "../../redux/thunks/createUsers";
import { useSelector } from "react-redux";
import createUserLogin from "../../redux/thunks/createUserLogin";
import checkEmailExists from "../../redux/thunks/checkEmailExists";
import { transformToFormDataUser } from "../../utils/utils";

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

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({ defaultValues: initialValues });

  const token = localStorage.getItem("refresh_token");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) dispatch(fetchUsers({ baseUrl: USER_GETURL, token }));
  }, [dispatch]);

  const allUsers: UserType[] = useSelector(
    (state: AppState) => state.userReducer.users
  );

  const registerUserHandler = async (data: RegisterFormType) => {
    const formData = transformToFormDataUser(data);
    //console.log("Registration data: " + formData);

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RegisterContainer>
      <Typography variant="h5">Create your Account</Typography>
      <form onSubmit={handleSubmit(registerUserHandler)}>
        <FormInput>
          <TextField
            {...register("UserName", {
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
            {errors?.UserName?.message}
          </Typography>
        </FormInput>
        <FormInput>
          <TextField
            {...register("Email", {
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
            {errors?.Email?.message}
          </Typography>
        </FormInput>

        <FormInput>
          <TextField
            {...register("Password", {
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
            {errors?.Password?.message}
          </Typography>
        </FormInput>

        <FormInput>
          <TextField
            {...register("AddresLine1", {
              required: "Cannot be empty",
              minLength: {
                value: 5,
                message: "Cannot be less than 5",
              },
            })}
            fullWidth
            variant="standard"
            label="AddressLine"
          />
          <Typography color="red" variant="subtitle1">
            {errors?.AddresLine1?.message}
          </Typography>
        </FormInput>

        <FormInput>
          <TextField
            {...register("Street", {
              required: "Cannot be empty",
              minLength: {
                value: 5,
                message: "Cannot be less than 5",
              },
              maxLength: {
                value: 20,
                message: "Cannot be more than 20",
              },
            })}
            fullWidth
            variant="standard"
            label="Street"
          />
          <Typography color="red" variant="subtitle1">
            {errors?.Street?.message}
          </Typography>
        </FormInput>

        <FormInput>
          <TextField
            {...register("City", {
              required: "Cannot be empty",
              minLength: {
                value: 5,
                message: "Cannot be less than 5",
              },
              maxLength: {
                value: 20,
                message: "Cannot be more than 20",
              },
            })}
            fullWidth
            variant="standard"
            label="City"
          />
          <Typography color="red" variant="subtitle1">
            {errors?.City?.message}
          </Typography>
        </FormInput>

        <FormInput>
          <TextField
            {...register("Country", {
              required: "Cannot be empty",
              minLength: {
                value: 5,
                message: "Cannot be less than 5",
              },
              maxLength: {
                value: 20,
                message: "Cannot be more than 20",
              },
            })}
            fullWidth
            variant="standard"
            label="Country"
          />
          <Typography color="red" variant="subtitle1">
            {errors?.Country?.message}
          </Typography>
        </FormInput>

        <FormInput>
          <TextField
            {...register("Postcode", {
              required: "Cannot be empty",
              pattern: {
                value: /^[0-9]+$/,
                message: "Postcode must be a number",
              },
            })}
            fullWidth
            variant="standard"
            label="Postcode"
          />
          <Typography color="red" variant="subtitle1">
            {errors?.Postcode?.message}
          </Typography>
        </FormInput>

        <FormInput>
          <TextField
            {...register("PhoneNumber", {
              required: "Cannot be empty",
            })}
            fullWidth
            variant="standard"
            label="PhoneNumber"
          />
          <Typography color="red" variant="subtitle1">
            {errors?.PhoneNumber?.message}
          </Typography>
        </FormInput>

        <FormInput>
          <TextField
            {...register("Landmark", {
              required: "Cannot be empty",
            })}
            fullWidth
            variant="standard"
            label="landmark"
          />
          <Typography color="red" variant="subtitle1">
            {errors?.Landmark?.message}
          </Typography>
        </FormInput>

        <FormInput>
          <TextField
            id="file-upload"
            type="file"
            {...register("Avatar", {
              required: true,
              validate: {
                checkFileType: (value: FileList | undefined) => {
                  if (!value || !value[0]) return "Upload an image";
                  const file = value[0];
                  return (
                    file.type === "image/jpeg" ||
                    file.type === "image/png" ||
                    file.type === "image/jpg" ||
                    "Only jpeg, jpg or png is supported"
                  );
                },
                checkFileSize: (value: FileList | undefined) => {
                  if (!value || !value[0]) return "Upload an image";
                  return value[0].size <= 1000000 || "File size is too big";
                },
              },
            })}
            inputProps={{ "aria-label": "File Upload" }}
          />
          {errors.Avatar && (
            <FormHelperText error>{errors.Avatar.message}</FormHelperText>
          )}
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
