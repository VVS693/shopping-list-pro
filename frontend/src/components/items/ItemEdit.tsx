import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface ShopItemProps {
  title: string;
  placeholder?: string;
  onEdit: (el: string) => void;
  onDel?: () => void;
}

export function ItemEdit({ title, placeholder, onEdit, onDel }: ShopItemProps) {
  const inputRef = useRef<any>();
  const [value, setValue] = useState(title);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const isDel = useRef(false);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isDel.current) {
      if (value.trim().length !== 0) {
        onEdit(value);
      } else {
        onDel && onDel();
      }
    }
  };

  const onFocusHandler = () => {
    // console.log("foc")
    isDel.current = true;
    onDel && onDel();
  };
  const onClickHandler = () => {
    // console.log("kl")
    isDel.current = true;
    onDel && onDel();
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <>
      <div className="z-40 fixed top-0 right-0 left-0 bottom-0" />
      <div className="z-50 w-full py-[2px] flex flex-nowrap items-center justify-between">
        <form onSubmit={submitHandler} className="w-full items-center">
          <TextField
            id="edit-input"
            sx={{ pl: "16px", pr: "8px", pt: "6px", pb: "5px", width: "100%" }}
            // autoFocus
            inputRef={inputRef}
            placeholder={placeholder}
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
              if (el.code === "Enter") {
                submitHandler(el);
              }
            }}
            variant="standard"
            multiline
            maxRows={10}
            InputProps={{
              disableUnderline: true,
              style: { fontSize: "20px", lineHeight: "28px", letterSpacing: 0 },
            }}
          />
        </form>

        {!!onDel && (
          <IconButton
            onFocus={onFocusHandler}
            onClick={onClickHandler} //странно что для телефона это нужно включить
          >
            <DeleteIcon sx={{ color: "#ef5350" }} />
          </IconButton>
        )}
      </div>
    </>
  );
}
