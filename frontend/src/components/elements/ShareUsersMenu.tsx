import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ListItem from "@mui/material/ListItem";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { UserAvatar } from "../user/UserAvatar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setCurrentList,
  setIsShareUsersMenuOpen,
} from "../../store/reducers/listsSlice";
import Checkbox from "@mui/material/Checkbox";
import { useMemo, useState } from "react";
import { IListItem, IUserSharing } from "../../types";
import {
  fetchAllUserLists,
  fetchEditList,
} from "../../store/reducers/actionsListsCreators";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { manageSharedList, shareWithFriends } from "../../config-var";

export function ShareUsersMenu() {
  const dispatch = useAppDispatch();
  const { user, users } = useAppSelector((state) => state.userReducer);
  const { currentList } = useAppSelector((state) => state.listsReducer);
  const [checked, setChecked] = useState<IUserSharing[]>(
    currentList.usersSharing ? currentList.usersSharing : []
  );

  const isShared = useMemo(
    () => !!currentList.usersSharing?.length,
    [currentList.usersSharing?.length]
  );

  const isMyList = useMemo(
    () => user._id === currentList.userOwner,
    [user, currentList]
  );

  const usersData = useMemo(
    () =>
      isMyList
        ? [...users.filter((el) => el._id !== currentList.userOwner)]
        : [...users.filter((el) => el._id === user._id)],
    [user, currentList]
  );

  const onApplyClickHandle = () => {
    const listData: IListItem = { ...currentList };
    listData.usersSharing = checked;
    dispatch(fetchEditList(listData));
    dispatch(setCurrentList(listData));
    dispatch(fetchAllUserLists(user));
    dispatch(setIsShareUsersMenuOpen());
  };

  const onStopSharingClickHandle = () => {
    setChecked([]);
    const listData: IListItem = { ...currentList };
    listData.usersSharing = [];
    dispatch(fetchEditList(listData));
    dispatch(setCurrentList(listData));
    dispatch(setIsShareUsersMenuOpen());
  };

  const handleToggleUser = (value: string) => () => {
    const currentIndex = checked.findIndex((el) => el.userId === value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push({ userId: value });
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <Paper
      className="max-w-md min-w-[360px]  pb-6"
      elevation={12}
      sx={{ height: "calc(100vh - 72px)" }}
    >
      <div className="fixed top-0 right-0 left-0 bottom-0" />

      <MenuList>
        <ListItem
          secondaryAction={
            <Button
              variant="text"
              startIcon={<ArrowBackIosNewIcon color="warning" />}
              color="warning"
              onClick={() => dispatch(setIsShareUsersMenuOpen())}
            >
              Cancel
            </Button>
          }
        >
          <div className=" font-bold pl-2 text-lg">
            {isShared ? manageSharedList : shareWithFriends}
          </div>
        </ListItem>

        <Divider />

        <List
          sx={{
            width: "100%",
            position: "relative",
            overflow: "auto",
            maxHeight: `calc(100vh - ${isShared ? "246px" : "204px"})`,
          }}
        >
          {usersData.map((el) => {
            return (
              <ListItem key={el._id} disablePadding>
                <ListItemButton onClick={handleToggleUser(el._id)}>
                  <UserAvatar isUserActive={false} userAvatar={el.avatar} />
                  <ListItemText
                    sx={{ paddingX: "16px", wordBreak: "break-all" }}
                  >
                    {el._id === user._id ? `${el.name} (Me)` : el.name}
                  </ListItemText>

                  <Checkbox
                    edge="end"
                    checked={
                      checked.findIndex((e) => e.userId === el._id) !== -1
                    }
                    color="warning"
                    disableRipple
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider />

        {isShared && isMyList && (
          <div>
            <ListItem disablePadding>
              <Button
                fullWidth
                size="large"
                variant="text"
                color="error"
                onClick={onStopSharingClickHandle}
              >
                Stop Sharing
              </Button>
            </ListItem>
            <Divider />
          </div>
        )}
      </MenuList>
      {
        <div className="max-w-md min-w-[360px] w-full absolute bottom-6">
          <Divider />
          <ListItem disablePadding>
            <Button
              fullWidth
              size="large"
              variant="text"
              color="warning"
              onClick={onApplyClickHandle}
            >
              APPLY
            </Button>
          </ListItem>
          <Divider />
        </div>
      }
    </Paper>
  );
}
