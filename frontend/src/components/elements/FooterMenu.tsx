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
import { showAddForm, showSearchForm } from "../../store/reducers/itemsSlice";
import { CSSTransition } from "react-transition-group";
import Divider from "@mui/material/Divider";
import "./stylesElements.css";

interface FooterMenuProps {
  onSearchValue?: (value: string) => void;
  onChatClick: () => void;
  onSortClick: () => void;
  onShowCommentsClick: () => void;
  onAddItemClick: (value: string) => void;
  onBackClick: () => void;
  isChatButtonActive: boolean;
}

export function FooterMenu({
  onSearchValue,
  onChatClick,
  onSortClick,
  onShowCommentsClick,
  onAddItemClick,
  onBackClick,
  isChatButtonActive,
}: FooterMenuProps) {
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { isAddFormVisible, isSearchFormVisible } = useAppSelector(
    (state) => state.itemsReducer
  );

  return (
    <>
      <CSSTransition
        in={isAddFormVisible}
        timeout={500}
        classNames="footer"
        unmountOnExit
      >
        <div className="z-40 fixed bottom-7 w-full max-w-md min-w-[360px] ">
          <AddItemMenu
            onAdd={(value) => {
              onAddItemClick(value);
            }}
            placeHolder="Add item..."
          />
        </div>
      </CSSTransition>

      <CSSTransition
        in={isSearchFormVisible}
        timeout={500}
        classNames="search"
        unmountOnExit
      >
        <div className="fixed bottom-20 w-full max-w-md min-w-[360px] border-t">
          <AddItemMenu onSearch={onSearchValue} placeHolder="Item search..." />
        </div>
      </CSSTransition>

      <div className="z-30 fixed w-full max-w-md min-w-[360px] bottom-0  bg-white">
        <Divider />
        <div className="flex justify-between px-4 pb-6 pt-[10px]">
          <IconButton onClick={onBackClick}>
            <ArrowBackIosNewIcon sx={{ fontSize: 30 }} color="action" />
          </IconButton>

          <IconButton disabled={!isChatButtonActive} onClick={onChatClick}>
            <QuestionAnswerOutlinedIcon
              sx={{ fontSize: 30 }}
              color={!isChatButtonActive ? "disabled" : "action"}
            />
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

          <IconButton
            onClick={() => dispatch(showSearchForm(!isSearchFormVisible))}
          >
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
            disabled={isAddFormVisible || isSearchFormVisible}
          >
            <AddOutlinedIcon
              sx={{ fontSize: 30 }}
              color={
                isAddFormVisible || isSearchFormVisible ? "disabled" : "action"
              }
            />
          </IconButton>
        </div>
      </div>
    </>
  );
}
