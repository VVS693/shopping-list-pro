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
import "./stylesLists.css";
import { ItemTitle } from "../items/ItemTitle";
import { CommentItem } from "../comments/CommentItem";
import { MyListItem } from "./MyListItem";
import TextField from "@mui/material/TextField";
import { ItemsList } from "../items/ItemsList";

export function MyLists() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.itemsReducer);

  const onAddItemHandler = (value: string) => {
    animateScroll.scrollToBottom({
      duration: 1500,
      smooth: "easeInQuad",
    });

    const itemData: IShopItem = {
      id: v4(),
      completed: false,
      title: value,
    };
    dispatch(addItemArray(itemData));
    dispatch(fetchAddItems(itemData));
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllSortedItems());
  }, []);

  const tempList = {
    id: "12345",
    title: "jfwojfwjfwljffwjwlfjwwfjwljflwjflwfjwlfjwlf",
    userOwner: "63c8038f240821b739229331",
  };

  return (
    <>
      <TransitionGroup>
        {/* {items.map((el) => (
          <CSSTransition key={el.id} timeout={500} classNames="list">
            <ShopItem item={el} />
          </CSSTransition>
        ))} */}

        <MyListItem listItem={tempList} onListDel={() => {}} onListEdit={() => {}}/>

        <MyListItem listItem={tempList} onListDel={() => {}} onListEdit={() => {}}/>

        <MyListItem listItem={tempList} onListDel={() => {}} onListEdit={() => {}}/>

        <ItemsList />


      </TransitionGroup>

      {/* <AddItem onAdd={onAddItemHandler} /> */}
    </>
  );
}
