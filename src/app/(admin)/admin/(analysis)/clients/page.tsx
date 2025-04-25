import {HydrateClient, trpc} from "@/trpc/server";
import {ClientsTable} from "@/modules/admin/(analysis)/clients/ui/clients-table";
import {DEFAULT_LIMIT} from "@/constants";

export const dynamic = "force-dynamic";

const ClientsPage = () => {
  void trpc.clients.getMany.prefetchInfinite({limit: DEFAULT_LIMIT});
  return (
    <HydrateClient>
      <ClientsTable />
    </HydrateClient>
  );
};

export default ClientsPage;
