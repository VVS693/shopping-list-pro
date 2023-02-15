import { useEffect } from "react";
import { animateScroll } from "react-scroll";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchAddItems,
  fetchAllSortedItems,
} from "../../store/reducers/actionsItemsCreators";
import { fetchAllUsers } from "../../store/reducers/actionUserCreators";
import { addItemArray } from "../../store/reducers/itemsSlice";
import { IShopItem } from "../../types";
// import { AddItem } from "../elements/AddItemMenu";
import { ShopItem } from "../items/ShopItem";
import { v4 } from "uuid";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Collapse from '@mui/material/Collapse';
import "./stylesLists.css";
import { ItemTitle } from "../items/ItemTitle";
import { CommentItem } from "../comments/CommentItem";
import { MyListItem } from "./MyListItem";
import TextField from "@mui/material/TextField";
import { ItemsList } from "../items/ItemsList";
import { CategoryHeader } from "./CategoryHeader";
import { fetchAllLists } from "../../store/reducers/actionsListsCreators";

export function MyLists() {
  const dispatch = useAppDispatch();
  const { lists } = useAppSelector((state) => state.listsReducer);
  const { user } = useAppSelector((state) => state.userReducer);


  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllLists());
  }, []);


  return (
      <TransitionGroup>
        {lists.map((el) => (
          <Collapse key={el._id} timeout={{
            appear: 750,
            enter: 750,
            exit: 750,
          }}>

          {/* <CSSTransition key={el._id} timeout={500} classNames="list"> */}
            
            <MyListItem listItem={el} dateLabelMark="updatedAt" />
            
          {/* </CSSTransition> */}

          </Collapse>
        ))}
      </TransitionGroup>
  );
}
