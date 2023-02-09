import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

interface CommentEditProps {
  title?: string;
  editHandler: (el: string) => void;
  delHandler: () => void;
}

export function CommentEdit({
  title,
  editHandler,
  delHandler,
}: CommentEditProps) {
  const [value, setValue] = useState(title);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  let isDel = useRef(false);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isDel.current) {
      if (typeof value === "string") {
        if (value.trim().length !== 0) {
          editHandler(value);
        } else {
          delHandler();
        }
      }
    }
  };

  const onFocusHandler = () => {
    // console.log("Focus")
    isDel.current = true;
    delHandler();
  };
  const onClickHandler = () => {
    // console.log("Click")
    isDel.current = true;
    delHandler();
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 bottom-0" />

      <div className="w-full bg-white flex flex-nowrap items-center justify-between">
        <form onSubmit={submitHandler} className="w-full items-center">
          <TextField
            id="edit-input-comment"
            sx={{ pl: "16px", pr: "8px", pt: "0px", pb: "0px", width: "100%" }}
            autoFocus
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
            value={value}
            onChange={changeHandler}
            onBlur={(el) => {
              setTimeout(() => {
                submitHandler(el);
              }, 0);
            }}
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
                paddingBottom: "4px",
                paddingTop: "4px",
              },
            }}
          />
        </form>

        <IconButton
          sx={{ padding: "4px" }}
          onFocus={onFocusHandler}
          //  onClick={onClickHandler}
        >
          <DeleteIcon sx={{color: "#ef5350"}} />
        </IconButton>
      </div>
    </>
  );
}
