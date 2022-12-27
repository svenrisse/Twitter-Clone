import { tweetSchema } from "../../../components/CreateTweet";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";

export const tweetRouter = router({
  create: protectedProcedure.input(tweetSchema).mutation(({ ctx, input }) => {
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
  timeline: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const tweets = await prisma.tweet.findMany({
        take: input.limit + 1,
        orderBy: [{ createdAt: "desc" }],
        cursor: input.cursor ? { id: input.cursor } : undefined,
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

      let nextCursor: typeof input.cursor | undefined = undefined;

      if (tweets.length > input.limit) {
        const nextItem = tweets.pop() as typeof tweets[number];
        nextCursor = nextItem.id;
      }

      return {
        tweets,
        nextCursor,
      };
    }),
});
