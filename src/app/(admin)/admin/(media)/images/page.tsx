import {HydrateClient} from "@/trpc/server";
import {ImagesTable} from "@/modules/admin/(media)/images/ui/images-table";

const ImagesPage = () => {
  return (
    <HydrateClient>
      <ImagesTable />
    </HydrateClient>
  );
};

export default ImagesPage;
