
interface MyListItemProps {
  title: string;
}

export function CategoryHeader({
  title,
}: MyListItemProps) {

 
  return (
    <div className="flex w-full items-center justify-start py-[2px] px-3 border-b font-light text-sm select-none break-words text-blue-gray-900 bg-gray-50">
        {title}
    </div>
  );
}
