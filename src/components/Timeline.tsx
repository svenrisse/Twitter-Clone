import { trpc } from "../utils/trpc";
import { CreateTweet } from "./CreateTweet";

export function Timeline() {
  const { data } = trpc.tweet.timeline.useQuery({});

  return (
    <div>
      <CreateTweet />
      {JSON.stringify(data)}
    </div>
  );
}
