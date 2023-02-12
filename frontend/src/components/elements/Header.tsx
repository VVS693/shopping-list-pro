import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { UserAvatar } from "../user/UserAvatar";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";

interface HeaderProps {
  title?: string;
  isLoading?: boolean;
  isUserActive?: boolean;
}

export function Header({ isLoading, title, isUserActive }: HeaderProps) {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userReducer);
  const [isLoaderShow, setIsLoaderShow] = useState(isLoading);
  const animationTimeout: number = 750;

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setIsLoaderShow(false), animationTimeout);
    } else {
      setIsLoaderShow(true);
    }
  }, [isLoading]);

  return (
    <div className="z-50 sticky max-w-md min-w-[375px] top-0 bg-white">
      <div className="flex w-full items-center justify-between  pt-2 pb-2 px-6 border-b">
        <Fade in={!!title} timeout={animationTimeout}>
          <div className="text-left min-w-[250px] pr-3 text-blue-gray-800 font-bold text-2xl select-none break-words">
            {title}
          </div>
        </Fade>

        <div className="flex w-10 h-10 relative ml-8">
          <Fade
            in={isLoaderShow}
            timeout={animationTimeout}
            unmountOnExit
            className="absolute right-0"
          >
            <AutorenewIcon
              sx={{
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
              }}
              color="action"
            />
          </Fade>
          <Fade
            in={!isLoaderShow}
            timeout={animationTimeout}
            className=" absolute right-0 cursor-pointer"
            onClick={() => navigate("/useraccount")}
          >
            <div>
              <UserAvatar
                isUserActive={isUserActive}
                userAvatar={user.avatar}
              />
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="z-50 sticky max-w-md min-w-[375px] top-0 bg-white">
  //     <div className="flex w-full items-center justify-between  pt-2 pb-2 px-4 border-b">
  //       <div className="text-left min-w-[250px] pr-3 text-blue-gray-800 font-bold text-2xl select-none break-words">
  //         {title}
  //       </div>

  //       {isLoaderShow ? (
  //         <Fade in={isLoaderShow}>
  //         <AutorenewIcon
  //           sx={{
  //             width: "40px",
  //             height: "40px",
  //             animation: "spin 1s linear infinite",
  //           }}
  //           color="action"
  //         />
  //         </Fade>
  //       ) : (
  //         <div
  //           className=" cursor-pointer"
  //           onClick={() => navigate("/useraccount")}
  //         >
  //           <UserAvatar isUserActive={isUserActive} userAvatar={user.avatar} />
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}
