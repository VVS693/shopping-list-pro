interface ErrorMessageProps {
  error: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <p className="px-6 p-2 text-red-600  font-bold text-2xl border-b ">
      {error}
    </p>
  );
}
