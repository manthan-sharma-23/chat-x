import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  sendFriendRequest: protectedProcedure
    .input(z.object({ friendId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(ctx);
      console.log(input);
      return "";
    }),

  acceptFriendRequest: protectedProcedure
    .input(z.object({ request_id: z.string() }))
    .mutation(async (opts) => {
      console.log(opts);
      
    }),
});
