import { useAppSelector } from "../../hooks/redux";
import { ShopItem } from "./ShopItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import "./stylesItems.css";

export function ItemsList() {
  const { items } = useAppSelector((state) => state.itemsReducer);

  return (
    <TransitionGroup>
      {items.map((el) => (
        // <CSSTransition key={el.id} timeout={750} classNames="item">

        <Collapse
          key={el.id}
          timeout={{
            appear: 750,
            enter: 750,
            exit: 750,
          }}
        >
          <ShopItem item={el} />
        </Collapse>

        // {/* </CSSTransition>  */}
      ))}
    </TransitionGroup>
  );
}
