import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface ShopItemProps {
  title: string;
  placeholder?: string;
  onEdit: (el: string) => void;
  onDel: () => void;
}

export function ItemEdit({ title, placeholder, onEdit, onDel }: ShopItemProps) {
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
        onDel();
      }
    }
  };

  const onFocusHandler = () => {
    // console.log("foc")
    isDel.current = true;
    onDel();
  };
  const onClickHandler = () => {
    // console.log("kl")
    isDel.current = true;
    onDel();
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 bottom-0" />

      <div className="w-full py-[2px] bg-white flex flex-nowrap items-center justify-between">
        <form onSubmit={submitHandler} className="w-full items-center">
          <TextField
            id="edit-input"
            sx={{ pl: "16px", pr: "8px", pt: "6px", pb: "5px", width: "100%" }}
            autoFocus
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

        <IconButton
          onFocus={onFocusHandler}
          //  onClick={onClickHandler}
        >
          <DeleteOutlinedIcon className=" text-blue-gray-500" />
        </IconButton>
      </div>
    </>
  );
}
