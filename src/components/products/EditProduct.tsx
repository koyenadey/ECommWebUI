import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { Container, FormControl, TextField, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

import { AppState, useAppDispatch } from "../../redux/store";
import updateProduct from "../../redux/thunks/updateProduct";

import { GETURL } from "../../constants";
import { CreateProductType, Product } from "../../misc/type";
import { FormInput, SaveButton } from "../../styles/styles";
import createProducts from "../../redux/thunks/createProducts";

const EditProduct = () => {
  const { action, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [submitSuccesful, setSubmitSuccesful] = useState<boolean>(false);

  const productDetails: Product | undefined = useSelector(
    (state: AppState) => state.productReducer.productDetails
  );
  const isLoading = useSelector(
    (state: AppState) => state.productReducer.isLoading
  );

  const buttonLabel: string = action === "edit" ? "Update" : "Create";

  const submitHandler = async (data: CreateProductType) => {
    if (action === "edit") {
      dispatch(updateProduct({ baseUrl: `${GETURL}/${id}`, product: data }));
      setSubmitSuccesful(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      dispatch(createProducts({ baseUrl: `${GETURL}`, product: data }));
      setSubmitSuccesful(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CreateProductType>();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container sx={{ width: "50%" }}>
      {submitSuccesful && (
        <Alert onClose={() => setSubmitSuccesful(false)} severity="success">
          Data submitted successfully!
        </Alert>
      )}

      <Typography variant="h4">
        {action![0].toUpperCase().concat(action?.substring(1)!)} List
      </Typography>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormInput>
          <FormControl fullWidth>
            <Controller
              name="title"
              control={control}
              defaultValue={action === "edit" ? productDetails?.title : ""}
              rules={{ required: "Title cannot be empty" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </FormControl>
        </FormInput>
        <FormInput>
          <FormControl fullWidth>
            <Controller
              name="price"
              control={control}
              defaultValue={action === "edit" ? productDetails?.price : 0}
              rules={{
                required: "Price cannot be empty",
                min: { value: 5, message: "The price cannot be less than 5" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </FormControl>
        </FormInput>
        <FormInput>
          <FormControl fullWidth>
            <Controller
              name="description"
              control={control}
              defaultValue={
                action === "edit" ? productDetails?.description : ""
              }
              rules={{ required: "Description cannot be empty" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </FormControl>
        </FormInput>
        <FormInput>
          <FormControl fullWidth>
            <Controller
              name="categoryId"
              control={control}
              defaultValue={action === "edit" ? productDetails?.category.id : 0}
              rules={{ required: "Category cannot be empty" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category Id"
                  error={!!errors.categoryId}
                  helperText={errors.categoryId?.message}
                />
              )}
            />
          </FormControl>
        </FormInput>

        <FormInput>
          <FormControl fullWidth>
            <Controller
              name="images"
              control={control}
              defaultValue={action === "edit" ? productDetails?.images : []}
              rules={{ required: "Images cannot be empty" }}
              render={({ field }) => (
                <>
                  {field?.value?.map((image, index) => (
                    <TextField
                      fullWidth
                      key={index}
                      {...field}
                      value={image}
                      onChange={(e) => {
                        const newImages = [...field.value];
                        newImages[index] = e.target.value;
                        field.onChange(newImages);
                      }}
                      error={!!errors.images?.[index]}
                      helperText={errors.images?.[index]?.message}
                      label={index === 0 ? "Images" : ""}
                    />
                  ))}
                  {field.value.length === 0 && (
                    <TextField
                      fullWidth
                      placeholder="Add image URL"
                      onChange={(e) => {
                        field.onChange([e.target.value]);
                      }}
                    />
                  )}
                </>
              )}
            />
          </FormControl>
        </FormInput>
        <SaveButton type="submit" value={buttonLabel} />
      </form>
    </Container>
  );
};

export default EditProduct;
