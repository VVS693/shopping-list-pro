import { ErrorMessage } from "../components/elements/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Header } from "../components/elements/Header";
import { ChatFooter } from "../components/chat/ChatFooter";
import { useEffect } from "react";
import {
  disconnectSocket,
  initiateSocketConnection,
  newUser,
  sendMessage,
  messageResponse,
  usersOnlineResponse,
  joinListChat,
  userTypingResponse,
  userTyping,
} from "../socket.service";
import { IMessage, IUsersOnline, IUserTyping } from "../types";
import { v4 } from "uuid";
import { addMessage, clearAllMessages } from "../store/reducers/messagesSlice";
import { MessagesList } from "../components/chat/MessagesList";
import { useNavigate } from "react-router-dom";
import { setUsersOnline, setUserTyping } from "../store/reducers/usersSlice";
import { fetchAllMessages } from "../store/reducers/actionsMessagesCreators";
import Typography from "@mui/material/Typography";
import { ChatLabelMark } from "../components/chat/ChatLabelMark";

export function Chat() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector((state) => state.messagesReducer);

  const { user, usersOnline } = useAppSelector((state) => state.userReducer);

  const { currentList } = useAppSelector((state) => state.listsReducer);

  const onUserActive = () => {
    const isUserActive = Boolean(
      usersOnline.find(
        (el) => el.userId === user?._id && el.roomId === currentList._id
      )
    );
    return isUserActive;
  };

  const sendMessageHadle = (text: string) => {
    const messageData: IMessage = {
      id: v4(),
      text: text,
      userId: user._id,
      roomId: currentList._id,
      creationTime: new Date().toLocaleString("en-GB", {
        timeStyle: "short",
        dateStyle: "short",
      }),
    };
    sendMessage(messageData);
  };

  const onBackClickHandle = () => {
    navigate("/mylist");

    const userTypingData: IUserTyping = {
      userId: user._id,
      name: "",
      roomId: currentList._id,
    };
    userTyping(userTypingData);

    dispatch(clearAllMessages());
  };

  const TitleHeaderChat = () => {
    return (
      <div className="flex items-center py-1">
        <Typography variant="inherit" noWrap>
          {currentList?.title}
        </Typography>
      </div>
    );
  };

  useEffect(() => {
    if (currentList._id !== "") dispatch(fetchAllMessages(currentList._id));
    initiateSocketConnection();
    joinListChat(user._id, currentList._id);
    newUser(user._id, currentList._id);
    messageResponse((data: IMessage) => {
      dispatch(addMessage(data));
    });
    return () => {
      disconnectSocket();
    };
  }, [currentList]);

  useEffect(() => {
    // console.log("user online effect");
    usersOnlineResponse((data: IUsersOnline[]) => {
      dispatch(setUsersOnline(data));
    });

    userTypingResponse((data: IUserTyping) => {
      dispatch(setUserTyping(data));
    });
  }, []);

  return (
    <div className="container min-w-[360px] mx-auto max-w-md pb-20">
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <Header
          isLoading={isLoading}
          isUserActive={onUserActive()}
          title={<TitleHeaderChat />}
          listLabelMark={<ChatLabelMark />}
        />
      )}

      <MessagesList />

      <ChatFooter
        onSendClick={sendMessageHadle}
        onBackClick={onBackClickHandle}
      />
    </div>
  );
}
