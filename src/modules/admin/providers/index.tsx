import {DialogProvider} from "./dialog-provider";
import {SheetProvider} from "./sheet-provider";

export const AdminProviders = () => {
  return (
    <>
      <DialogProvider />
      <SheetProvider />
    </>
  );
};
