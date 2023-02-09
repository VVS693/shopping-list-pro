import IconButton from "@mui/material/IconButton";
import { checkBoxCompletedIcon, checkBoxEmptyIcon } from "../icons";
interface CheckboxProps {
  isCompleted: boolean;
  onChangeCheckBox: () => void;
}

export function CheckBox({ isCompleted, onChangeCheckBox }: CheckboxProps) {
  return (
    <IconButton onClick={onChangeCheckBox} >
      {!isCompleted ? checkBoxEmptyIcon : checkBoxCompletedIcon}
    </IconButton>
  );
}
