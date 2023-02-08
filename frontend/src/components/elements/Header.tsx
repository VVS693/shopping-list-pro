import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { Loader } from "./Loader";
import { UserAvatar } from "../user/UserAvatar";

interface HeaderProps {
  title: string;
  isLoading?: boolean;
  isUserActive?: boolean;
}

export function Header({ isLoading, title, isUserActive }: HeaderProps) {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userReducer);
  const [isLoaderShow, setIsLoaderShow] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setIsLoaderShow(false), 800);
    } else {
      setIsLoaderShow(true);
    }
  }, [isLoading]);

  return (
    <div className="z-50 sticky max-w-md min-w-[375px] top-0 bg-white">
      <div className="flex w-full justify-between  pt-2 pb-2 px-6 border-b">
        <div className="text-left text-blue-gray-800 font-bold text-2xl select-none break-words">
          {title}
        </div>

        {isLoaderShow ? (
          <Loader />
        ) : (
          <div
            className=" cursor-pointer"
            onClick={() => navigate("/useraccount")}
          >
            <UserAvatar isUserActive={isUserActive} userAvatar={user.avatar} />
          </div>
        )}
      </div>
    </div>
  );
}
