import {HydrateClient, trpc} from "@/trpc/server";
import {PagesTable} from "@/modules/admin/(content)/pages/ui/pages-table";
import {DEFAULT_LIMIT} from "@/constants";

export const dynamic = "force-dynamic";

const PagesPage = () => {
  void trpc.pages.getMany.prefetchInfinite({limit: DEFAULT_LIMIT});
  return (
    <HydrateClient>
      <PagesTable />
    </HydrateClient>
  );
};

export default PagesPage;
