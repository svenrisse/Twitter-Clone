import { tweetSchema } from "../../../components/CreateTweet";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";

export const tweetRouter = router({
  create: protectedProcedure.input(tweetSchema).mutation(({ ctx, input }) => {
    const userId = ctx.session.user.id;

    return ctx.prisma.tweet.create({
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
        where: z
          .object({
            author: z
              .object({
                name: z.string().optional(),
              })
              .optional(),
          })
          .optional()
          .optional(),
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;

      const tweets = await ctx.prisma.tweet.findMany({
        take: input.limit + 1,
        where: {
          author: input.where?.author,
          AND: {
            originalTweet: null,
          },
        },
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
          likes: {
            where: {
              userId,
            },
            select: {
              userId: true,
            },
          },
          _count: true,
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;

      if (tweets.length > input.limit) {
        const nextItem = tweets.pop() as (typeof tweets)[number];
        nextCursor = nextItem.id;
      }

      return {
        tweets,
        nextCursor,
      };
    }),
  like: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.like.create({
        data: {
          tweet: {
            connect: {
              id: input.tweetId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
  unlike: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.like.delete({
        where: {
          tweetId_userId: {
            tweetId: input.tweetId,
            userId: ctx.session.user.id,
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ tweetId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tweet.delete({
        where: { id: input.tweetId },
      });
    }),
  getUnique: publicProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.tweet.findUnique({
        where: {
          id: input.tweetId,
        },
        include: {
          likes: {
            where: {
              userId,
            },
          },
          comments: true,
          _count: true,
          author: true,
        },
      });
    }),
  comment: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
        text: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.tweet.update({
        where: {
          id: input.tweetId,
        },
        data: {
          comments: {
            create: [
              {
                text: input.text,
                author: {
                  connect: {
                    id: userId,
                  },
                },
              },
            ],
          },
        },
      });
    }),
});
