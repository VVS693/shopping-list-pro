import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Chat } from "./pages/Chat";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AllLists } from "./pages/AllLists";
import { UserAccount } from "./pages/UserAccount";
import { fetchUserMe } from "./store/reducers/actionUserCreators";
import { UserRegistration } from "./pages/UserRegistration";

function App() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchUserMe());
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/lists");
    }
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lists" element={<AllLists />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/useraccount" element={<UserAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<UserRegistration />} />
    </Routes>
  );
}

export default App;
