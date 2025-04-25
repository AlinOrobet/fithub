import {HydrateClient, trpc} from "@/trpc/server";
import {AnnouncementsTable} from "@/modules/admin/(content)/announcements/ui/announcements-table";
import {DEFAULT_LIMIT} from "@/constants";

export const dynamic = "force-dynamic";

const AnnouncementsPage = () => {
  void trpc.announcements.getMany.prefetchInfinite({limit: DEFAULT_LIMIT});
  return (
    <HydrateClient>
      <AnnouncementsTable />
    </HydrateClient>
  );
};

export default AnnouncementsPage;
