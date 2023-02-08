interface SortButtonProps {
  onSortClick: () => void;
}

export function SortButton({ onSortClick }: SortButtonProps) {
  return (
    <button
      className="flex items-center fixed bottom-1 left-1/6 rounded border border-blue-gray-800 bg-blue-gray-200 text-xl px-4 py-1 m-3 active:bg-blue-gray-500"
      onClick={onSortClick}
    >
      Sort
    </button>
  );
}
