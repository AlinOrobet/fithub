"use client";
import ReactCountryFlag from "react-country-flag";
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";

import {ClientType} from "./types";
import {Image} from "@/components/image";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export const columns: ColumnDef<ClientType>[] = [
  {
    accessorKey: "image",
    header: "Avatar",
    cell: ({row}) => {
      const {name, image} = row.original;

      return <Image image={image} alt={`${name}_avatar`} className="rounded-full size-8 border" />;
    },
  },
  {
    accessorKey: "countryCode",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className="w-full px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Origine
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const {countryCode} = row.original;

      return (
        <ReactCountryFlag
          countryCode={countryCode?.toUpperCase()}
          svg
          style={{
            width: "1.5em",
            height: "1.5em",
          }}
          title="US"
        />
      );
    },
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
          Nume
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
    accessorKey: "email",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className="w-full px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({row}) => {
      const {email} = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full max-w-[155px] truncate text-sm text-center">
              {email.length > 20 ? email.slice(0, 16) + "..." : email}
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{email}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className="w-full px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Membru
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const {createdAt} = row.original;
      const accountDate = new Date(createdAt);
      const now = new Date();

      const diffInMs = now.getTime() - accountDate.getTime();
      const diffInSec = Math.floor(diffInMs / 1000);
      const diffInMin = Math.floor(diffInSec / 60);
      const diffInHours = Math.floor(diffInMin / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInMonths / 12);

      let text = "";

      if (diffInYears >= 1) {
        text = `${diffInYears} ${diffInYears === 1 ? "an" : "ani"}`;
      } else if (diffInMonths >= 1) {
        text = `${diffInMonths} ${diffInMonths === 1 ? "lună" : "luni"}`;
      } else if (diffInDays >= 1) {
        text = `${diffInDays} ${diffInDays === 1 ? "zi" : "zile"}`;
      } else if (diffInHours >= 1) {
        text = `${diffInHours} ${diffInHours === 1 ? "oră" : "ore"}`;
      } else if (diffInMin >= 1) {
        text = `${diffInMin} ${diffInMin === 1 ? "minut" : "minute"}`;
      } else {
        text = `${diffInSec} ${diffInSec === 1 ? "secundă" : "secunde"}`;
      }

      return <Badge variant="success">{text}</Badge>;
    },
  },
  {
    accessorKey: "accessedAt",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          className="w-full px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ultima accesare
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const {accessedAt} = row.original;
      const accountDate = new Date(accessedAt);
      const now = new Date();

      const diffInMs = now.getTime() - accountDate.getTime();
      const diffInSec = Math.floor(diffInMs / 1000);
      const diffInMin = Math.floor(diffInSec / 60);
      const diffInHours = Math.floor(diffInMin / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInMonths / 12);

      let text = "";

      if (diffInYears >= 1) {
        text = `${diffInYears} ${diffInYears === 1 ? "an" : "ani"}`;
      } else if (diffInMonths >= 1) {
        text = `${diffInMonths} ${diffInMonths === 1 ? "lună" : "luni"}`;
      } else if (diffInDays >= 1) {
        text = `${diffInDays} ${diffInDays === 1 ? "zi" : "zile"}`;
      } else if (diffInHours >= 1) {
        text = `${diffInHours} ${diffInHours === 1 ? "oră" : "ore"}`;
      } else if (diffInMin >= 1) {
        text = `${diffInMin} ${diffInMin === 1 ? "minut" : "minute"}`;
      } else {
        text = `${diffInSec} ${diffInSec === 1 ? "secundă" : "secunde"}`;
      }

      return <Badge variant="success">Acum {text}</Badge>;
    },
  },
  {
    id: "actions",
    header: "Acțiuni",
    cell: () => {
      return <></>;
    },
  },
];
