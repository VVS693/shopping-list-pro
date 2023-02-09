
interface MyListItemProps {
  title: string;
}

export function CategoryHeader({
  title,
}: MyListItemProps) {

 
  return (
    <div className="flex w-full items-center justify-center py-[2px] border-b font-extralight text-sm select-none break-words text-blue-gray-800">
        {title}
    </div>
  );
}
