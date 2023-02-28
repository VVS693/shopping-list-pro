import { ErrorMessage } from "../components/elements/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAllSortedItems } from "../store/reducers/actionsItemsCreators";
import {
  showAllComments,
  showSearchForm,
  sortItemsArray,
} from "../store/reducers/itemsSlice";
import { Header } from "../components/elements/Header";
import { animateScroll } from "react-scroll";
import { FooterMenu } from "../components/elements/FooterMenu";
import { ItemsList } from "../components/items/ItemsList";
import {
  fetchAllUsers,
  fetchUserMe,
} from "../store/reducers/actionUserCreators";
import { useNavigate } from "react-router-dom";
import { MyLists } from "../components/lists/MyLists";
import { FooterMenuList } from "../components/lists/FooterMenuList";
import { v4 } from "uuid";
import { IListItem } from "../types";
import { addList } from "../store/reducers/listsSlice";
import {
  fetchAddList,
  fetchAllLists,
  fetchAllUserLists,
} from "../store/reducers/actionsListsCreators";
import { ShareUsersMenu } from "../components/elements/ShareUsersMenu";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useRef, useState } from "react";
import { useListData } from "../hooks/listHooks";
import Fade from "@mui/material/Fade";
import { ListLabelMark } from "../components/lists/ListLabelMark";
import { Greeting } from "../components/lists/Greeting";
// import { useAmountDocsOfList } from "../hooks/listHooks";

export function AllLists() {
  const shareUserMenuRef = useRef(null);
  const dispatch = useAppDispatch();
  const { isLoading, error, isShareUsersMenuOpen, currentList, lists } =
    useAppSelector((state) => state.listsReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const { isSearchFormVisible } = useAppSelector((state) => state.itemsReducer);
  const { amountElements, createdAt, updatedAt } = useListData(currentList);
  const [isSortedByTitle, setIsSortedByTitle] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onSortHandler = () => {
    dispatch(fetchAllUserLists(user));
    animateScroll.scrollToTop({
      duration: 1000,
      smooth: "easeInQuad",
    });
    setIsSortedByTitle(!isSortedByTitle);
  };

  const onAddListHandler = (value: string) => {
    const listData: IListItem = {
      _id: v4(),
      title: value,
      userOwner: user._id,
      usersSharing: [],
    };
    dispatch(fetchAddList(listData));
    dispatch(fetchAllUserLists(user));
  };

  const TitleHeaderPro = () => {
    return <div className="flex items-center py-1">Shopping List Pro</div>;
  };

  const TitleHeaderList = () => {
    return (
      <div className="flex items-center py-1">
        <Typography variant="inherit" noWrap>
          {currentList?.title}
        </Typography>
      </div>
    );
  };

  const ListLabelMarkAll = () => {
    return (
      <ListLabelMark
        updated={{
          updatedAt: updatedAt === "" ? createdAt : updatedAt,
          dateStyle: "short",
        }}
        created={{
          createdAt: createdAt,
          dateStyle: "short",
        }}
        itemsAmount={amountElements}
        isShared={isShared}
      />
    );
  };

  const isShared = useMemo(
    () => !!currentList.usersSharing?.length,
    [currentList.usersSharing?.length]
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
    if (user._id !== "") dispatch(fetchAllUserLists(user));
    return () => {
      dispatch(showSearchForm(false));
    };
  }, [isShareUsersMenuOpen, user._id]);

  useEffect(() => {
    if (!isSearchFormVisible) setSearchValue("");
  }, [isSearchFormVisible]);

  return (
    <div
      className="container min-w-[360px] mx-auto max-w-md pb-20"
      ref={shareUserMenuRef}
    >
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <Header
          isLoading={isLoading}
          title={
            !isShareUsersMenuOpen ? <TitleHeaderPro /> : <TitleHeaderList />
          }
          listLabelMark={!isShareUsersMenuOpen ? "" : <ListLabelMarkAll />}
        />
      )}

      {!isLoading && lists.length === 0 && <Greeting />}
      <MyLists isSortedByTitle={isSortedByTitle} searchByValue={searchValue} />

      <Slide
        direction="up"
        timeout={500}
        in={isShareUsersMenuOpen}
        mountOnEnter
        unmountOnExit
      >
        <div className=" z-50 w-full fixed top-[72px]">
          <ShareUsersMenu />
        </div>
      </Slide>

      <FooterMenuList
        onSearchValue={(e) => setSearchValue(e)}
        onSortClick={onSortHandler}
        onAddItemClick={onAddListHandler}
      />
    </div>
  );
}
