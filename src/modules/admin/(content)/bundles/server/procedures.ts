import {createTRPCRouter, protectedAdminProcedure} from "@/trpc/init";
import {APPWRITE_CLIENTS_ID, APPWRITE_DATABASE_ID} from "@/config";
import {Query} from "node-appwrite";
import {z} from "zod";

export const bundlesRouter = createTRPCRouter({
  getMany: protectedAdminProcedure
    .input(
      z.object({
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
      const {cursor, limit} = input;

      const query = cursor
        ? [
            Query.lessThan("$updatedAt", cursor.updatedAt),
            Query.orderDesc("$updatedAt"),
            Query.limit(limit + 1),
          ]
        : [Query.limit(limit + 1), Query.orderDesc("$updatedAt")];

      const data = await databases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_CLIENTS_ID, query);

      const hasMore = data.documents.length > limit;
      const items = hasMore ? data.documents.slice(0, -1) : data.documents;
      const lastItem = items[items.length - 1];
      const nextCursor = hasMore ? {id: lastItem.$id, updatedAt: lastItem.$updatedAt} : null;

      return {
        items: items.map((item) => ({
          id: item.$id,
          name: item.name,
          email: item.email,
          image: item.image,
          createdAt: item.$createdAt,
          accessedAt: item.accessedAt,
          countryCode: item.countryCode,
          favoriteIds: item.favoriteIds,
          cartIds: item.cartIds,
          courseIds: item.courseIds,
        })),
        nextCursor,
      };
    }),
});
