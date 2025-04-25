import {z} from "zod";
import {Query} from "node-appwrite";

import {createTRPCRouter, protectedAdminProcedure} from "@/trpc/init";
import {TRPCError} from "@trpc/server";
import {createMediaSchemaServer} from "@/modules/admin/(media)/schemas";
import {APPWRITE_DATABASE_ID, APPWRITE_MEDIA_ID} from "@/config";

export const mediaRouter = createTRPCRouter({
  createMedia: protectedAdminProcedure
    .input(createMediaSchemaServer)
    .mutation(async ({ctx, input}) => {
      try {
        const {databases} = ctx;
        const {id, name, url, size, type} = input;

        const media = await databases.createDocument(APPWRITE_DATABASE_ID, APPWRITE_MEDIA_ID, id, {
          name,
          url,
          size,
          type,
        });

        return media;
      } catch (error: unknown) {
        console.error("Error in createImage:", error);
        throw new TRPCError({code: "BAD_REQUEST", message: input.id});
      }
    }),
  getMany: protectedAdminProcedure
    .input(
      z.object({
        type: z.string(),
        cursor: z
          .object({
            id: z.string(),
            updatedAt: z.string(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ctx, input}) => {
      const {databases} = ctx;
      const {type, cursor, limit} = input;

      const query = cursor
        ? [
            Query.lessThan("$updatedAt", cursor.updatedAt),
            Query.orderDesc("$updatedAt"),
            Query.limit(limit + 1),
          ]
        : [Query.limit(limit + 1), Query.orderDesc("$updatedAt")];

      const data = await databases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_MEDIA_ID, [
        ...query,
        Query.equal("type", type),
      ]);

      const hasMore = data.documents.length > limit;
      const items = hasMore ? data.documents.slice(0, -1) : data.documents;
      const lastItem = items[items.length - 1];
      const nextCursor = hasMore ? {id: lastItem.$id, updatedAt: lastItem.$updatedAt} : null;

      return {
        items: items.map((item) => ({
          id: item.$id,
          name: item.name,
          url: item.url,
          usedBy: item.usedBy,
          size: item.size,
          type: item.type,
        })),
        nextCursor,
      };
    }),
  deleteOne: protectedAdminProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input}) => {
      try {
        const {databases} = ctx;
        const {id} = input;

        await databases.deleteDocument(APPWRITE_DATABASE_ID, APPWRITE_MEDIA_ID, id);

        return id;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "A aparut o eroare în ștergerea fișierului.",
        });
      }
    }),
});
