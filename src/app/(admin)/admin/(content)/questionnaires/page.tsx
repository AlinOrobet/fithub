import {HydrateClient, trpc} from "@/trpc/server";
import {QuestionnairesTable} from "@/modules/admin/(content)/questionnaires/ui/questionnaires-table";
import {DEFAULT_LIMIT} from "@/constants";

export const dynamic = "force-dynamic";

const QuestionnairesPage = () => {
  void trpc.pages.getMany.prefetchInfinite({limit: DEFAULT_LIMIT});
  return (
    <HydrateClient>
      <QuestionnairesTable />
    </HydrateClient>
  );
};

export default QuestionnairesPage;
