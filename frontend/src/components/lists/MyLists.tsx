import { useAppSelector } from "../../hooks/redux";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import { MyListItem } from "./MyListItem";
import { CategoryHeader } from "./CategoryHeader";
import { useMemo } from "react";

interface MyListsProps {
  isSortedByTitle?: boolean;
}

export function MyLists({ isSortedByTitle }: MyListsProps) {
  const { lists } = useAppSelector((state) => state.listsReducer);
  const { user } = useAppSelector((state) => state.userReducer);

  const listUserOwnerData = useMemo(() => {
    const listsDataMy = lists.filter(
      (el) => el.userOwner === user._id && el.usersSharing.length === 0
    );
    const listsDataMyShared = lists.filter(
      (el) => el.userOwner === user._id && el.usersSharing.length !== 0
    );
    return isSortedByTitle
      ? [
          ...listsDataMy.sort((a, b) => {
            if (
              a.title > b.title &&
              a.usersSharing.length === b.usersSharing.length
            )
              return -1;
            return 0;
          }),
          ...listsDataMyShared.sort((a, b) => {
            if (a.title > b.title) return -1;
            return 0;
          }),
        ]
      : [
          ...listsDataMy.sort((a, b) => {
            if (
              a.title < b.title &&
              a.usersSharing.length === b.usersSharing.length
            )
              return -1;
            return 0;
          }),
          ...listsDataMyShared.sort((a, b) => {
            if (a.title < b.title) return -1;
            return 0;
          }),
        ];
  }, [user, lists, isSortedByTitle]);

  const listUsersSharingData = useMemo(() => {
    const listsData = lists.filter((el) => el.userOwner !== user._id);

    return isSortedByTitle
      ? listsData.sort((a, b) => {
          if (a.title > b.title) return -1;
          return 0;
        })
      : listsData.sort((a, b) => {
          if (a.title < b.title) return -1;
          return 0;
        });
  }, [user, lists, isSortedByTitle]);

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
