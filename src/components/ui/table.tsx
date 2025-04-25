import * as React from "react";

import {cn} from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({className, ...props}, ref) => (
    <div className="relative w-full overflow-auto h-full max-h-[calc(100vh-5rem-104px)] sm:max-h-[calc(100vh-5rem-112px)]">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  )
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <thead
    ref={ref}
    className={cn("sticky top-0 w-full min-w-max z-10 border-b", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <tbody ref={ref} className={cn(" w-full", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({className, ...props}, ref) => (
    <tr
      ref={ref}
      className={cn(
        "flex flex-row items-center justify-between w-full min-w-max transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted border-b last:border-none",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
  <th
    ref={ref}
    className={cn(
      "min-h-10 px-2 font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-40 text-center [&:has([role=checkbox])]:text-left [&:has([role=checkbox])]:min-w-12 flex items-center justify-center",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] min-w-40 text-center [&:has([role=checkbox])]:text-left [&:has([role=checkbox])]:min-w-12 flex items-center justify-center transition-colors data-[state=selected]:bg-muted h-full",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({className, ...props}, ref) => (
  <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

export {Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption};
