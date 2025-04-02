import {Button} from "@/components/ui/button";

interface TableHeaderProps {
  name: string;
  onCreate?: () => void;
  isLoading?: boolean;
}

export const TableHeader = ({name, onCreate, isLoading}: TableHeaderProps) => {
  return (
    <div className="flex items-center justify-between pb-4">
      <h3>{name}</h3>
      {onCreate && (
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="h-9" onClick={onCreate} disabled={isLoading}>
            Crează
          </Button>
        </div>
      )}
    </div>
  );
};
