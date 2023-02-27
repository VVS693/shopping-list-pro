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
  placeHolder?: string;
  onAdd?: (value: string) => void;
  onSearch?: (value: string) => void;
}

export function AddItemMenu({
  placeHolder,
  onAdd,
  onSearch,
}: AddItemMenuProps) {
  const [value, setValue] = useState("");
  // const isClearFocus = useRef(false);
  // const isClearClick = useRef(false);
  const clearForm = useRef<any>();
  const addInputRef = useRef<any>();

  const dispatch = useAppDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch && onSearch(event.target.value.trim());
    setValue(event.target.value);
  };

  // const submitHandler = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   console.log(isClearFocus.current, isClearClick.current);
  //   if (!isClearFocus.current) {
  //     if (value.trim().length === 0) {
  //       isClearFocus.current = false;
  //       isClearClick.current = false;
  //       dispatch(showAddForm(false));
  //       return;
  //     }
  //     onAdd(value.trim());
  //     animateScroll.scrollToBottom({
  //       duration: 750,
  //       smooth: "easeInQuad",
  //     });
  //     dispatch(showAddForm(false));
  //   }
  //   setValue("");
  //   isClearFocus.current = false;
  //   isClearClick.current = false;
  // };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.trim().length === 0) {
      dispatch(showAddForm(false));
      return;
    }
    onAdd && onAdd(value.trim());
    animateScroll.scrollToBottom({
      duration: 750,
      smooth: "easeInQuad",
    });
    dispatch(showAddForm(false));
    setValue("");
  };

  // const onFocusHandler = () => {
  //   console.log("focus");
  //   setValue("");
  //   // isClearFocus.current = true;
  //   addInputRef.current.focus();
  // };

  // const onClickHandler = () => {
  //   console.log("click");
  //   setValue("");
  //   isClearClick.current = true;
  //   addInputRef.current.focus();
  // };

  const onClickHandler = () => {
    // console.log("click");
    setValue("");
    addInputRef.current.focus();
    onSearch && onSearch("");
  };

  return (
    <Paper elevation={12}>
      <form
        onSubmit={submitHandler}
        className="flex w-full flex-nowrap px-3 py-[2px] items-center justify-between bg-white"
      >
        {!onSearch && (
          <div
            className="fixed top-0 right-0 left-0 bottom-0"
            onClick={submitHandler}
          />
        )}

        <TextField
          id="edit-input"
          variant="standard"
          multiline
          autoComplete="off"
          type={"text"}
          maxRows={10}
          sx={{
            pl: "12px",
            pr: "8px",
            pt: "7px",
            pb: "6px",
            width: "100%",
          }}
          placeholder={placeHolder}
          autoFocus
          inputRef={addInputRef}
          value={value}
          onChange={changeHandler}
          // onBlur={(el) => {
          //   setTimeout(() => {
          //     console.log("blur")
          //     submitHandler(el);
          //   }, 0);
          // }}
          onKeyDown={(el) => {
            el.code === "Enter" && el.preventDefault();
            if (!onSearch) {
              setTimeout(() => {
                el.code === "Enter" && submitHandler(el);
              }, 0);
            }
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
                  // onFocus={onFocusHandler}
                  onClick={onClickHandler}
                  edge="end"
                >
                  <ClearOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {!onSearch && (
          <IconButton type="submit">
            <SubdirectoryArrowLeftOutlinedIcon
              sx={{ fontSize: 30 }}
              color="warning"
            />
          </IconButton>
        )}
      </form>
    </Paper>
  );
}
