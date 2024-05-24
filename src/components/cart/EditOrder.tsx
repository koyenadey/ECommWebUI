import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SaveButton } from "../../styles/styles";
import { AppState, useAppDispatch } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import updateOrder from "../../redux/thunks/updateOrder";
import { ORDER_GETURL } from "../../constants";
import { UpdateOrderType } from "../../misc/type";
import fetchOrder from "../../redux/thunks/fetchOrder";
import { useSelector } from "react-redux";
import MasterPage from "../master-page/MasterPage";
import SuccessModal from "../products/SuccessModal";

const EditOrder = () => {
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
    navigate("/order-history");
  };

  useEffect(() => {
    if (token)
      dispatch(fetchOrder({ baseUrl: `${ORDER_GETURL}/${id}`, token }));
  }, [dispatch, id, token]);

  const orderDetails = useSelector(
    (state: AppState) => state.orderReducer.orderDetails
  );

  const initialValues = {
    status: orderDetails?.status,
    dateOfDelivery: undefined,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateOrderType>({ defaultValues: initialValues });

  const submitHandler = async (data: UpdateOrderType) => {
    if (token) {
      try {
        const result = await dispatch(
          updateOrder({
            baseUrl: `${ORDER_GETURL}/${id}`,
            order: data,
            token,
          })
        ).unwrap();
        if (result) {
          setIsSuceess(true);
        }
      } catch (err) {}
    }
  };

  return (
    <MasterPage>
      <Box sx={{ display: "flex", justifyContent: "center", my: 10 }}>
        <Paper elevation={3} sx={{ p: 3, maxWidth: 400, width: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Edit Product
          </Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Box component="div">
              <TextField
                margin="normal"
                id="orderId"
                label="Order Id"
                variant="outlined"
                disabled
                aria-disabled="true"
                fullWidth
                value={orderDetails?.orderId}
                InputLabelProps={{
                  shrink: !!orderDetails?.orderId, // Shrink label if value is present
                }}
              />
              <TextField
                margin="normal"
                id="orderedBy"
                label="OrderedBy"
                variant="outlined"
                disabled
                aria-disabled="true"
                fullWidth
                value={orderDetails?.userName}
                InputLabelProps={{
                  shrink: !!orderDetails?.userName, // Shrink label if value is present
                }}
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel id="status">Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  defaultValue=""
                  rules={{ required: "status is required" }}
                  render={({ field }) => (
                    <Select
                      labelId="status"
                      id="status"
                      label="status"
                      {...field}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="processing">processing</MenuItem>
                      <MenuItem value="shipped">shipped</MenuItem>
                      <MenuItem value="cancelled">cancelled</MenuItem>
                      <MenuItem value="delivered">delivered</MenuItem>
                      <MenuItem value="completed">completed</MenuItem>
                      <MenuItem value="pending">pending</MenuItem>
                    </Select>
                  )}
                />
                {errors.status && <p>{errors.status.message}</p>}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("dateOfDelivery", {
                    required: "This field is required",
                  })}
                  type="datetime-local"
                  id="dateOfDelivery"
                  label="DateOfDelivery"
                  variant="outlined"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: !!orderDetails?.dateOfDelivery, // Shrink label if value is present
                  }}
                  error={!!errors?.status}
                  helperText={errors?.status?.message}
                />
              </FormControl>
              <Box mt={2} display="flex" justifyContent="space-between">
                <SaveButton type="submit" value="Save" />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setTimeout(() => {
                      navigate("/order-history");
                    }, 500);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
      <SuccessModal open={isSuccessModalOpen} onClose={handleClose} />
    </MasterPage>
  );
};

export default EditOrder;
