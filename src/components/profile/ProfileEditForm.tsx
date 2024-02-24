import { useForm } from "react-hook-form";

import { Box, FormControl, TextField, Typography } from "@mui/material";
import { SaveButton } from "../../styles/styles";

type UserEditForm = {
  name: string;
  email: string;
};

const initialValues: UserEditForm = {
  name: "",
  email: "",
};

const ProfileEditForm = ({ canEdit }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditForm>({ defaultValues: initialValues });

  const submitHandler = (data: UserEditForm) => {
    //dispatch
    console.log(data);
    canEdit((prev: any) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ margin: "15% auto", width: "50%" }}>
        <Typography variant="h6">Profile Details</Typography>

        <FormControl fullWidth>
          <TextField
            {...register("name", {
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
