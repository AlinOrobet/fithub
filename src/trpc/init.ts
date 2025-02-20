import {initTRPC, TRPCError} from "@trpc/server";
import {cache} from "react";
import superjson from "superjson";
export const createTRPCContext = cache(async () => {
  return {userRole: "admin"};
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {
  const {ctx} = opts;
  if (ctx.userRole !== "admin") {
    throw new TRPCError({code: "UNAUTHORIZED"});
  }

  return opts.next({ctx: {...ctx}});
});
