import { z } from "zod";
import { publicProcedure, router } from "../trpc";
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
});
