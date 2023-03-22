import { number, z } from "zod";
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
          likes: {
            orderBy: [{ createdAt: "desc" }],
            include: {
              tweet: {
                include: {
                  likes: {
                    where: {
                      userId: ctx.session?.user?.id,
                    },
                  },
                  _count: true,
                  author: {
                    select: {
                      name: true,
                      image: true,
                      id: true,
                    },
                  },
                },
              },
            },
          },
          followers: {
            where: {
              followingUserId: userId,
            },
          },
          tweet: {
            where: {
              NOT: [{ originalTweet: null }],
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
          likes: {
            where: {
              userId: ctx.session.user.id,
            },
          },
          _count: true,
        },
      });
    }),
  followTweets: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.tweet.findMany({
        where: {
          author: {
            followers: {
              some: {
                followingUserId: input.id,
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
          likes: {
            where: {
              userId: ctx.session.user.id,
            },
          },
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
          followedUser: {
            connect: {
              id: input.userId,
            },
          },
          followingUser: {
            connect: {
              id: user,
            },
          },
        },
      });
    }),
  unfollow: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.follow.delete({
        where: {
          followedUserId_followingUserId: {
            followedUserId: input.userId,
            followingUserId: ctx.session.user.id,
          },
        },
      });
    }),
});
