import { useState } from "react";
import TextField from "@mui/material/TextField";

interface CommentAddProps {
  onCommentAddValue: (value: string) => void;
  isAddVisible: boolean;
}

export function CommentAdd({
  onCommentAddValue,
  isAddVisible,
}: CommentAddProps) {
  const [value, setValue] = useState("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onCommentAddValue(value);
    setValue("");
  };

  return (
    <>
      {isAddVisible && (
        <div className="flex w-full items-center py-1">
          <div className="fixed top-0 right-0 left-0 bottom-0" />

          <form
            onSubmit={submitHandler}
            className="w-full items-center pl-16 pr-10"
          >
            <TextField
              id="add-input-comment"
              sx={{
                pr: "2px",
                width: "100%",
              }}
              placeholder="Add comment..."
              autoFocus
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              value={value}
              onChange={changeHandler}
              onBlur={submitHandler}
              onKeyDown={(el) => {
                el.code === "Enter" && el.preventDefault();
                el.code === "Enter" && submitHandler(el);
              }}
              variant="standard"
              multiline
              maxRows={10}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: 0,
                  paddingBottom: "2px",
                  paddingTop: "2px",
                },
              }}
            />
          </form>
        </div>
      )}
    </>
  );
}
