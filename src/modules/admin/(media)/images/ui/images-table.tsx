"use client";

import {useDialog} from "@/modules/admin/hooks/useDialog";
import {columns} from "@/modules/admin/(media)/images/columns";
import {Image} from "@/modules/admin/(media)/images/types";
import {TableHeader} from "@/modules/admin/ui/components/data-table/table-header";
import {DataTable} from "@/modules/admin/ui/components/data-table";

export const ImagesTable = () => {
  const {addDialog} = useDialog();

  const handleOnCreate = () => {
    addDialog("create-media");
  };

  const isLoading = false;

  return (
    <div className="flex flex-col h-full">
      <TableHeader name="Imagini" onCreate={handleOnCreate} isLoading={isLoading} />
      <div className="flex-1 h-full">
        <DataTable
          entityName="Imagini"
          columns={columns}
          data={[]}
          isLoading={isLoading}
          onAddEntity={handleOnCreate}
        />
      </div>
    </div>
  );
};
