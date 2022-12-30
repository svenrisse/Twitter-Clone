import { router } from "../trpc";
import { authRouter } from "./auth";
import { tweetRouter } from "./tweet";
import { userRouter } from "./user";

export const appRouter = router({
  tweet: tweetRouter,
  auth: authRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
