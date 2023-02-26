import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { animateScroll } from "react-scroll";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SubdirectoryArrowLeftOutlinedIcon from "@mui/icons-material/SubdirectoryArrowLeftOutlined";
import { useAppDispatch } from "../../hooks/redux";
import { showAddForm } from "../../store/reducers/itemsSlice";
import Paper from "@mui/material/Paper";

interface AddItemMenuProps {
  onAdd: (value: string) => void;
}

export function AddItemMenu({ onAdd }: AddItemMenuProps) {
  const [value, setValue] = useState("");

  const isClear = useRef(false);
  const clearForm = useRef<any>();
  const addInputRef = useRef<any>();

  const dispatch = useAppDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isClear.current) {
      if (value.trim().length === 0) {
        isClear.current = false;
        dispatch(showAddForm(false));
        return;
      }
      onAdd(value.trim());
      animateScroll.scrollToBottom({
        duration: 750,
        smooth: "easeInQuad",
      });
      dispatch(showAddForm(false));
    }
    setValue("");
    isClear.current = false;
  };

  const onFocusHandler = () => {
    setValue("");
    isClear.current = true;
    addInputRef.current.focus();
  };

  return (
    <Paper elevation={12}>
      <div className="fixed top-0 right-0 left-0 bottom-0" />
      <form
        onSubmit={submitHandler}
        className="flex w-full flex-nowrap px-3 py-[2px] items-center justify-between bg-white"
      >
        <TextField
          id="edit-input"
          variant="standard"
          multiline
          maxRows={10}
          sx={{
            pl: "12px",
            pr: "8px",
            pt: "7px",
            pb: "6px",
            width: "100%",
            zIndex: 50,
          }}
          placeholder="Add element..."
          autoFocus
          inputRef={addInputRef}
          value={value}
          onChange={changeHandler}
          onBlur={(el) => {
            setTimeout(() => {
              submitHandler(el);
            }, 0);
          }}
          onKeyDown={(el) => {
            el.code === "Enter" && el.preventDefault();
            setTimeout(() => {
              el.code === "Enter" && submitHandler(el);
            }, 0);
          }}
          InputProps={{
            disableUnderline: true,
            style: {
              fontSize: "20px",
              lineHeight: "28px",
              letterSpacing: 0,
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  ref={clearForm}
                  onFocus={onFocusHandler}
                  onClick={onFocusHandler}
                  edge="end"
                >
                  <ClearOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton>
          <SubdirectoryArrowLeftOutlinedIcon
            sx={{ fontSize: 30 }}
            color="warning"
          />
        </IconButton>
      </form>
    </Paper>
  );
}
