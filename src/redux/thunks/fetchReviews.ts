import { createAsyncThunk } from "@reduxjs/toolkit";
import { Review } from "../../components/reviews/ReviewItem";

interface ReviewProp {
  baseUrl: string;
  token: string;
}

const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async ({ baseUrl, token }: ReviewProp, { rejectWithValue }) => {
    try {
      const response: Response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result: Review[] = await response.json();
      return result;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchReviews;
