import {HydrateClient, trpc} from "@/trpc/server";
import {BundlesTable} from "@/modules/admin/(content)/bundles/ui/bundles-table";
import {DEFAULT_LIMIT} from "@/constants";

export const dynamic = "force-dynamic";

const BundlesPage = () => {
  void trpc.bundles.getMany.prefetchInfinite({limit: DEFAULT_LIMIT});
  return (
    <HydrateClient>
      <BundlesTable />
    </HydrateClient>
  );
};

export default BundlesPage;
