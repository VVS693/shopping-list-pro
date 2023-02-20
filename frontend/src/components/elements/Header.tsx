import { ReactNode, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { UserAvatar } from "../user/UserAvatar";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import { animationTimeout } from "../../config-var";

interface HeaderProps {
  title?: ReactNode;
  isLoading?: boolean;
  isUserActive?: boolean;
  listLabelMark?: ReactNode;
}

export function Header({
  isLoading,
  title,
  isUserActive,
  listLabelMark,
}: HeaderProps) {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userReducer);
  const [isLoaderShow, setIsLoaderShow] = useState(isLoading);
  const bottomUp: string = !!listLabelMark ? "bottom-2" : "";

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setIsLoaderShow(false), animationTimeout);
    } else {
      setIsLoaderShow(true);
    }
  }, [isLoading]);


  return (
    <div className="z-50 sticky max-w-md min-w-[360px] top-0 bg-white">
      <div className="flex  w-full items-center justify-between  py-2 px-4">
        <div className="min-w-[250px]">
          <Fade in={!!title} timeout={animationTimeout}>
            <div
              className={`relative text-left min-w-[250px] px-1 py-2 text-blue-gray-800 font-bold text-2xl select-none break-words ${bottomUp}`}
            >
              {title}
            </div>
          </Fade>

          <Fade in={!!listLabelMark} timeout={animationTimeout}>
            <div>
              {!!listLabelMark && (
                <div className="absolute bottom-1">{listLabelMark}</div>
              )}
            </div>
          </Fade>
        </div>
        <div className="flex w-12 h-12 relative ml-9 items-center">
          <Fade
            in={isLoaderShow}
            timeout={animationTimeout}
            unmountOnExit
            className="absolute right-0"
          >
            <AutorenewIcon
              sx={{
                width: "48px",
                height: "48px",
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
                width={48}
                height={48}
              />
            </div>
          </Fade>
        </div>
      </div>
      <Divider />
    </div>
  );
}
