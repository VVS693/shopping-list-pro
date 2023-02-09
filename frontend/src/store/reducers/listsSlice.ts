import { IListItem } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAddList, fetchAllLists } from "./actionsListsCreators";

interface ListsState {
  lists: IListItem[];
  isLoading: boolean;
  error: string;
}

const initialState: ListsState = {
  lists: [],
  isLoading: false,
  error: "",
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {

    addList(state, action: PayloadAction<IListItem>) {
      state.lists.push(action.payload);
    },

  },

  extraReducers(builder) {
    builder
      .addCase(fetchAllLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.lists = action.payload;
      })
      .addCase(fetchAllLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchAddList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.lists.push(action.payload);
      })
      .addCase(fetchAddList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })




  },
});

export const {
  addList,
} = listsSlice.actions;

export default listsSlice.reducer;
