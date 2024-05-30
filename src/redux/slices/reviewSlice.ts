import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import fetchReviews from "../thunks/fetchReviews";
import { Review } from "../../components/reviews/ReviewItem";

type initialState = {
  reviews: Review[];
  loading: false;
  error: string;
};

const initialState: initialState = {
  reviews: [],
  loading: false,
  error: "",
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchReviews.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        reviews: [],
      };
    });

    builder.addCase(
      fetchReviews.fulfilled,
      (state, action: PayloadAction<Review[]>) => {
        return {
          ...state,
          reviews: action.payload,
          isLoading: false,
        };
      }
    );

    builder.addCase(fetchReviews.rejected, (state, action) => {
      const payload = action.payload as Error;
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    });
  },
});

const reviewReducer = reviewSlice.reducer;
export const {} = reviewSlice.actions;
export default reviewReducer;
