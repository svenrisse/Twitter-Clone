import Image from "next/image";
import { RouterOutputs, trpc } from "../utils/trpc";
import { CreateTweet } from "./CreateTweet";

function Tweet({
  tweet,
}: {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
}) {
  return (
    <div className="mb-4 border-b-2 border-gray-500">
      <div className="flex p-2">
        {tweet.author.image && (
          <Image
            src={tweet.author.image}
            alt={`${tweet.author.name} profile picture`}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
        <div className="ml-2">
          <div className="flex">
            <p>{tweet.author.name}</p>
            <p> - {new Date(tweet.createdAt).toISOString()}</p>
          </div>

          <div>{tweet.text}</div>
        </div>
      </div>
    </div>
  );
}

export function Timeline() {
  const { data } = trpc.tweet.timeline.useQuery({ limit: 2 });
  return (
    <div>
      <CreateTweet />
      <div className="border-l-2 border-r-2 border-t-2 border-gray-500">
        {data?.tweets.map((tweet) => {
          return <Tweet key={tweet.id} tweet={tweet} />;
        })}
      </div>
    </div>
  );
}
