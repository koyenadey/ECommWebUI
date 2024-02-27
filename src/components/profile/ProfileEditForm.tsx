import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Box, FormControl, TextField, Typography } from "@mui/material";
import { SaveButton } from "../../styles/styles";
import { AppState, useAppDispatch } from "../../redux/store";
import updateUser from "../../redux/thunks/updateUsers";
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
    canEdit((prev: any) => !prev);
    dispatch(updateUser({ baseUrl: USER_UPDATEURL, user: data }));
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ margin: "15% auto", width: "50%" }}>
        <Typography variant="h6">Profile Details</Typography>

        <FormControl fullWidth>
          <TextField
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
          <Typography color="red" variant="subtitle1">
            {errors?.name?.message}
          </Typography>
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <TextField
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
          <Typography color="red" variant="subtitle1">
            {errors?.email?.message}
          </Typography>
        </FormControl>

        <SaveButton type="submit" value="Save" />
      </Box>
    </form>
  );
};

export default ProfileEditForm;
