interface ShopItemProps {
  title: string;
  onClick: () => void;
}

export function ItemTitle({ title, onClick }: ShopItemProps) {
  return (
    <button
      onClick={onClick}
      className="pl-4 pr-2 py-3 w-full min-w-[250px] text-left text-xl tracking-normal select-none break-words"
    >
      {title}
    </button>
  );
}
