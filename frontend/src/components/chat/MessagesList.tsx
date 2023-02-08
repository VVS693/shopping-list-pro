import { useEffect } from "react";
import { animateScroll } from "react-scroll";
import { useAppSelector } from "../../hooks/redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./stylesMessages.css";
import { MessageOne } from "./MessageOne";
import { IMessage, IUser } from "../../types";

export function MessagesList() {
  const { messages } = useAppSelector((state) => state.messagesReducer);
  const { user, users, usersOnline } = useAppSelector(
    (state) => state.userReducer
  );

  const whoseMessage = (el: IMessage) => {
    const messageUser = users.find((item: IUser) => item._id === el.userId);
    const isUserActive = Boolean(
      usersOnline.find((el) => el.userId === messageUser?._id)
    );
    const whoseMessageData = {
      lefsideAvatar: messageUser?._id === user._id ? false : true,
      userAvatar: messageUser?.avatar,
      userName: messageUser?.name,
      creationTime: el.creationTime,
      isUserActive: isUserActive,
    };
    return whoseMessageData;
  };

  useEffect(() => {
    animateScroll.scrollToBottom({
      duration: 1000,
      smooth: "easeInQuad",
    });
  }, [messages]);

  return (
    <TransitionGroup>
      {messages.map((el) => (
        <CSSTransition key={el.id} timeout={500} classNames="item">
          <MessageOne userInfo={whoseMessage(el)} text={el.text} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
