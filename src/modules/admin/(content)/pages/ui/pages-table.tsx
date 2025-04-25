"use client";

import {trpc} from "@/trpc/client";

import {DataTable} from "@/modules/admin/ui/components/data-table";
import {columns} from "@/modules/admin/(content)/pages/columns";
import {DEFAULT_LIMIT} from "@/constants";

export const PagesTable = () => {
  const [data, query] = trpc.media.getMany.useSuspenseInfiniteQuery(
    {type: "image", limit: DEFAULT_LIMIT},
    {getNextPageParam: (lastPage) => lastPage.nextCursor}
  );

  const images = data.pages.flatMap((page) => page.items);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 h-full">
        <DataTable entityName="Pagini" columns={columns} data={images} query={query} />
      </div>
    </div>
  );
};
