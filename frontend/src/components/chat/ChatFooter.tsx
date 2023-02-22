import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Divider from "@mui/material/Divider";
import { userTyping } from "../../socket.service";
import { useAppSelector } from "../../hooks/redux";
import { IUserTyping } from "../../types";

interface ChatFooterProps {
  onSendClick: (text: string) => void;
  onBackClick: () => void;
}

export function ChatFooter({ onSendClick, onBackClick }: ChatFooterProps) {
  const { user } = useAppSelector((state) => state.userReducer);
  const { currentList } = useAppSelector((state) => state.listsReducer);

  const [value, setValue] = useState("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.trim().length === 0) {
      return;
    }
    // console.log(value);
    onSendClick(value.trim());
    const userTypingData: IUserTyping = {userId: user._id, name: "", roomId: currentList._id }
    userTyping(userTypingData);
    setValue("");
  };

  const onKeyDownHandle = (event: React.KeyboardEvent<HTMLElement>) => {
    event.code === "Enter" && event.preventDefault();
    event.code === "Enter" && submitHandler(event);
    if (event.code !== "Enter") {
      const userTypingData: IUserTyping = {
        userId: user._id,
        name: user.name,
        roomId: currentList._id,
      };
      userTyping(userTypingData);
    }
    if (event.code === "Enter") {
      const userTypingData: IUserTyping = {
        userId: user._id,
        name: "",
        roomId: currentList._id,
      };
      userTyping(userTypingData);
    }
  };

  return (
    <div className="z-50 fixed w-full max-w-md min-w-[360px] bottom-0 bg-white">
      <Divider />

      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          // "& .MuiTextField-root": { m: 0, w: "100%" },
          display: "flex",
        }}
        noValidate
        autoComplete="off"
        className=" px-4 pb-6 pt-4"
      >
        <IconButton
          // color="primary"
          sx={{ alignSelf: "flex-end", p: 0 }}
          onClick={onBackClick}
        >
          <ArrowBackIosNewIcon
            sx={{ height: "40px", fontSize: 30 }}
            color="action"
          />
        </IconButton>

        <TextField
          sx={{ pl: "16px", pr: "16px" }}
          id="message-input"
          value={value}
          autoFocus
          onChange={changeHandler}
          onKeyDown={onKeyDownHandle}
          multiline
          size="small"
          fullWidth
          maxRows={10}
        />

        <IconButton
          // color="primary"
          // size="large"
          sx={{ alignSelf: "flex-end", p: 0 }}
          type="submit"
        >
          <SendIcon sx={{ height: "40px", fontSize: 30 }} color="action" />
        </IconButton>
      </Box>
    </div>
  );
}
