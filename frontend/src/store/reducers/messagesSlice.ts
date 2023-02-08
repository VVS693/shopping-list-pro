import { IMessage } from "./../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllMessages } from "./actionsMessagesCreators";

interface MessagessState {
  messages: IMessage[];
  isLoading: boolean;
  error: string;
}

const initialState: MessagessState = {
  messages: [],
  isLoading: false,
  error: "",
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload);
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchAllMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.messages = action.payload;
      })
      .addCase(fetchAllMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
