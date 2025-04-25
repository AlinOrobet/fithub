"use client";

import {ColumnDef} from "@tanstack/react-table";
import {ColumnsActions} from "@/modules/admin/ui/components/data-table/columns-actions";
import {ArrowUpDown} from "lucide-react";

import {useMediaActions} from "@/modules/admin/(media)/actions";

import {Media} from "../types";
import {Image} from "@/components/image";

import {Badge} from "@/components/ui/badge";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export const columns: ColumnDef<Media>[] = [
  {
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className="w-full px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Alias
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({row}) => {
      const {name} = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full max-w-[155px] truncate text-sm">
              {name.length > 20 ? name.slice(0, 16) + "..." : name}
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "url",
    header: "Sursă",
    cell: ({row}) => {
      const {url} = row.original;
      return <Image image={url} alt="source" className="aspect-video h-full w-full border" />;
    },
  },
  {
    accessorKey: "size",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className="w-full px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dimensiune
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const {size} = row.original;

      if (!size) {
        return <Badge>Nu s-a identificat</Badge>;
      }

      const sizeInMB = (+size / 1024 / 1024).toFixed(2);

      const sizeLimitInMB = 5;
      const sizeInBytes = +size;
      const sizeLimitInMB1 = 2.5;

      if (sizeInBytes > sizeLimitInMB * 1024 * 1024) {
        return <Badge variant="destructive">{sizeInMB} Mb</Badge>;
      } else if (sizeInBytes > sizeLimitInMB1 * 1024 * 1024) {
        return <Badge variant="warning">{sizeInMB} Mb</Badge>;
      } else if (sizeInBytes <= sizeLimitInMB1 * 1024 * 1024) {
        return <Badge variant="success">{sizeInMB} Mb</Badge>;
      }
    },
  },
  {
    accessorKey: "usedBy",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className="w-full px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Utilizare
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const {usedBy} = row.original;

      if (!usedBy.length) {
        return <Badge variant="destructive">Nu este utilizată</Badge>;
      }
      return <Badge variant="success">Utilizată de {usedBy.length} ori</Badge>;
    },
  },
  {
    id: "actions",
    header: "Acțiuni",
    cell: ({row}) => {
      const {id, url} = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {isPending, deleteMedia} = useMediaActions({});

      return (
        <ColumnsActions
          actions={[
            {
              label: "Vizualizează",
              action: () => {
                window.open(url, "_blank");
              },
            },
            {
              label: "Șterge",
              action: () => {
                deleteMedia([id]);
              },
            },
          ]}
          isDisabled={isPending}
        />
      );
    },
  },
];
