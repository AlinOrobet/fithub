"use client";

import {trpc} from "@/trpc/client";

import {useDialog} from "@/modules/admin/hooks/use-dialog";
import {DataTable} from "@/modules/admin/ui/components/data-table";
import {useMediaActions} from "@/modules/admin/(media)/actions";
import {columns} from "@/modules/admin/(media)/videos/columns";
import {DEFAULT_LIMIT} from "@/constants";

export const VideosTable = () => {
  const {addDialog} = useDialog();

  const handleOnCreate = () => {
    addDialog("create-image");
  };

  const [data, query] = trpc.media.getMany.useSuspenseInfiniteQuery(
    {type: "video", limit: DEFAULT_LIMIT},
    {getNextPageParam: (lastPage) => lastPage.nextCursor}
  );

  const {isPending, deleteMedia} = useMediaActions({});

  const videos = data.pages.flatMap((page) => page.items);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 h-full">
        <DataTable
          entityName="Videoclipuri"
          columns={columns}
          data={videos}
          isLoading={isPending}
          onAddEntity={handleOnCreate}
          onDelete={async (row) => {
            const ids = row.map((r) => r.original.id);
            await deleteMedia(ids);
          }}
          query={query}
        />
      </div>
    </div>
  );
};
