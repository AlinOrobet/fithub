import {HydrateClient, trpc} from "@/trpc/server";
import {DocumentsTable} from "@/modules/admin/(content)/documents/ui/documents-table";
import {DEFAULT_LIMIT} from "@/constants";

export const dynamic = "force-dynamic";

const DocumentsPage = () => {
  void trpc.documents.getMany.prefetchInfinite({limit: DEFAULT_LIMIT});
  return (
    <HydrateClient>
      <DocumentsTable />
    </HydrateClient>
  );
};

export default DocumentsPage;
