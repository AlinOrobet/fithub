"use client";

import {trpc} from "@/trpc/client";

import {DataTable} from "@/modules/admin/ui/components/data-table";
import {columns} from "@/modules/admin/(analysis)/clients/columns";
import {DEFAULT_LIMIT} from "@/constants";

export const ClientsTable = () => {
  const [data, query] = trpc.clients.getMany.useSuspenseInfiniteQuery(
    {limit: DEFAULT_LIMIT},
    {getNextPageParam: (lastPage) => lastPage.nextCursor}
  );

  const clients = data.pages.flatMap((page) => page.items);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 h-full">
        <DataTable
          entityName="Clienți"
          columns={columns}
          data={clients}
          isLoading={false}
          query={query}
        />
      </div>
    </div>
  );
};
