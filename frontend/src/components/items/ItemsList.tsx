import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAllSortedItems } from "../../store/reducers/actionsItemsCreators";
import { fetchAllUsers } from "../../store/reducers/actionUserCreators";
import { ShopItem } from "./ShopItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./stylesItems.css";

export function ItemsList() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.itemsReducer);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllSortedItems());
  }, []);

  return (
    <TransitionGroup>
      {items.map((el) => (
        <CSSTransition key={el.id} timeout={500} classNames="item">
          <ShopItem item={el} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
