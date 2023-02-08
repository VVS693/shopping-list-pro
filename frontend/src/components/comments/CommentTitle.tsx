interface CommentitleProps {
  title?: string;
  editHandler?: () => void;
}

export function Commentitle({ title, editHandler }: CommentitleProps) {
  return (
    <button
      onClick={editHandler}
      className="pl-4 pb-1 pt-1 w-full min-w-[230px] text-left text-base select-none break-words"
    >
      {title}
    </button>
  );
}
