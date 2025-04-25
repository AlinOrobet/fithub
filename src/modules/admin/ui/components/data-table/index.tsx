"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {useConfirm} from "@/hooks/use-confirm";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {InfiniteScroll} from "@/components/infinite-scroll";

interface DataTableProps<TData, TValue> {
  entityName: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterBy?: string;
  isLoading?: boolean;
  onAddEntity?: VoidFunction;
  onDelete?: (rows: Row<TData>[]) => void;
  query: {hasNextPage: boolean; isFetchingNextPage: boolean; fetchNextPage: () => void};
}

export function DataTable<TData, TValue>({
  entityName,
  columns,
  data,
  filterBy,
  isLoading,
  onAddEntity,
  onDelete,
  query,
}: DataTableProps<TData, TValue>) {
  const tableRef = React.useRef<HTMLTableSectionElement>(null);
  const [ConfirmDialog, confirmDelete] = useConfirm(
    `Ești sigur?`,
    "Această acțiune nu poate fi revocată.",
    "destructive"
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col h-full">
      <ConfirmDialog />
      <div className="flex items-center justify-between pb-4">
        <h3>{entityName}</h3>
        <div className="flex flex-row items-center gap-x-2">
          {onAddEntity && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="h-9" onClick={onAddEntity} disabled={isLoading}>
                Crează
              </Button>
            </div>
          )}
          {table.getFilteredSelectedRowModel().rows.length > 0 && onDelete && (
            <Button
              disabled={isLoading}
              onClick={async () => {
                const ok = await confirmDelete();

                if (ok) {
                  onDelete(table.getFilteredSelectedRowModel().rows);
                  table.resetRowSelection();
                }
              }}
              size="sm"
              variant="outline"
              className="ml-auto font-normal text-xs"
            >
              <Trash className="size-4 mr-2" />
              Șterge ({table.getFilteredSelectedRowModel().rows.length})
            </Button>
          )}
        </div>
      </div>
      {filterBy && (
        <div className="flex items-center pb-4">
          <Input
            placeholder={`Filtrează dupa ${filterBy}`}
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 rounded-md border max-h-[calc(100vh-5rem-108px)] sm:max-h-[calc(100vh-5rem-116px)]">
        <Table>
          <TableHeader ref={tableRef}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="rounded-t-lg bg-black">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="flex flex-col justify-center h-[calc(100vh-233px)] sm:h-[calc(100vh-241px)]">
                <TableCell colSpan={columns.length} className="flex flex-col">
                  <h5 className="text-primary">Nu s-au găsit rezultate.</h5>
                  {onAddEntity && entityName && (
                    <Button
                      variant="link"
                      onClick={onAddEntity}
                      className="text-muted-foreground"
                      size="lg"
                    >
                      Poți adăuga {entityName} folosind opțiunea de mai jos.
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground pt-4">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
}
