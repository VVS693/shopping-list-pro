import Divider from "@mui/material/Divider";
import ShareIcon from "@mui/icons-material/Share";
import AvatarGroup from "@mui/material/AvatarGroup";
import Typography from "@mui/material/Typography";
import { UserAvatar } from "../user/UserAvatar";
import { useAppSelector } from "../../hooks/redux";
import { IUser } from "../../types";

interface ChatLabelMarkProps {}

export function ChatLabelMark() {
  const { user, users, usersOnline, userTyping } = useAppSelector(
    (state) => state.userReducer
  );
  const { currentList } = useAppSelector((state) => state.listsReducer);

  const userAvatarSearch = (el: string) => {
    const user = users.find((item: IUser) => item._id === el);
    return user?.avatar;
  };

  return (
    <div className="select-none min-w-[250px] flex items-center h-[22px] pl-2">
      <AvatarGroup
        max={5}
        sx={{
          "& .MuiAvatar-root": { width: 22, height: 22, fontSize: 15 },
          paddingX: 0,
        }}
      >
        {usersOnline
          .filter((el) => el.roomId === currentList._id)
          .map((el) => (
            <UserAvatar
              key={el.userId}
              userAvatar={userAvatarSearch(el.userId)}
              width={22}
              height={22}
            />
          ))}
      </AvatarGroup>

      {userTyping.name !== "" && userTyping.userId !== user._id && (
        <Divider orientation="vertical" flexItem sx={{ marginX: "4px" }} />
      )}

      {userTyping.name !== "" && userTyping.userId !== user._id && (
        <div className="select-none flex flex-nowrap text-sm font-extralight text-light-blue-800 animate-bounce">
          <Typography
            variant="inherit"
            noWrap
            sx={{ maxWidth: 120, fontWeight: 600 }}
          >
            {userTyping.name}
          </Typography>
          <div className="w-16 ml-1 flex flex-nowrap">is typing...</div>
        </div>
      )}
    </div>
  );
}
