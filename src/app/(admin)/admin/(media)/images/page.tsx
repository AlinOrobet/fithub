import {HydrateClient, trpc} from "@/trpc/server";
import {ImagesTable} from "@/modules/admin/(media)/images/ui/images-table";
import {DEFAULT_LIMIT} from "@/constants";

export const dynamic = "force-dynamic";

const ImagesPage = () => {
  void trpc.media.getMany.prefetchInfinite({type: "image", limit: DEFAULT_LIMIT});
  return (
    <HydrateClient>
      <ImagesTable />
    </HydrateClient>
  );
};

export default ImagesPage;
