import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import react from "react";
import { SaveButton } from "../../styles/styles";
import {
  Category,
  CreateProductType,
  CreateProductType1,
} from "../../misc/type";
import { Controller, useForm } from "react-hook-form";
import { AppState, useAppDispatch } from "../../redux/store";
import createProducts from "../../redux/thunks/createProducts";
import { GETProdURL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { transformToFormData } from "../../utils/utils";
import MasterPage from "../master-page/MasterPage";

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("refresh-token");
  const navigate = useNavigate();

  const items: Category[] = useSelector(
    (state: AppState) => state.productReducer.categories
  );
  const error = useSelector((state: AppState) => state.productReducer.error);
  const isLoading = useSelector(
    (state: AppState) => state.productReducer.isLoading
  );

  const initialValues = {
    name: "",
    price: 0,
    description: "",
    categoryId: "",
    images: undefined,
    inventory: 0,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProductType>({ defaultValues: initialValues });

  const submitHandler = async (data: any) => {
    const formData = transformToFormData(data);

    if (token) {
      try {
        const result = await dispatch(
          createProducts({
            baseUrl: `${GETProdURL}`,
            product: formData,
            token,
          })
        ).unwrap();
        if (result.id) navigate("/dashboard");
      } catch (err) {}
    }
  };

  return (
    <MasterPage>
      <Box sx={{ display: "flex", justifyContent: "center", my: 10 }}>
        <Paper elevation={3} sx={{ p: 3, maxWidth: 400, width: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Add Product
          </Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Box component="div">
              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("name", {
                    required: "Name cannot be empty",
                    minLength: {
                      value: 3,
                      message: "Name should be at least 3 characters",
                    },
                  })}
                  id="name"
                  label="name"
                  variant="outlined"
                  error={!!errors?.name}
                  helperText={errors?.name?.message}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("price", {
                    required: "price cannot be empty",
                    min: {
                      value: 1,
                      message: "Minimum price should be 1",
                    },
                    max: {
                      value: 1000,
                      message: "Maximum price should be 1000",
                    },
                  })}
                  id="price"
                  label="price"
                  variant="outlined"
                  error={!!errors?.price}
                  helperText={errors?.price?.message}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("description", {
                    required: "description cannot be empty",
                    minLength: {
                      value: 10,
                      message: "description should be at least 10 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "description should be less than 100 characters",
                    },
                  })}
                  id="description"
                  label="description"
                  variant="outlined"
                  multiline
                  maxRows={4}
                  error={!!errors?.description}
                  helperText={errors?.description?.message}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("inventory", {
                    required: "inventory cannot be empty",
                    min: {
                      value: 1,
                      message: "Inventory should be greater than 0",
                    },
                    max: {
                      value: 1000,
                      message: "Inventory should be less than 1000",
                    },
                  })}
                  id="inventory"
                  label="inventory"
                  variant="outlined"
                  error={!!errors?.inventory}
                  helperText={errors?.inventory?.message}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  {...register("weight", {
                    required: "This field is required",
                    min: {
                      value: 0.1,
                      message: "inventory should be greater than 0",
                    },
                    max: {
                      value: 1000,
                      message: "inventory should be less than 1000",
                    },
                  })}
                  id="weight"
                  label="weight"
                  variant="outlined"
                  error={!!errors?.inventory}
                  helperText={errors?.inventory?.message}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="dropdown">Select Item</InputLabel>
                <Controller
                  control={control}
                  name="categoryId"
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Select Item"
                      inputProps={{ "aria-label": "Select Item" }}
                      error={Boolean(error)}
                    >
                      {isLoading ? (
                        <MenuItem disabled>
                          <CircularProgress size={24} />
                        </MenuItem>
                      ) : (
                        items.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  )}
                />
                {error && <FormHelperText error>{error}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  id="file-upload"
                  type="file"
                  {...register("images", {
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
                        return (
                          value[0].size <= 1000000 || "File size is too big"
                        );
                      },
                    },
                  })}
                  inputProps={{ "aria-label": "File Upload" }}
                />
                {errors.images && (
                  <FormHelperText error>{errors.images.message}</FormHelperText>
                )}
              </FormControl>
              <Box mt={2} display="flex" justifyContent="space-between">
                <SaveButton type="submit" value="Save" />
                <Button variant="outlined" color="secondary" type="reset">
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

export default CreateProduct;
