import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { IComment, IUser } from "../../types";
import { CommentAdd } from "./CommentAdd";
import { CommentItem } from "./CommentItem";
import { v4 } from "uuid";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import "./stylesComment.css";

interface CommentsListProps {
  comments?: IComment[];
  onCommentsUpdate: (data: IComment[]) => void;
  onAddNewComment: boolean;
  onAddNewCommentCancel: () => void;
}

export function CommentsList({
  comments,
  onCommentsUpdate,
  onAddNewComment,
  onAddNewCommentCancel,
}: CommentsListProps) {
  const { user, users } = useAppSelector((state) => state.userReducer);

  const commentEditHandle = (commentData: IComment) => {
    const allCommentsData: IComment[] = structuredClone(comments);
    allCommentsData.map((el: IComment) => {
      if (el.idComment === commentData.idComment) {
        el.title = commentData.title;
      }
    });
    onCommentsUpdate(allCommentsData);
  };

  const commentDelHandle = (idComment: string) => {
    const allCommentsData: IComment[] = structuredClone(comments);
    allCommentsData.map((el: IComment, index) => {
      if (el.idComment === idComment) {
        allCommentsData.splice(index, 1);
      }
    });
    onCommentsUpdate(allCommentsData);
  };

  const commentAddVisible = () => {
    setIsAddVisible(true);
  };

  const onCommentAddValueHandler = (value: string) => {
    if (value.trim().length === 0) {
      setIsAddVisible(false);
      onAddNewCommentCancel();
      return;
    }
    const allCommentsData: IComment[] = structuredClone(comments);
    const commentData: IComment = {
      idComment: v4(),
      title: value,
      userId: user._id,
    };
    const commentDataFirst: IComment[] = [
      {
        idComment: v4(),
        title: value,
        userId: user._id,
      },
    ];

    if (allCommentsData) {
      allCommentsData.push(commentData);
      onCommentsUpdate(allCommentsData);
    } else {
      onCommentsUpdate(commentDataFirst);
    }

    setIsAddVisible(false);
  };

  const [isAddVisible, setIsAddVisible] = useState(onAddNewComment);

  useEffect(() => setIsAddVisible(onAddNewComment), [onAddNewComment]);

  const userAvatarSearch = (el: IComment) => {
    const commentsUser = users.find((item: IUser) => item._id === el.userId);
    return commentsUser?.avatar;
  };
  return (
    <div className="w-full">
      <TransitionGroup>
        {comments?.map((el, index) => (
          <CSSTransition key={el.idComment} timeout={500} classNames="comment">

          {/* // <Collapse
            // key={el.idComment}
            // timeout={{
            //   appear: 750,
            //   enter: 750,
            //   exit: 750,
            // }}
          // > */}

            <CommentItem
              comment={el}
              userAvatar={userAvatarSearch(el)}
              onCommentEdit={commentEditHandle}
              onCommentDel={commentDelHandle}
              onCommentAdd={commentAddVisible}
              isAddIcon={index + 1 === comments?.length ? true : false}
              // key={el.idComment}
            />
          {/* // </Collapse> */}

          </CSSTransition>
        ))}
      </TransitionGroup>

      <CommentAdd
        onCommentAddValue={onCommentAddValueHandler}
        isAddVisible={isAddVisible}
      />
    </div>
  );
}
