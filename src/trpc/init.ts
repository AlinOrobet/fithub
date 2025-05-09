import superjson from "superjson";
import {cache} from "react";

import {initTRPC, TRPCError} from "@trpc/server";
import {AUTH_COOKIE} from "@/config";
import {cookies} from "next/headers";
import {createClient, createSessionClient} from "@/lib/appwrite";
import {ratelimit} from "@/lib/ratelimit";

export const createTRPCContext = cache(async () => {
  const {account, databases, user, storage} = await createClient();

  return {account, user, databases, storage};
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedUserProcedure = t.procedure.use(async function isAuthed(opts) {
  const cookieValues = await cookies();
  const session = cookieValues.get(AUTH_COOKIE);

  if (!session) {
    throw new TRPCError({code: "UNAUTHORIZED"});
  }

  try {
    const {account} = await createSessionClient();
    const user = await account.get();

    const {success} = await ratelimit.limit(user.$id);

    if (!success) {
      throw new TRPCError({code: "TOO_MANY_REQUESTS"});
    }

    return opts.next({ctx: {...opts.ctx, user}});
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new TRPCError({code: "UNAUTHORIZED", message: error.message});
    }
    throw new TRPCError({code: "UNAUTHORIZED", message: "Unknown error"});
  }
});

export const protectedAdminProcedure = t.procedure.use(async function isAuthed(opts) {
  const cookieValues = await cookies();
  const session = cookieValues.get(AUTH_COOKIE);

  if (!session) {
    throw new TRPCError({code: "UNAUTHORIZED"});
  }

  try {
    const {account} = await createSessionClient();
    const user = await account.get();

    if (!user.labels.includes("admin")) {
      throw new TRPCError({code: "UNAUTHORIZED"});
    }

    return opts.next({ctx: {...opts.ctx, user}});
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new TRPCError({code: "UNAUTHORIZED", message: error.message});
    }
    throw new TRPCError({code: "UNAUTHORIZED", message: "Unknown error"});
  }
});
