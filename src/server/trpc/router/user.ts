import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
export const userRouter = router({
  getUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          likes: true,
          follows: {
            where: {
              followerId: userId,
            },
          },
          tweet: {
            where: {
              originalTweet: null,
            },
          },
          _count: true,
        },
      });
    }),

  getLikes: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      return await ctx.prisma.tweet.findMany({
        where: {
          likes: {
            some: {
              userId: {
                contains: id,
              },
            },
          },
          AND: {
            originalTweet: null,
          },
        },
        orderBy: [{ createdAt: "desc" }],
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
          likes: true,
          _count: true,
        },
      });
    }),
  follow: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const user = ctx.session.user.id;

      return ctx.prisma.follow.create({
        data: {
          follower: {
            connect: {
              id: user,
            },
          },
          originalUser: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),
});
