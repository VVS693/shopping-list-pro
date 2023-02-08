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
} from "../socket.service";
import { IMessage, IUsersOnline } from "../types";
import { v4 } from "uuid";
import { addMessage } from "../store/reducers/messagesSlice";
import { MessagesList } from "../components/chat/MessagesList";
import {
  fetchAllUsers,
  fetchUserMe,
} from "../store/reducers/actionUserCreators";
import { useNavigate } from "react-router-dom";
import { setUsersOnline } from "../store/reducers/usersSlice";
import { fetchAllMessages } from "../store/reducers/actionsMessagesCreators";

export function Chat() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector((state) => state.messagesReducer);

  const { isAuth, user, usersOnline } = useAppSelector(
    (state) => state.userReducer
  );

  const onUserActive = () => {
    const isUserActive = Boolean(
      usersOnline.find((el) => el.userId === user?._id)
    );
    return isUserActive;
  };

  useEffect(() => {
    if (isAuth) {
      console.log("effect all");
      dispatch(fetchUserMe());
      dispatch(fetchAllUsers());
      dispatch(fetchAllMessages());
      initiateSocketConnection();
      newUser(user._id);
      messageResponse((data: IMessage) => {
        dispatch(addMessage(data));
      });
    }
    return () => {
      disconnectSocket();
    };
  }, [isAuth]);

  useEffect(() => {
    console.log("user online effect");
    usersOnlineResponse((data: IUsersOnline[]) => {
      dispatch(setUsersOnline(data));
    });
  }, []);

  const sendMessageHadle = (text: string) => {
    const messageData: IMessage = {
      id: v4(),
      text: text,
      userId: user._id,
      creationTime: new Date().toLocaleString("en-GB", {
        timeStyle: "short",
        dateStyle: "short",
      }),
    };
    sendMessage(messageData);
  };

  return (
    <div className="container mx-auto max-w-sm pb-20">
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <Header
          isLoading={isLoading}
          isUserActive={onUserActive()}
          title="Live Shopping Chat"
        />
      )}

      <MessagesList />

      <ChatFooter
        onSendClick={sendMessageHadle}
        onBackClick={() => navigate("/")}
      />
    </div>
  );
}
