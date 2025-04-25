"use client";

import {trpc} from "@/trpc/client";

import {useDialog} from "@/modules/admin/hooks/use-dialog";
import {DataTable} from "@/modules/admin/ui/components/data-table";
import {useMediaActions} from "@/modules/admin/(media)/actions";
import {columns} from "@/modules/admin/(media)/images/columns";
import {DEFAULT_LIMIT} from "@/constants";

export const ImagesTable = () => {
  const {addDialog} = useDialog();

  const handleOnCreate = () => {
    addDialog("create-image");
  };

  const [data, query] = trpc.media.getMany.useSuspenseInfiniteQuery(
    {type: "image", limit: DEFAULT_LIMIT},
    {getNextPageParam: (lastPage) => lastPage.nextCursor}
  );

  const {isPending, deleteMedia} = useMediaActions({});

  const images = data.pages.flatMap((page) => page.items);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 h-full">
        <DataTable
          entityName="Imagini"
          columns={columns}
          data={images}
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
