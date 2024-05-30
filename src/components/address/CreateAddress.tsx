import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppState, useAppDispatch } from "../../redux/store";
import { AddressType, UserType } from "../../misc/type";
import { useForm } from "react-hook-form";
import { SaveButton } from "../../styles/styles";
import updateAddress from "../../redux/thunks/updateAddress";
import { USER_ADDRESSURL } from "../../constants";
import createAddress from "../../redux/thunks/createAddress";
import { useEffect, useState } from "react";
import SuccessModal from "../products/SuccessModal";
import MasterPage from "../master-page/MasterPage";

export type AddressCreateFormInput = {
  userId: string;
  addressLine: string;
  street: string;
  city: string;
  country: string;
  postcode: string;
  landmark: string;
  phoneNumber: string;
};

const CreateAddress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("refresh-token");

  const [isSuccess, setIsSuceess] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setIsSuccessModalOpen(true);
    }
  }, [isSuccess]);

  const handleClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/profile");
  };

  const userId: string | undefined = useSelector(
    (state: AppState) => state.userReducer.user
  )?.id;

  const initialValues = {
    userId: userId,
    addressLine: "",
    street: "",
    city: "",
    country: "",
    postcode: "",
    landmark: "",
    phoneNumber: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressCreateFormInput>({ defaultValues: initialValues });

  const submitHandler = async (data: AddressCreateFormInput) => {
    if (token) {
      var result = await dispatch(
        createAddress({
          baseUrl: `${USER_ADDRESSURL}`,
          address: data,
          token,
        })
      );
      if (result) setIsSuceess(true);
    }
  };

  return (
    <MasterPage>
      <Box sx={{ display: "flex", justifyContent: "center", my: 10 }}>
        <Paper elevation={3} sx={{ p: 3, maxWidth: 400, width: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Create address
          </Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Box component="div">
              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("userId")}
                  id="userid"
                  label="User Id"
                  variant="outlined"
                  fullWidth
                  disabled
                  InputLabelProps={{
                    shrink: !!userId, // Shrink label if value is present
                  }}
                  error={!!errors?.userId}
                  helperText={errors?.userId?.message}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("addressLine", {
                    required: "addressline cannot be empty",
                  })}
                  id="addressLine"
                  label="Street address, house number"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors?.addressLine}
                  helperText={errors?.addressLine?.message}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("street", {
                    required: "This field is required",
                  })}
                  id="street"
                  label="Street"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors?.street}
                  helperText={errors?.street?.message}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("city", {
                    required: "This field is required",
                  })}
                  id="city"
                  label="City"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors?.city}
                  helperText={errors?.city?.message}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("country", {
                    required: "This field is required",
                  })}
                  id="country"
                  label="Country"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors?.country}
                  helperText={errors?.country?.message}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("postcode", {
                    required: "This field is required",
                    validate: {
                      checkPostcode: (value: string) => {
                        if (!value.match(/^\d+$/))
                          return "Postcode should be digits";
                      },
                    },
                  })}
                  id="postcode"
                  label="Postcode"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors?.postcode}
                  helperText={errors?.postcode?.message}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("landmark", {
                    required: "This field is required",
                  })}
                  id="landmark"
                  label="Landmark"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors?.landmark}
                  helperText={errors?.landmark?.message}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("phoneNumber", {
                    required: "This field is required",
                  })}
                  id="phoneNumber"
                  label="PhoneNumber"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors?.phoneNumber}
                  helperText={errors?.phoneNumber?.message}
                />
              </FormControl>

              <Box mt={2} display="flex" justifyContent="space-between">
                <SaveButton type="submit" value="Save" />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
        <SuccessModal open={isSuccessModalOpen} onClose={handleClose} />
      </Box>
    </MasterPage>
  );
};

export default CreateAddress;
