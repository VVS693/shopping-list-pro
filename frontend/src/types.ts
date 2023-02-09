export interface IComment {
  idComment?: string;
  userId?: string;
  title?: string;
}

export interface IShopItem {
  id: string;
  completed: boolean;
  title: string;
  comments?: IComment[];
}

export interface IUser {
  _id: string;
  name: string;
  avatar: string;
}

export interface IUserName {
  _id: string;
  name: string;
}

export interface IUserAvatar {
  _id: string;
  avatar: string;
}

export interface IAvatarServerResponse {
  url: string;
  text: string;
}

export interface IUserLogin {
  name: string;
  password: string;
}

export interface IUserLoginResponse {
  _id: string;
  name: string;
  avatar: string;
  token: string;
}

export interface IUserNewPassword {
  _id: string;
  name: string;
  avatar: string;
  currentPassword: string;
  newPassword: string;
}

export interface IMessage {
  id: string;
  text: string;
  userId: string;
  creationTime?: string;
}

export interface IUsersOnline {
  userId: string;
  socketId: string;
}

export interface IUserSharing {
  id: string;
}

export interface IListItem {
  id: string;
  title: string;
  userOwner: string;
  usersSharing?: IUserSharing[];

  createdAt?: string;
  updatedAt?: string;
}
