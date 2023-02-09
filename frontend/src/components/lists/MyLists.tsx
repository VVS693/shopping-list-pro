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

  const tempListOwn = {
    id: "12345",
    title: "jfwojfwjfwljffwjwlfjwwfjwljflwjflwfjwlqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqfjwlf",
    userOwner: "63c8038f240821b739229331",
  };

  const tempListShared = {
    id: "12345",
    title: "Test Test Test Test Test Test Test Testwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ",
    userOwner: "63d78283d588b3c6c3763fa3",
  };

  const tempListArchived = {
    id: "12345",
    title: "twwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ",
    userOwner: "63c8038f240821b739229331",
  };

  return (
    <>


      <TransitionGroup>
        {lists.map((el) => (
          <CSSTransition key={el.id} timeout={500} classNames="list">


            <MyListItem listItem={el} onListDel={() => {}} onListEdit={() => {}}/>


          </CSSTransition>
        ))}








          {/* <CategoryHeader title="My Personal Lists:"/>

        <MyListItem listItem={tempListOwn} onListDel={() => {}} onListEdit={() => {}}/>

        <MyListItem listItem={tempListOwn} onListDel={() => {}} onListEdit={() => {}}/>

        <MyListItem listItem={tempListOwn} onListDel={() => {}} onListEdit={() => {}}/>

        <CategoryHeader title="My Shared Lists:"/>

        <MyListItem listItem={tempListShared} onListDel={() => {}} onListEdit={() => {}}/>

        <MyListItem listItem={tempListShared} onListDel={() => {}} onListEdit={() => {}}/>

        <MyListItem listItem={tempListShared} onListDel={() => {}} onListEdit={() => {}}/>

        <CategoryHeader title="Archived Lists:"/>

        <MyListItem listItem={tempListArchived} onListDel={() => {}} onListEdit={() => {}}/>

        <MyListItem listItem={tempListArchived} onListDel={() => {}} onListEdit={() => {}}/>

        <MyListItem listItem={tempListArchived} onListDel={() => {}} onListEdit={() => {}}/> */}



      </TransitionGroup>

      {/* <AddItem onAdd={onAddItemHandler} /> */}
    </>
  );
}
