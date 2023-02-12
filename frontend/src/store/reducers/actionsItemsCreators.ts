import { createAsyncThunk } from "@reduxjs/toolkit";
import { IListItem, IShopItem } from "../../types";
import { clientDatabase } from "../axios";

export const fetchAllSortedItems = createAsyncThunk(
  "fetchAllSortedItems",
  async (_, thunkAPI) => {
    try {
      const response = await clientDatabase.get<IShopItem[]>("items");
      const dataSorted = response.data.sort((a, b) => {
        if (a.completed < b.completed) return -1;
        return 0;
      });
      return dataSorted;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error loading...");
    }
  }
);

export const fetchDeleteItems = createAsyncThunk(
  "deleteItem",
  async (item: IShopItem, thunkAPI) => {
    try {
      await clientDatabase.delete<IShopItem>(`items/${item.id}`);
      return item;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error delete item...");
    }
  }
);

export const fetchEditItems = createAsyncThunk(
  "editItem",
  async (item: IShopItem, thunkAPI) => {
    try {
      await clientDatabase.patch<IShopItem>(`items/${item.id}`, item);
      return item;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error edit item...");
    }
  }
);

export const fetchAddItems = createAsyncThunk(
  "addItem",
  async (item: IShopItem, thunkAPI) => {
    try {
      await clientDatabase.post<IShopItem>("items", item);
      return item;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error add item...");
    }
  }
);

export const fetchAllSortedItemsByListId = createAsyncThunk(
  "fetchAllSortedItemsByListId",
  async (listId: string, thunkAPI) => {
    try {
      const response = await clientDatabase.get<IShopItem[]>(`items/lists/${listId}`);
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue("Error loading...");
    }
  }
);
