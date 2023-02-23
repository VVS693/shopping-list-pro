import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Chat } from "./pages/Chat";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AllLists } from "./pages/AllLists";
import { UserAccount } from "./pages/UserAccount";
import {
  fetchAllUsers,
  fetchUserMe,
} from "./store/reducers/actionUserCreators";
import { UserRegistration } from "./pages/UserRegistration";
import { animationTimeout } from "./config-var";
import { PreLoader } from "./components/elements/PreLoader";

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, isLoadingMe } = useAppSelector((state) => state.userReducer);
  const [isLoaderShow, setIsLoaderShow] = useState(isLoadingMe);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserMe());
    dispatch(fetchAllUsers());
  }, []);

  useEffect(() => {
    if (!isLoadingMe) {
      setTimeout(() => {
        setIsLoaderShow(false);
      }, animationTimeout);
    } else {
      setIsLoaderShow(true);
    }
  }, [isLoadingMe]);

  useEffect(() => {
    if (isAuth) {
      setIsLoaderShow(false);
      navigate("/mylists");
    }
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, isLoadingMe]);

  return (
    <>
      <PreLoader isLoaderShow={isLoaderShow} />
      {!isLoaderShow && (
        <Routes>
          <Route path="/mylists" element={<AllLists />} />
          <Route path="/mylist" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/useraccount" element={<UserAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegistration />} />
        </Routes>
      )}
    </>
  );
}

export default App;
