import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMessage } from "../../types";
import { clientDatabase } from "../axios";

export const fetchAllMessages = createAsyncThunk(
    "fetchAllMessages",
    async (roomId: string, thunkAPI) => {
      try {
        const response = await clientDatabase.get<IMessage[]>(`messages/${roomId}`);
        return response.data;
      } catch (err) {
        return thunkAPI.rejectWithValue("Error loading messages...");
      }
    }
  );

  