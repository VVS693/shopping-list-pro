import { useAppSelector } from "../../hooks/redux";
import { ShopItem } from "./ShopItem";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

interface ItemsListProps {
  searchByValue?: string;
}

export function ItemsList({ searchByValue }: ItemsListProps) {
  const { items } = useAppSelector((state) => state.itemsReducer);
  let itemsDataSearch = [...items];
  if (searchByValue && searchByValue.trim().length !== 0) {
    itemsDataSearch = items.filter((el) =>
      el.title.toLowerCase().includes(searchByValue.toLowerCase())
    );
  }
  return (
    <TransitionGroup>
      {itemsDataSearch.map((el) => (
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
      ))}
    </TransitionGroup>
  );
}
