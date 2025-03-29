import {TriangleAlert} from "lucide-react";

interface ErrorContentProps {
  message?: string;
}

export const ErrorContent = ({message}: ErrorContentProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="p-3 rounded-md flex flex-row items-start space-x-2 w-full bg-primary/10">
      <TriangleAlert className="size-5 text-primary" />
      <p className="flex-1 text-primary text-sm">{message}</p>
    </div>
  );
};
