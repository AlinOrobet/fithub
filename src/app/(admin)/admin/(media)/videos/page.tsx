import {HydrateClient, trpc} from "@/trpc/server";
import {VideosTable} from "@/modules/admin/(media)/videos/ui/videos-table";
import {DEFAULT_LIMIT} from "@/constants";

export const dynamic = "force-dynamic";

const VideosPage = () => {
  void trpc.media.getMany.prefetchInfinite({type: "video", limit: DEFAULT_LIMIT});
  return (
    <HydrateClient>
      <VideosTable />
    </HydrateClient>
  );
};

export default VideosPage;
