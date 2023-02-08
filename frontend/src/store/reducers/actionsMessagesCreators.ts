import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMessage } from "../../types";
import { clientDatabase } from "../axios";

export const fetchAllMessages = createAsyncThunk(
    "fetchAllMessages",
    async (_, thunkAPI) => {
      try {
        const response = await clientDatabase.get<IMessage[]>("messages");
        return response.data;
      } catch (err) {
        return thunkAPI.rejectWithValue("Error loading messages...");
      }
    }
  );

  