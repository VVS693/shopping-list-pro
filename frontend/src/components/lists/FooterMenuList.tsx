import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { showAddForm, showSearchForm } from "../../store/reducers/itemsSlice";
import { CSSTransition } from "react-transition-group";
import "./stylesLists.css";
import { AddItemMenu } from "../elements/AddItemMenu";
import Divider from "@mui/material/Divider";

interface FooterMenuListProps {
  onSearchValue?: (value: string) => void;
  onSortClick: () => void;
  onAddItemClick: (value: string) => void;
}

export function FooterMenuList({
  onSearchValue,
  onSortClick,
  onAddItemClick,
}: FooterMenuListProps) {
  const [sortToggle, setSortToggle] = useState(true);
  const dispatch = useAppDispatch();
  const { isAddFormVisible, isSearchFormVisible } = useAppSelector(
    (state) => state.itemsReducer
  );

  return (
    <>
      <CSSTransition
        in={isAddFormVisible}
        timeout={500}
        classNames="footerList"
        unmountOnExit
      >
        <div className="z-40 fixed bottom-7 w-full max-w-md min-w-[360px] border-t">
          <AddItemMenu
            onAdd={(value) => {
              onAddItemClick(value);
            }}
            placeHolder="Add new list..."
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
          <AddItemMenu onSearch={onSearchValue} placeHolder="List search..." />
        </div>
      </CSSTransition>

      <div className="z-30 fixed w-full max-w-md min-w-[360px] bottom-0  bg-white">
        <Divider />
        <div className="flex justify-between px-4 pb-6 pt-[10px]">
          <IconButton onClick={() => {}} disabled>
            <MenuOutlinedIcon
              sx={{ fontSize: 30 }}
              // color="action"
              color="disabled"
            />
          </IconButton>

          <IconButton
            onClick={() => dispatch(showSearchForm(!isSearchFormVisible))}
            disabled={isAddFormVisible}
          >
            <SearchOutlinedIcon
              sx={{ fontSize: 30 }}
              color={isAddFormVisible ? "disabled" : "action"}
            />
          </IconButton>

          <IconButton
            onClick={() => {
              setSortToggle(!sortToggle);
              onSortClick();
            }}
            disabled={isAddFormVisible}
          >
            {!sortToggle ? (
              <SortOutlinedIcon
                sx={{ fontSize: 30 }}
                color={isAddFormVisible ? "disabled" : "action"}
              />
            ) : (
              <SortOutlinedIcon
                sx={{ fontSize: 30, transform: "scaleY(-1)" }}
                color={isAddFormVisible ? "disabled" : "action"}
              />
            )}
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
