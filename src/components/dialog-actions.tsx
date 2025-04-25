import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";

interface DialogActionsProps {
  onClose: VoidFunction;
  isPending: boolean;
  isDisabled?: boolean;
}

export const DialogActions = ({onClose, isPending, isDisabled}: DialogActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button type="button" variant="ghost" size="lg" onClick={onClose} disabled={isPending}>
        Închide
      </Button>
      <Button type="submit" disabled={isPending || isDisabled} size="lg" className="min-w-[109px]">
        {isPending ? <Loader2 className="text-muted-foreground size-3 animate-spin" /> : "Crează"}
      </Button>
    </div>
  );
};
