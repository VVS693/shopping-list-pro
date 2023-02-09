import { AddItemMenu } from "./AddItemMenu";
import IconButton from "@mui/material/IconButton";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CommentsDisabledOutlinedIcon from "@mui/icons-material/CommentsDisabledOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
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
        <div className="flex justify-between px-4 pb-6 pt-[10px]">
          <IconButton onClick={() => {}}>
            <ArrowBackIosNewIcon sx={{ fontSize: 30 }} color="action" />
          </IconButton>

          <IconButton onClick={onChatClick}>
            <QuestionAnswerOutlinedIcon sx={{ fontSize: 30 }} color="action" />
          </IconButton>

          <IconButton
            onClick={() => {
              setCommentsVisible(!isCommentsVisible);
              onShowCommentsClick();
            }}
          >
            {!isCommentsVisible ? (
              <CommentOutlinedIcon sx={{ fontSize: 30 }} color="action" />
            ) : (
              <CommentsDisabledOutlinedIcon
                sx={{ fontSize: 30 }}
                color="action"
              />
            )}
          </IconButton>

          <IconButton onClick={() => {}}>
            <SearchOutlinedIcon sx={{ fontSize: 30 }} color="action" />
          </IconButton>

          <IconButton onClick={onSortClick}>
            <SortOutlinedIcon
              sx={{ fontSize: 30, transform: "scaleY(-1)" }}
              color="action"
            />
          </IconButton>

          <IconButton
            onClick={() => dispatch(showAddForm(true))}
            disabled={isAddFormVisible}
          >
            <AddOutlinedIcon
              sx={{ fontSize: 30 }}
              color={isAddFormVisible ? "disabled" : "action"}
            />
          </IconButton>
        </div>
      </div>
    </>
  );
}
