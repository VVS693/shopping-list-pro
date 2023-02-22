import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IAvatarServerResponse,
  IUser,
  IUserAvatar,
  IUserLogin,
  IUserLoginResponse,
  IUserName,
  IUserNewPassword,
} from "../../types";
import { clientDatabase } from "../axios";

export const fetchUserRegister = createAsyncThunk(
  "fetchUserRegister",
  async (regData: IUserLogin, thunkAPI) => {
    try {
      const response = await clientDatabase.post<IUserLoginResponse>(
        "/auth/register",
        regData
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchUserLogin = createAsyncThunk(
  "fetchUserLogin",
  async (authData: IUserLogin, thunkAPI) => {
    try {
      const response = await clientDatabase.post<IUserLoginResponse>(
        "/auth/login",
        authData
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserMe = createAsyncThunk(
  "fetchUserMe",
  async (_, thunkAPI) => {
    try {
      const response = await clientDatabase.get<IUser>("/auth/me");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("No access!");
    }
  }
);


export const fetchAllUsers = createAsyncThunk(
  "fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await clientDatabase.get<IUser[]>("/auth/all");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error loading all users...");
    }
  }
);

export const fetchUploadUserAvatar = createAsyncThunk(
  "fetchUploadUserAvatar",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await clientDatabase.post<IAvatarServerResponse>(
        "/avatars",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error loading...");
    }
  }
);

export const delOldUserAvatar = createAsyncThunk(
  "delOldUserAvatar",
  async (oldUrl: string, thunkAPI) => {
    try {
      const response = await clientDatabase.delete<string>(
        `/avatars/${oldUrl}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error delete...");
    }
  }
);

export const fetchUserUpdateName = createAsyncThunk(
  "fetchUserUpdateName",
  async (userData: IUserName, thunkAPI) => {
    try {
      const response = await clientDatabase.patch<IUserName>("/auth/update/name", userData);
      return response.data;
    } catch (err: any) {
      // return thunkAPI.rejectWithValue("Error update user name...");
      return thunkAPI.rejectWithValue(err.response.data.message as string);
    }
  }
);

export const fetchUserUpdateAvatar = createAsyncThunk(
  "fetchUserUpdateAvatar",
  async (userData: IUserAvatar, thunkAPI) => {
    try {
      await clientDatabase.patch("/auth/update/avatar", userData);
      return userData;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error update user avatar...");
    }
  }
);

export const fetchUserNewPassword = createAsyncThunk(
  "fetchUserNewPassword",
  async (userData: IUserNewPassword, thunkAPI) => {
    try {
      await clientDatabase.patch("/auth/password", userData);
      return;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
