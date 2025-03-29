import {cookies} from "next/headers";
import {z} from "zod";
import {ID} from "node-appwrite";

import {APPWRITE_CLIENTS_ID, APPWRITE_DATABASE_ID, AUTH_COOKIE} from "@/config";
import {baseProcedure, createTRPCRouter, protectedUserProcedure} from "@/trpc/init";
import {TRPCError} from "@trpc/server";

export const authRouter = createTRPCRouter({
  getCurrentUser: protectedUserProcedure.query(async ({ctx}) => {
    const {databases} = ctx;
    const accountDetails = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_CLIENTS_ID,
      ctx.user.$id
    );

    const {$id, name, email} = accountDetails;

    return {id: $id, name, email};
  }),
  signIn: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ctx, input}) => {
      try {
        const {email, password} = input;
        const {account} = ctx;

        const session = await account.createEmailPasswordSession(email, password);

        const cookiesStore = await cookies();

        cookiesStore.set(AUTH_COOKIE, session.secret, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
        });

        return {success: true, message: "Success"};
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new TRPCError({code: "NOT_FOUND", message: error.message});
        }
        throw new TRPCError({code: "NOT_FOUND", message: "Unknown error"});
      }
    }),
  signUp: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(2),
      })
    )
    .mutation(async ({ctx, input}) => {
      try {
        const {name, email, password} = input;
        const {account, databases} = ctx;

        const user = await account.create(ID.unique(), email, password, name);

        await databases.createDocument(APPWRITE_DATABASE_ID, APPWRITE_CLIENTS_ID, user.$id, {
          name,
          email,
        });

        return user;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new TRPCError({code: "BAD_REQUEST", message: error.message});
        }
        throw new TRPCError({code: "BAD_REQUEST", message: "Unknown error"});
      }
    }),
});
