import react, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MasterPage from "../master-page/MasterPage";

import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { SaveButton } from "../../styles/styles";
import { AppState, useAppDispatch } from "../../redux/store";

import { GETProdURL, GETURL } from "../../constants";
import updateProduct from "../../redux/thunks/updateProduct";
import { useForm } from "react-hook-form";
import { Product, UpdateProductType } from "../../misc/type";
import { useSelector } from "react-redux";

const EditAProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("refresh-token");

  const product: Product | undefined = useSelector(
    (state: AppState) => state.productReducer.productDetails
  );

  const initialValues = {
    price: product?.price,
    inventory: product?.inventory,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProductType>({ defaultValues: initialValues });

  const submitHandler = async (data: any) => {
    if (token) {
      try {
        const result = await dispatch(
          updateProduct({
            baseUrl: `${GETProdURL}/${id}`,
            product: data,
            token,
          })
        ).unwrap();
        if (result) navigate("/dashboard");
      } catch (err) {
        console.log(err);
      }
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
                id="id"
                label="id"
                variant="outlined"
                disabled
                aria-disabled="true"
                fullWidth
                value={product?.id}
                margin="normal"
                InputLabelProps={{
                  shrink: !!product?.id, // Shrink label if value is present
                }}
              />
              <TextField
                id="name"
                label="name"
                variant="outlined"
                disabled
                aria-disabled="true"
                fullWidth
                value={product?.name}
                margin="normal"
                InputLabelProps={{
                  shrink: !!product?.name, // Shrink label if value is present
                }}
              />
              <TextField
                id="description"
                label="description"
                variant="outlined"
                multiline
                maxRows={4}
                disabled
                aria-disabled="true"
                fullWidth
                value={product?.description}
                margin="normal"
                InputLabelProps={{
                  shrink: !!product?.description, // Shrink label if value is present
                }}
              />
              <TextField
                id="category"
                label="category"
                variant="outlined"
                disabled
                aria-disabled="true"
                fullWidth
                value={product?.category.name}
                margin="normal"
                InputLabelProps={{
                  shrink: !!product?.description, // Shrink label if value is present
                }}
              />
              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("price", {
                    required: "Price cannot be empty",
                    min: {
                      value: 0,
                      message: "Price should be greater than 0",
                    },
                  })}
                  id="price"
                  label="price"
                  variant="outlined"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: !!product?.price, // Shrink label if value is present
                  }}
                  error={!!errors?.price}
                  helperText={errors?.price?.message}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("inventory", {
                    required: "This field is required",
                    min: {
                      value: 0,
                      message: "inventory should be greater than 0",
                    },
                    max: {
                      value: 1000,
                      message: "inventory should be less than 1000",
                    },
                  })}
                  id="inventory"
                  label="inventory"
                  variant="outlined"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: !!product?.inventory, // Shrink label if value is present
                  }}
                  error={!!errors?.inventory}
                  helperText={errors?.inventory?.message}
                />
              </FormControl>
              <Box mt={2} display="flex" justifyContent="space-between">
                <SaveButton type="submit" value="Save" />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setTimeout(() => {
                      navigate("/dashboard");
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
    </MasterPage>
  );
};

export default EditAProduct;
