import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUsersOnline, IUserTyping } from "../../types";
import {
  fetchAllUsers,
  fetchUserLogin,
  fetchUserMe,
  fetchUserNewPassword,
  fetchUserRegister,
  fetchUserUpdateAvatar,
  fetchUserUpdateName,
} from "./actionUserCreators";

interface UserState {
  user: IUser;
  users: IUser[];
  usersOnline: IUsersOnline[];
  userTyping: IUserTyping;
  isLoading: boolean;
  error: string;
  isAuth: boolean;
  isAlertDialogOpen: boolean;
  alertDialogText: string;
}

const initialState: UserState = {
  user: { _id: "", name: "", avatar: " " },
  users: [],
  usersOnline: [],
  userTyping: { userId: "", name: "", roomId: "" },
  isLoading: false,
  error: "",
  isAuth: false,
  isAlertDialogOpen: false,
  alertDialogText: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    defaultAvatarImage(state, action: PayloadAction<{ avatar: string }>) {
      state.user.avatar = action.payload.avatar;
    },
    authReset(state) {
      state.isAuth = false;
    },
    setUsersOnline(state, action: PayloadAction<IUsersOnline[]>) {
      state.usersOnline = action.payload;
    },
    setUserTyping(state, action: PayloadAction<IUserTyping>) {
      state.userTyping = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchUserRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user = action.payload;
        window.localStorage.setItem("token", action.payload.token)
        // state.isAuth = true;
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.error.message as string;
        state.error = action.payload as string
        state.isAuth = false;
      })

      .addCase(fetchUserLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user = action.payload;
        window.localStorage.setItem("token", action.payload.token)
        state.isAuth = true;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.error.message as string;
        state.error = action.payload as string
        state.isAuth = false;
      })

      .addCase(fetchUserMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUserMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        state.isAuth = false;
      })

      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        state.isAuth = false;
      })

      .addCase(fetchUserUpdateName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserUpdateName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user.name = action.payload.name;
      })
      .addCase(fetchUserUpdateName.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.error.message as string;
        state.error = action.payload as string;
      })

      .addCase(fetchUserUpdateAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserUpdateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user.avatar = action.payload.avatar;
      })
      .addCase(fetchUserUpdateAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })

      .addCase(fetchUserNewPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserNewPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(fetchUserNewPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { defaultAvatarImage, authReset, setUsersOnline, setUserTyping } =
  usersSlice.actions;

export default usersSlice.reducer;
