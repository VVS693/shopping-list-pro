import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { UserAvatar } from "../user/UserAvatar";

interface MessageProps {
  text: string;

  userInfo: {
    userName?: string;
    userAvatar?: string;
    creationTime?: string;
    lefsideAvatar?: boolean;
    isUserActive?: boolean;
  };
}

export function MessageOne({
  text,
  userInfo: { userName, userAvatar, creationTime, lefsideAvatar, isUserActive },
}: MessageProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      pt={1}
      pb={1}
      pl={2}
      pr={2}
      alignItems="flex-end"
      justifyContent={lefsideAvatar ? "flex-start" : "flex-end"}
    >
      {lefsideAvatar && (
        <UserAvatar isUserActive={isUserActive} userAvatar={userAvatar} />
      )}

      <Paper sx={{ p: "4px 8px", maxWidth: "80%" }}>
        <div className=" flex flex-nowrap justify-between items-end pb-1">
          <div className=" text-sm font-semibold text-light-blue-900">
            {userName}
          </div>
          <div className=" text-xs pl-2 font-extralight text-light-blue-800">
            {creationTime}
          </div>
        </div>
        <div className="break-words">{text}</div>
      </Paper>
      {!lefsideAvatar && (
        <UserAvatar isUserActive={isUserActive} userAvatar={userAvatar} />
      )}
    </Stack>
  );
}
