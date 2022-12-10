import { z } from "zod";
import { tweetSchema } from "../../../components/CreateTweet";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const tweetRouter = router({
  create: protectedProcedure.input(tweetSchema).mutation(({ ctx, input }) => {
    const { prisma, session } = ctx;
    const { text } = input;
    const userId = session.user.id;
    return prisma.tweet.create({
      data: {
        text,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }),
  timeline: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, limit } = input;

      const tweets = await prisma.tweet.findMany({
        take: limit + 1,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      });

      return {
        tweets,
      };
    }),
});
