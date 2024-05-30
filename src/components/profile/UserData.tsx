import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import updateUser from "../../redux/thunks/updateUser";
import { USER_UPDATEURL } from "../../constants";
import { UserType } from "../../misc/type";
import { useParams, useNavigate } from "react-router-dom";

const Root = styled(Container)({
  display: "flex",
  justifyContent: "center",
  minHeight: "100vh",
});

const ContentWrapper = styled(Box)({
  width: "100%",
  maxWidth: "1200px",
  padding: "30px",
});

const ProfileCard = styled(Paper)({
  textAlign: "center",
  borderRadius: "8px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const ProfileImage = styled("img")({
  borderRadius: "50%",
  width: "100px",
  height: "100px",
  objectFit: "cover",
  marginBottom: "10px",
});

const SectionTitle = styled(Typography)({
  marginBottom: "15px",
  fontWeight: "bold",
  color: "#1976d2",
});

const SectionHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const Form = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "20px",
});

const AboutSection = styled(Typography)({
  marginTop: "20px",
});

type UserEditFormInput = {
  name: string;
  avatar?: FileList;
};

const UserData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("refresh-token");
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const userId = useSelector((state: AppState) => state.userReducer.user?.id);
  const ID = id ?? userId;

  const error: string | undefined = useSelector(
    (state: AppState) => state.userReducer.error
  );

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditFormInput>({ defaultValues: initialValues });

  const handleClickShowEdit = () => {
    setShowEdit((prev) => !prev);
  };

  const submitHandler = (data: UserEditFormInput) => {
    console.log(data);
    // const formData = new FormData();
    // formData.append("userName", data.name);

    // if (data.avatar && data.avatar.length > 0) {
    //   const avatarFile = data.avatar[0];
    //   formData.append("avatar", avatarFile);
    // }

    // dispatch(
    //   updateUser({
    //     baseUrl: `${USER_UPDATEURL}/${ID}`,
    //     user: formData,
    //     token: token ?? "",
    //   })
    // );
    // if (!error) {
    // }
  };

  return (
    <Root>
      <ContentWrapper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <ProfileCard elevation={3}>
              <Box>
                {!showEdit && (
                  <ProfileImage
                    src="https://via.placeholder.com/100"
                    alt="Profile"
                  />
                )}
                {showEdit && (
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
                            return (
                              value[0].size <= 1000000 || "File size is too big"
                            );
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
                )}
              </Box>
              <Typography variant="h6">Yuki Hayashi</Typography>
              <Typography variant="body2" color="textSecondary">
                yuki@maxwell.com
              </Typography>
              <AboutSection variant="h6">About</AboutSection>
              <Typography variant="body2">
                I'm Yuki. Full Stack Designer I enjoy creating user-centric,
                delightful and human experiences.
              </Typography>
            </ProfileCard>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
              <SectionHeader
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <SectionTitle variant="h6">Personal Details</SectionTitle>
                <SectionTitle variant="button">
                  {showEdit ? "Save" : "Edit"}
                </SectionTitle>
              </SectionHeader>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        {...register("name", {
                          required: "Name cannot be empty",
                          minLength: {
                            value: 3,
                            message: "The minimum length should be 3",
                          },
                        })}
                        label="User Name"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle edit icon"
                                onClick={handleClickShowEdit}
                                edge="end"
                              >
                                {showEdit ? <EditIcon /> : <EditOffIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Typography color="red" variant="subtitle1">
                        {errors?.name?.message}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Email" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Phone" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Website URL"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Form>
              <SectionTitle variant="h6" sx={{ mt: 3 }}>
                DefaultAddress
              </SectionTitle>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Street" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="City" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="State" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Zip Code" variant="outlined" />
                  </Grid>
                </Grid>
              </Form>
              <ButtonContainer>
                <Button variant="contained" color="inherit">
                  Cancel
                </Button>
                <Button variant="contained" color="primary">
                  Update
                </Button>
              </ButtonContainer>
            </Paper>
          </Grid>
        </Grid>
      </ContentWrapper>
    </Root>
  );
};

export default UserData;
