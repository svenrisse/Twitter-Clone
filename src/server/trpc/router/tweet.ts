import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const tweetRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        text: z.string({
          required_error: "Tweet text is required",
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;

      const userId = session.user.id;

      return prisma.tweet.create({
        data: {
          text: input.text,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
});
