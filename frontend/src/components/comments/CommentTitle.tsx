import { nonActiveText } from "../../config-var";

interface CommentitleProps {
  title?: string;
  isActive?: boolean
  editHandler?: () => void;
}

export function Commentitle({ title, isActive = true, editHandler }: CommentitleProps) {
  const color = isActive ? "" : nonActiveText
  return (
    <button
      onClick={editHandler}
      className={`pl-4 pb-1 pt-1 w-full min-w-[230px] text-left text-base select-none break-words ${color}`}
      disabled = {!isActive}
    >
      {title}
    </button>
  );
}
