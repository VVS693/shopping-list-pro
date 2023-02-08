import { AddItemMenu } from "./AddItemMenu";
import IconButton from "@mui/material/IconButton";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CommentsDisabledOutlinedIcon from "@mui/icons-material/CommentsDisabledOutlined";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { showAddForm } from "../../store/reducers/itemsSlice";
import { CSSTransition } from "react-transition-group";
import "./stylesFooterMenu.css";

interface FooterMenuProps {
  onChatClick: () => void;
  onSortClick: () => void;
  onShowCommentsClick: () => void;
  onAddItemClick: (value: string) => void;
}

export function FooterMenu({
  onChatClick,
  onSortClick,
  onShowCommentsClick,
  onAddItemClick,
}: FooterMenuProps) {
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { isAddFormVisible } = useAppSelector((state) => state.itemsReducer);

  return (
    <>
      <CSSTransition
        in={isAddFormVisible}
        timeout={700}
        classNames="footer"
        unmountOnExit
      >
        <div className="z-0 fixed bottom-20 w-full max-w-md min-w-[375px] border-t">
          <AddItemMenu
            onAdd={(value) => {
              onAddItemClick(value);
            }}
          />
        </div>
      </CSSTransition>

      <div className="z-50 fixed w-full max-w-md min-w-[375px] bottom-0 border-t bg-white">
        <div className="flex justify-around px-4 pb-6 pt-[4px]">
          <IconButton onClick={onChatClick}>
            <QuestionAnswerOutlinedIcon
              sx={{ fontSize: 30 }}
              className="text-blue-gray-800"
            />
          </IconButton>

          <IconButton onClick={() => {}}>
            <IosShareOutlinedIcon
              sx={{ fontSize: 30, mb: "6px" }}
              className="text-blue-gray-800"
            />
          </IconButton>

          <IconButton
            onClick={() => {
              setCommentsVisible(!isCommentsVisible);
              onShowCommentsClick && onShowCommentsClick();
            }}
          >
            {!isCommentsVisible ? (
              <CommentOutlinedIcon
                sx={{ fontSize: 30 }}
                className="text-blue-gray-800"
              />
            ) : (
              <CommentsDisabledOutlinedIcon
                sx={{ fontSize: 30 }}
                className="text-blue-gray-800"
              />
            )}
          </IconButton>

          <IconButton onClick={onSortClick}>
            <FilterListOutlinedIcon
              sx={{ fontSize: 30 }}
              className="text-blue-gray-800"
            />
          </IconButton>

          <IconButton
            onClick={() => dispatch(showAddForm(true))}
            disabled={isAddFormVisible}
          >
            <AddOutlinedIcon
              sx={{ fontSize: 30 }}
              className="text-blue-gray-800"
            />
          </IconButton>
        </div>
      </div>
    </>
  );
}
