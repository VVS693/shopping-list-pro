import { nonActiveText } from "../../config-var";

interface ShopItemProps {
  title: string;
  isActive?: boolean
  onClick: () => void;
}

export function ItemTitle({ title, isActive = true, onClick }: ShopItemProps) {
  const color = isActive ? "" : nonActiveText
  return (
    <button
      onClick={onClick}
      className={`pl-4 pr-2 py-3 w-full min-w-[250px] text-left text-xl tracking-normal select-none break-words ${color}`} 
      disabled = {!isActive}
    >
      {title}
    </button>
  );
}
