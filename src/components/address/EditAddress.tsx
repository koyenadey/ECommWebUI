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
import { AddressType } from "../../misc/type";
import { useForm } from "react-hook-form";
import { SaveButton } from "../../styles/styles";
import updateAddress from "../../redux/thunks/updateAddress";
import { USER_ADDRESSURL } from "../../constants";
import { useEffect, useState } from "react";
import SuccessModal from "../products/SuccessModal";

export type AddressEditFormInput = {
  addressLine: string;
  street: string;
  city: string;
  postcode: string;
  landmark: string;
  phoneNumber: string;
};

const EditAddress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("refresh-token") ?? "";

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

  const address: AddressType | undefined = useSelector(
    (state: AppState) => state.userReducer.addresses
  ).find((a: AddressType) => a.id === id);

  const initialValues = {
    addressLine: address?.addressLine ?? "",
    street: address?.street,
    city: address?.city,
    postcode: address?.postcode,
    landmark: address?.landmark,
    phoneNumber: address?.phoneNumber,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressEditFormInput>({ defaultValues: initialValues });

  const submitHandler = async (data: AddressEditFormInput) => {
    try {
      const result = await dispatch(
        updateAddress({
          baseUrl: `${USER_ADDRESSURL}/${id}`,
          address: data,
          token,
        })
      );
      if (result) setIsSuceess(true);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 400, width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Edit address
        </Typography>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Box component="div">
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
                InputLabelProps={{
                  shrink: !!address?.addressLine, // Shrink label if value is present
                }}
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
                InputLabelProps={{
                  shrink: !!address?.street, // Shrink label if value is present
                }}
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
                InputLabelProps={{
                  shrink: !!address?.city, // Shrink label if value is present
                }}
                error={!!errors?.city}
                helperText={errors?.city?.message}
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
                InputLabelProps={{
                  shrink: !!address?.postcode, // Shrink label if value is present
                }}
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
                InputLabelProps={{
                  shrink: !!address?.landmark, // Shrink label if value is present
                }}
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
                InputLabelProps={{
                  shrink: !!address?.phoneNumber, // Shrink label if value is present
                }}
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
  );
};

export default EditAddress;
