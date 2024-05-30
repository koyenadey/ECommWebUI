import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Rating,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/system";
import ReviewItem from "./ReviewItem";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { ExpandMore } from "@mui/icons-material";
import fetchReviews from "../../redux/thunks/fetchReviews";
import createReview from "../../redux/thunks/createReview";
import { REVIEW_GETURL } from "../../constants";
import { transformToReviewForm } from "../../utils/utils";

const SectionContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: "30px",
}));

const ReviewForm = styled("form")(({ theme }) => ({
  marginTop: theme.spacing(4),
  "& > *": {
    marginBottom: theme.spacing(2),
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const staticReviews = [
  {
    id: 1,
    name: "Lillian Fowler",
    date: "Apr 01, 2023, 18:10 PM",
    rating: 5,
    review:
      "This dress is stunning! The color is so vibrant and the fit is perfect. I love the way it flows and the material is comfortable to wear.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Alexis Pearce",
    date: "Apr 01, 2023, 18:08 PM",
    rating: 4.5,
    review:
      "I am so happy with this dress! The cut is flattering and the material is high quality. It’s perfect for a night out.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

export interface CreateReview {
  rating: number;
  comment: string;
  reviewDate: Date;
  userId: string;
  orderProductId: string;
}

interface ReviewSectionProps {
  productId: string;
  productName: string;
}

const CustomAccordion = styled(Accordion)({
  boxShadow: "none",
  borderTop: "1px solid #efefef",
  "&.Mui-expanded": {
    margin: "auto",
  },
});

const ReviewSection = (props: ReviewSectionProps) => {
  const token = localStorage.getItem("refresh-token") ?? "";
  const reviews = useSelector((state: AppState) => state.reviewReducer.reviews);
  const userId = useSelector((state: AppState) => state.userReducer.user?.id);
  //const finalReviews = reviews;
  //reviews.length === 0 ? staticReviews : reviews;
  const dispatch = useAppDispatch();

  const orders = useSelector((state: AppState) => state.orderReducer.orders);

  const orderProductId = orders
    .find((o) =>
      o.orderedProducts.some((op) => op.productId === props.productId)
    )
    ?.orderedProducts.find((op) => op.productId === props.productId)?.id;

  const initialValues: CreateReview = {
    rating: 0.0,
    comment: "",
    reviewDate: new Date(),
    userId: userId ?? "",
    orderProductId: orderProductId ?? "",
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateReview>({ defaultValues: initialValues });

  useEffect(() => {
    dispatch(fetchReviews({ baseUrl: `${REVIEW_GETURL}`, token }));
    console.log(
      "fetching reviews " + props.productId + " // " + reviews.length
    );
  }, [props.productId]);

  const submitReview = async (data: CreateReview) => {
    console.log("payload: ", data);

    const review = transformToReviewForm(data);

    try {
      dispatch(createReview({ baseUrl: `${REVIEW_GETURL}`, token, review }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SectionContainer>
      <Typography variant="h4" marginY="20px">
        Check-out what others say about the product!
      </Typography>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
      {reviews.length === 0 && (
        <Typography>No reviews yet. You can add your review too.</Typography>
      )}

      {orderProductId && (
        <CustomAccordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontWeight="700" color="secondary" variant="h6">
              Interested to review the product?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" component="div" gutterBottom>
              Add a Review
            </Typography>
            <ReviewForm noValidate onSubmit={handleSubmit(submitReview)}>
              <Grid container spacing={3}>
                <Grid
                  item
                  md={8}
                  display="flex"
                  flexGrow="1"
                  flexDirection="column"
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography marginBottom="10px">
                      Your review about the item *
                    </Typography>
                    <Controller
                      name="rating"
                      control={control}
                      rules={{ required: "Rating is required" }}
                      render={({ field }) => (
                        <Rating
                          {...field}
                          onChange={(_, value) => field.onChange(value)}
                        />
                      )}
                    />
                    <Typography color="red" variant="subtitle1">
                      {errors.rating?.message}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <FormControl fullWidth>
                      <TextField
                        {...register("comment", {
                          required: "Cannot be empty",
                        })}
                        label="Comment"
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
                        required
                      />
                      <Typography color="red" variant="subtitle1">
                        {errors.comment?.message}
                      </Typography>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>

              <SubmitButton type="submit" variant="contained">
                Submit
              </SubmitButton>
            </ReviewForm>
          </AccordionDetails>
        </CustomAccordion>
      )}
    </SectionContainer>
  );
};

export default ReviewSection;
