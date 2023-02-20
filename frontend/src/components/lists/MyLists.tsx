import { useAppSelector } from "../../hooks/redux";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import { MyListItem } from "./MyListItem";
import { CategoryHeader } from "./CategoryHeader";
import { useMemo } from "react";

export function MyLists() {
  const { lists } = useAppSelector((state) => state.listsReducer);
  const { user } = useAppSelector((state) => state.userReducer);

  const listUserOwnerData = useMemo(
    () => lists.filter((el) => el.userOwner === user._id),
    [user, lists]
  );

  const listUsersSharingData = useMemo(
    () => lists.filter((el) => el.userOwner !== user._id),
    [user, lists]
  );

  return (
    <TransitionGroup>
      {listUserOwnerData.map((el, index) => (
        <Collapse
          key={el._id}
          timeout={{
            appear: 750,
            enter: 750,
            exit: 750,
          }}
        >
          {index === 0 && <CategoryHeader title="My Lists" />}
          <MyListItem listItem={el} dateLabelMark="updatedAt" />
        </Collapse>
      ))}

      {listUsersSharingData.map((el, index) => (
        <Collapse
          key={el._id}
          timeout={{
            appear: 750,
            enter: 750,
            exit: 750,
          }}
        >
          {index === 0 && <CategoryHeader title="Friends Lists" />}
          <MyListItem listItem={el} dateLabelMark="updatedAt" />
        </Collapse>
      ))}
    </TransitionGroup>
  );
}
