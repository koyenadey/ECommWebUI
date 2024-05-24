import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Box, FormControl, Typography, TextField, Avatar } from "@mui/material";
import { SaveButton, StyledProfileDetails } from "../../styles/styles";
import { AppState, useAppDispatch } from "../../redux/store";
import updateUser from "../../redux/thunks/updateUser";
import { USER_UPDATEURL } from "../../constants";
import { UserType } from "../../misc/type";
import { useNavigate, useParams } from "react-router-dom";
import SuccessModal from "../products/SuccessModal";

type UserEditFormInput = {
  name: string;
  avatar?: FileList;
};

const ProfileEditForm = ({ canEdit }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("refresh-token");
  const userId = useSelector((state: AppState) => state.userReducer.user?.id);
  const ID = id ?? userId;

  const [isSuccess, setIsSuceess] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setIsSuccessModalOpen(true);
    }
  }, [isSuccess]);

  const handleClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/dashboard");
  };

  const userData: UserType | undefined = useSelector(
    (state: AppState) => state.userReducer.user
  );

  const selectedUserData: UserType | undefined = useSelector(
    (state: AppState) => state.userReducer.users.find((u) => u.id === id)
  );

  const initialValues: UserEditFormInput = id
    ? {
        name: selectedUserData?.userName ?? "",
        avatar: undefined,
      }
    : {
        name: userData?.userName ?? "",
        avatar: undefined,
      };

  const dispatch = useAppDispatch();
  const error: string | undefined = useSelector(
    (state: AppState) => state.userReducer.error
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditFormInput>({ defaultValues: initialValues });

  const submitHandler = (data: UserEditFormInput) => {
    const formData = new FormData();
    formData.append("userName", data.name);

    if (data.avatar && data.avatar.length > 0) {
      const avatarFile = data.avatar[0];
      formData.append("avatar", avatarFile);
    }

    dispatch(
      updateUser({
        baseUrl: `${USER_UPDATEURL}/${ID}`,
        user: formData,
        token: token ?? "",
      })
    );
    if (!error) {
      setIsSuceess(true);
    }
  };

  useEffect(() => {
    if (!error) canEdit((prev: boolean) => !prev);
  }, [error]);

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Box sx={{ margin: "10% auto", width: "50%" }}>
          <Typography sx={{ margin: "5%5%" }} variant="h6">
            Profile Details
          </Typography>
          <FormControl fullWidth>
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
              sx={{ margin: "2%" }}
            />
            <Typography color="red" variant="subtitle1">
              {errors?.name?.message}
            </Typography>
            <Avatar
              alt={userData ? userData.avatar : "user-name"}
              src={userData ? userData.avatar : "U"}
              sx={{ width: 56, height: 56, margin: "2%" }}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth>
            <TextField
              {...register("avatar", {
                validate: {
                  checkFileType: (value: FileList | undefined) => {
                    if (!value || !value[0]) return true;
                    const file = value[0];
                    return (
                      file.type === "image/jpeg" ||
                      file.type === "image/png" ||
                      file.type === "image/jpg" ||
                      "Only jpeg, jpg or png is supported"
                    );
                  },
                  checkFileSize: (value: FileList | undefined) => {
                    if (!value || !value[0]) return true;
                    return value[0].size <= 1000000 || "File size is too big";
                  },
                },
              })}
              type="file"
              sx={{ margin: "2%" }}
            />
            <Typography color="red" variant="subtitle1">
              {errors?.avatar?.message}
            </Typography>
          </FormControl>

          <SaveButton type="submit" value="Save" />
          {error && <Typography color="red">{error}</Typography>}
        </Box>
      </form>
      <SuccessModal open={isSuccessModalOpen} onClose={handleClose} />
    </>
  );
};

export default ProfileEditForm;
