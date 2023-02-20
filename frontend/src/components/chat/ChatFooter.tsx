import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Divider from "@mui/material/Divider";

interface ChatFooterProps {
  onSendClick: (text: string) => void;
  onBackClick: () => void;
}

export function ChatFooter({ onSendClick, onBackClick }: ChatFooterProps) {
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
    setValue("");
  };

  return (
    <div className="z-50 fixed w-full max-w-md min-w-[360px] bottom-0  bg-white">
      <Divider/>
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          "& .MuiTextField-root": { m: 0, width: 306 },
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
        noValidate
        autoComplete="off"
        className="flex justify-between  px-4 pb-6 pt-4"
      >
        
        <IconButton
          color="primary"
          sx={{ alignSelf: "flex-end", p: 0 }}
          onClick={onBackClick}
        >
          <ArrowBackIosNewIcon
            sx={{ height: "40px", fontSize: 30, color: "GrayText" }}
          />
        </IconButton>

        <TextField
          sx={{ pl: "16px", pr: "16px" }}
          id="message-input"
          value={value}
          onChange={changeHandler}
          multiline
          size="small"
          maxRows={10}
        />

        <IconButton
          color="primary"
          sx={{ alignSelf: "flex-end", p: 0 }}
          type="submit"
        >
          <SendIcon sx={{ height: "40px", fontSize: 30, color: "GrayText" }} />
        </IconButton>
      </Box>
    </div>
  );
}
