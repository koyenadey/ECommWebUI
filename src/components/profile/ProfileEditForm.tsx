import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Box, FormControl, Typography, Paper } from "@mui/material";
import { SaveButton, StyledProfileDetails } from "../../styles/styles";
import { AppState, useAppDispatch } from "../../redux/store";
import updateUser from "../../redux/thunks/updateUser";
import { USER_UPDATEURL } from "../../constants";
import { UserType } from "../../misc/type";

type UserEditForm = {
  name: string;
  email: string;
};

const ProfileEditForm = ({ canEdit }: any) => {
  const userData: UserType | undefined = useSelector(
    (state: AppState) => state.userReducer.user
  );

  const initialValues: UserEditForm = {
    name: userData?.name ?? "",
    email: userData?.email ?? "",
  };

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditForm>({ defaultValues: initialValues });

  const submitHandler = (data: UserEditForm) => {
    dispatch(
      updateUser({ baseUrl: `${USER_UPDATEURL}${userData?.id}`, user: data })
    );
  };
  const error: string | undefined = useSelector(
    (state: AppState) => state.userReducer.error
  );

  useEffect(() => {
    if (!error) canEdit((prev: any) => !prev);
  }, [error]);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ margin: "15% auto", width: "50%" }}>
        <Typography variant="h6">Profile Details</Typography>

        <FormControl fullWidth>
          <Paper>
            <StyledProfileDetails
              {...register("name", {
                required: "Name cannot be empty",
                minLength: {
                  value: 3,
                  message: "The minimum length should be 3",
                },
              })}
              id="name"
              variant="standard"
              label="Name"
            />
          </Paper>
          <Typography color="red" variant="subtitle1">
            {errors?.name?.message}
          </Typography>
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <Paper>
            <StyledProfileDetails
              {...register("email", {
                required: "Email cannot be empty",
                pattern: {
                  value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: "Incorrect mail",
                },
              })}
              variant="standard"
              label="Email"
            />
          </Paper>
          <Typography color="red" variant="subtitle1">
            {errors?.email?.message}
          </Typography>
        </FormControl>

        <SaveButton type="submit" value="Save" />
        {error && <Typography color="red">{error}</Typography>}
      </Box>
    </form>
  );
};

export default ProfileEditForm;
