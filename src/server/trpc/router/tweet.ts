import { tweetSchema } from "../../../components/CreateTweet";
import { protectedProcedure, router } from "../trpc";

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
});
