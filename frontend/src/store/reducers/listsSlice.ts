import { IListItem } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAddList,
  fetchAllLists,
  fetchAllUserLists,
  fetchDeleteList,
  fetchEditList,
} from "./actionsListsCreators";

interface ListsState {
  lists: IListItem[];
  isLoading: boolean;
  error: string;
  currentList: IListItem;
  isShareUsersMenuOpen: boolean
  // permissionList : IListPermission
}

const initialState: ListsState = {
  lists: [],
  isLoading: false,
  error: "",
  currentList: {
    _id: "",
    title: "",
    userOwner: ""
  },
  isShareUsersMenuOpen: false
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList(state, action: PayloadAction<IListItem>) {
      state.lists.push(action.payload);
    },
    editList(state, action: PayloadAction<IListItem>) {
      state.lists.map((el) => {
        if (el._id === action.payload._id) {
          Object.assign(el, action.payload);
        }
      });
    },
    setCurrentList(state, action: PayloadAction<IListItem>) {
      state.currentList = action.payload;
    },
    deleteList(state, action: PayloadAction<IListItem>) {
      state.lists = state.lists.filter((el) => el._id !== action.payload._id)
    },
    setInitialLists(state) {
      state.lists = [];
    },
    setIsShareUsersMenuOpen(state) {
      state.isShareUsersMenuOpen = !state.isShareUsersMenuOpen
    },
  },

  extraReducers(builder) {
    builder
      // .addCase(fetchAllLists.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(fetchAllLists.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.error = "";
      //   state.lists = action.payload;
      // })
      // .addCase(fetchAllLists.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload as string;
      // })

      .addCase(fetchAllUserLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUserLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.lists = action.payload;
      })
      .addCase(fetchAllUserLists.rejected, (state, action) => {
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

      .addCase(fetchEditList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEditList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.lists.map((el) => {
          if (el._id === action.payload._id) {
            Object.assign(el, action.payload);
          }
        });
      })
      .addCase(fetchEditList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // .addCase(fetchDeleteList.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(fetchDeleteList.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.error = "";
      //   console.log("del case")
      //   state.lists = state.lists.filter((el) => el._id !== action.payload._id);
      // })
      // .addCase(fetchDeleteList.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload as string;
      // })


  },
});

export const { addList, editList, setCurrentList, deleteList, setInitialLists, setIsShareUsersMenuOpen } = listsSlice.actions;

export default listsSlice.reducer;
