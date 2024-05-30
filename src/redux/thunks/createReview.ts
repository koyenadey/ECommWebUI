import { createAsyncThunk } from "@reduxjs/toolkit";
//import {ReviewFormType} from "../../components/reviews/ReviewSection";

type CreateReviewType = {
  baseUrl: string;
  token: string;
  review: FormData;
};

const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({ baseUrl, token, review }: CreateReviewType, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "POST",
        body: review,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result: string = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default createReview;
