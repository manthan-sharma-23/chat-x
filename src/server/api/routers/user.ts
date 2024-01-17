import { z } from "zod";
import bcrypt from "bcryptjs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const USER_REGISTER_TYPE = z.object({
  name: z.string().nullable(),
  email: z.string(),
  password: z.string().min(5),
});

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const db = ctx.db;
      const email = input.email;

      const user = await db.user.findUnique({
        where: {
          email: email,
        },
        include: {
          channels: true,
          friends: true,
        },
      });

      return user;
    }),

  register: publicProcedure
    .input(USER_REGISTER_TYPE)
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;

      try {
        const user = await db.user.findUnique({
          where: {
            email: input.email,
          },
        });

        if (user)
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already registered",
          });

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(input.password, salt);

        await db.user.create({
          data: {
            ...input,
            password: hash,
          },
        });

        return {
          message: "Registered succesfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  hello: publicProcedure.query((opts) => {
    return { hello: "hello" };
  }),
});
