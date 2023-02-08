import { useState } from "react";
import { IComment } from "../../types";
import { CommentEdit } from "./CommentEdit";
import { Commentitle } from "./CommentTitle";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { useAppSelector } from "../../hooks/redux";
import { UserAvatar } from "../user/UserAvatar";
import IconButton from "@mui/material/IconButton";

interface CommentItemProps {
  comment?: IComment;
  userAvatar?: string;
  onCommentEdit: (data: IComment) => void;
  onCommentDel: (idComment: string) => void;
  onCommentAdd: () => void;
  isAddIcon: boolean;
}

export function CommentItem({
  comment,
  userAvatar,
  onCommentEdit,
  onCommentDel,
  onCommentAdd,
  isAddIcon,
}: CommentItemProps) {
  const [edit, setEdit] = useState(false);

  const commentDelHadle = () => {
    if (typeof comment?.idComment === "string") {
      onCommentDel(comment.idComment);
    }
  };

  const commentEditHandle = (value: string) => {
    setEdit(false);
    const commentData: IComment = structuredClone(comment);
    commentData.title = value;
    onCommentEdit(commentData);
  };

  const { user } = useAppSelector((state) => state.userReducer);

  const classTitle: string = "pr-10 w-full min-w-[230px] select-none"
  const classTitleIcon: string = "pr-2 w-full min-w-[230px] select-none"

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center w-full pl-2 pr-1">
        <div className=" pb-1 pt-1 ml-3">
          <UserAvatar
            isUserActive={false}
            userAvatar={userAvatar}
            width={28}
            height={28}
          />
        </div>
        {edit ? (
          <CommentEdit
            title={comment?.title}
            editHandler={commentEditHandle}
            delHandler={commentDelHadle}
          />
        ) : (
          <div
          className={(isAddIcon && !edit) ? classTitleIcon  : classTitle}
          >
          <Commentitle
            title={comment?.title}
            editHandler={() => {
              if (comment?.userId === user._id) {
                setEdit(true);
              }
            }}
          />
          </div>


        )}
        {isAddIcon && !edit && (
          <IconButton  sx={{ padding: "4px" }} onClick={onCommentAdd}>
            <AddCommentOutlinedIcon className=" text-blue-gray-500" />
          </IconButton>
        )}

        
        
      </div>
    </div>
  );
}
