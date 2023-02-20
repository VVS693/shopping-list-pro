import { createAsyncThunk } from "@reduxjs/toolkit";
import { IListItem, IUser } from "../../types";
import { clientDatabase } from "../axios";

// export const fetchAllSortedItems = createAsyncThunk(
//   "items/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const response = await clientDatabase.get<IShopItem[]>("items");
//       const dataSorted = response.data.sort((a, b) => {
//         if (a.completed < b.completed) return -1;
//         return 0;
//       });
//       return dataSorted;
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Error loading...");
//     }
//   }
// );

// export const fetchDeleteItems = createAsyncThunk(
//   "deleteItem",
//   async (item: IShopItem, thunkAPI) => {
//     try {
//       await clientDatabase.delete<IShopItem>(`items/${item.id}`);
//       return item;
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Error delete item...");
//     }
//   }
// );

export const fetchAllLists = createAsyncThunk(
  "fetchAllLists",
  async (_, thunkAPI) => {
    try {
      const response = await clientDatabase.get<IListItem[]>("lists");
      
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error loading all lists...");
    }
  }
);

export const fetchAllUserLists = createAsyncThunk(
  "fetchAllUserLists",
  async (user: IUser, thunkAPI) => {
    try {
      const response = await clientDatabase.get<IListItem[]>(`lists/${user._id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error loading all User's lists...");
    }
  }
);

export const fetchAddList = createAsyncThunk(
  "fetchAddList",
  async (list: IListItem, thunkAPI) => {
    try {
      const response = await clientDatabase.post<IListItem>("lists", list);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error add list...");
    }
  }
);

export const fetchEditList = createAsyncThunk(
  "fetchEditList",
  async (list: IListItem, thunkAPI) => {
    try {
      const response = await clientDatabase.patch<IListItem>(
        `lists/${list._id}`,
        list
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error edit list...");
    }
  }
);

export const fetchDeleteList = createAsyncThunk(
  "fetchDeleteList",
  async (list: IListItem, thunkAPI) => {
    try {
      const response = await clientDatabase.delete<IListItem>(`lists/${list._id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error delete list...");
    }
  }
);

export const fetchAmountDocsByListId = createAsyncThunk(
  "fetchAmountDocsByListId",
  async (list: IListItem, thunkAPI) => {
    try {
      const response = await clientDatabase.get<IListItem>(`lists/count/${list._id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error to count elements of list...");
    }
  }
);

export const fetchLatestUpdateOfDocsByListId = createAsyncThunk(
  "fetchLatestUpdateOfDocsByListId",
  async (list: IListItem, thunkAPI) => {
    try {
      const response = await clientDatabase.get<IListItem>(`lists/updated/${list._id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error to get last updated element of list...");
    }
  }
);

export const fetchCreatedDateByListId = createAsyncThunk(
  "fetchCreatedDateByListId",
  async (list: IListItem, thunkAPI) => {
    try {
      const response = await clientDatabase.get<IListItem>(`lists/created/${list._id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error to get created date of list...");
    }
  }
);