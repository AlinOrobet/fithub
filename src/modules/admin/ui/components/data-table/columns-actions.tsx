import {MoreHorizontal} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Action {
  label: string;
  action: VoidFunction;
}

interface ColumnsActionsProps {
  actions: Action[];
  isDisabled?: boolean;
}

export const ColumnsActions = ({actions, isDisabled}: ColumnsActionsProps) => {
  if (!actions.length) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acțiuni</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map(({label, action}, index) => (
          <DropdownMenuItem
            key={index}
            disabled={isDisabled}
            className="cursor-pointer"
            onClick={action}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
