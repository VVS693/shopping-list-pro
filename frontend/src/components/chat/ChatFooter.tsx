import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

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
    <div className=" z-50 flex w-96 fixed justify-between bottom-0 px-4 pb-8 pt-3 border-t bg-white">
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
