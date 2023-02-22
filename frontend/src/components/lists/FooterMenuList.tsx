import IconButton from "@mui/material/IconButton";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";

import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CommentsDisabledOutlinedIcon from "@mui/icons-material/CommentsDisabledOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { showAddForm } from "../../store/reducers/itemsSlice";
import { CSSTransition } from "react-transition-group";
import "./stylesLists.css";
import { AddItemMenu } from "../elements/AddItemMenu";
import Divider from "@mui/material/Divider";
import {ShareUsersMenu} from "../elements/ShareUsersMenu";
import Slide from "@mui/material/Slide";

interface FooterMenuListProps {
  onSortClick: () => void;
  onAddItemClick: (value: string) => void;
}

export function FooterMenuList({
  onSortClick,
  onAddItemClick,
}: FooterMenuListProps) {
  const [sortToggle, setSortToggle] = useState(true);
  const dispatch = useAppDispatch();
  const { isAddFormVisible } = useAppSelector((state) => state.itemsReducer);

  return (
    <>

      <CSSTransition
        in={isAddFormVisible}
        timeout={500}
        classNames="footerList"
        unmountOnExit
      >
        <div className="z-0 fixed bottom-20 w-full max-w-md min-w-[360px] border-t">
          <AddItemMenu
            onAdd={(value) => {
              onAddItemClick(value);
            }}
          />
        </div>
      </CSSTransition>

      <div className="z-40 fixed w-full max-w-md min-w-[360px] bottom-0  bg-white">
      <Divider />
        <div className="flex justify-between px-4 pb-6 pt-[10px]">

          <IconButton onClick={() => {}} disabled>
            <MenuOutlinedIcon
              sx={{ fontSize: 30 }}
              // color="action"
              color="disabled"
            />
          </IconButton>

          <IconButton onClick={() => {}} disabled>
            <SearchOutlinedIcon
              sx={{ fontSize: 30 }}
              // color="action"
              color="disabled"
            />
          </IconButton>

          <IconButton
            onClick={() => {
              setSortToggle(!sortToggle);
              onSortClick();
            }}
          >
            {!sortToggle ? (
              <SortOutlinedIcon
                sx={{ fontSize: 30 }}
                color="action"
              />
            ) : (
              <SortOutlinedIcon
                sx={{ fontSize: 30, transform: "scaleY(-1)" }}
                color="action"
              />
            )}
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
