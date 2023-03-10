import {
  fetchAllSortedItems,
  fetchAllSortedItemsByListId,
} from "./actionsItemsCreators";
import { IShopItem } from "./../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemsState {
  items: IShopItem[];
  isLoading: boolean;
  error: string;
  isShowComments: boolean;
  isAddFormVisible: boolean;
  isSearchFormVisible: boolean;
}

const initialState: ItemsState = {
  items: [],
  isLoading: false,
  error: "",
  isShowComments: false,
  isAddFormVisible: false,
  isSearchFormVisible: false
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    showSearchForm(state, action: PayloadAction<boolean>) {
      state.isSearchFormVisible = action.payload;
    },
    showAddForm(state, action: PayloadAction<boolean>) {
      state.isAddFormVisible = action.payload;
    },
    showAllComments(state) {
      state.isShowComments = !state.isShowComments;
    },

    deleteItemArray(state, action: PayloadAction<IShopItem>) {
      state.items = state.items.filter((el) => el.id !== action.payload.id);
    },

    editItemArray(state, action: PayloadAction<IShopItem>) {
      state.items.map((el) => {
        if (el.id === action.payload.id) {
          Object.assign(el, action.payload);
        }
      });
    },

    addItemArray(state, action: PayloadAction<IShopItem>) {
      state.items.push(action.payload);
    },

    // sortItemsArray(state) {
      // state.items = state.items.sort((a, b) => {
      //   if (a.completed < b.completed) return -1;
      //   return 0;
      // });
    // },
    sortItemsArray(state) {
      state.items = state.items.filter((el) => el.completed === true);
    },

    setInitialItems(state) {
      state.items = [];
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchAllSortedItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSortedItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.items = action.payload;
      })
      .addCase(fetchAllSortedItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchAllSortedItemsByListId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSortedItemsByListId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.items = action.payload;
      })
      .addCase(fetchAllSortedItemsByListId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  deleteItemArray,
  sortItemsArray,
  editItemArray,
  addItemArray,
  showAllComments,
  showAddForm,
  setInitialItems,
  showSearchForm
} = itemsSlice.actions;

export default itemsSlice.reducer;
