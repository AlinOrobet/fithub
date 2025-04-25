import {createTRPCRouter} from "../init";

import {authRouter} from "@/modules/auth/server/procedures";

import {clientsRouter} from "@/modules/admin/(analysis)/clients/server/procedures";

import {announcementsRouter} from "@/modules/admin/(content)/announcements/server/procedures";
import {pagesRouter} from "@/modules/admin/(content)/pages/server/procedures";
import {bundlesRouter} from "@/modules/admin/(content)/bundles/server/procedures";
import {questionnairesRouter} from "@/modules/admin/(content)/questionnaires/server/procedures";
import {documentsRouter} from "@/modules/admin/(content)/documents/server/procedures";

import {mediaRouter} from "@/modules/admin/(media)/server/procedures";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  media: mediaRouter,
  clients: clientsRouter,
  announcements: announcementsRouter,
  pages: pagesRouter,
  bundles: bundlesRouter,
  questionnaires: questionnairesRouter,
  documents: documentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
