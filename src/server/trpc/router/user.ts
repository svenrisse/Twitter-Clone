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
      return await ctx.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          likes: true,
          tweet: true,
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

      return ctx.prisma.tweet.findMany({
        where: {
          likes: {
            some: {
              userId: {
                contains: id,
              },
            },
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
        },
      });
    }),
});
