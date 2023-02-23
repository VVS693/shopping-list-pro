export interface IComment {
  idComment?: string;
  userId?: string;
  title?: string;
}

export interface IShopItem {
  id: string;
  completed: boolean;
  title: string;
  listId: string
  userId?: string
  comments?: IComment[];
  createdAt?: string;
  updatedAt?: string;
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
  roomId: string
  creationTime?: string;
}

export interface IUsersOnline {
  userId: string;
  socketId: string;
  roomId: string
}

export interface IUsersJoinRoom {
  userId: string;
  roomId: string
}

export interface IUserTyping {
  userId: string;
  name: string
  roomId: string
}

export interface IUserSharing {
  userId: string;
}

export interface IListItem {
  _id: string
  // id: string;
  title: string;
  userOwner: string;
  usersSharing: IUserSharing[];
  createdAt?: string;
  updatedAt?: string;
}


