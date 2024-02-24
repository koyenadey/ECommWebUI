import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../../misc/type";

const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllcategories",
  async (baseUrl: string, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) throw new Error("Data fetch failed!");
      const data: Category[] = await response.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);

export default fetchAllCategories;
