import Link from "next/link";
import type { RouterOutputs } from "../utils/trpc";
import Image from "next/image";

export default function User({
  user,
}: {
  user: RouterOutputs["user"]["getFollows"]["follows"][number];
}) {
  const countTweets = user._count.tweet - user.tweet.length;

  return (
    <div className="h-fit rounded-b-md border-b-2 border-slate-400 pb-4">
      <Link
        href={{
          pathname: `/profile/${user.name}`,
          query: {
            id: user.id,
          },
        }}
      >
        <div className="flex p-2">
          <Image
            src={user.image as string}
            alt={`${user.name} picture`}
            width={0}
            height={0}
            sizes="100vw"
            className="h-12 w-12 rounded-full"
          />
          <div className="w-screen px-2 md:flex md:flex-col md:items-center">
            <span className="px-2 font-bold md:self-start">@{user.name}</span>
            <div className="flex gap-3 py-2 md:gap-10">
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold md:text-base">
                  {user._count.followers}
                </span>
                <span className="text-xs text-gray-600 md:text-lg">
                  {user._count.followers === 1 ? "Follower" : "Followers"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold md:text-base">
                  {user._count.follows}
                </span>
                <span className="text-xs text-gray-600 md:text-lg">
                  Follows
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold md:text-base">
                  {" "}
                  {countTweets}
                </span>
                <span className="text-xs text-gray-600 md:text-lg">
                  {countTweets === 1 ? "Tweet" : "Tweets"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold md:text-base">
                  {user._count.tweet - countTweets}
                </span>
                <span className="text-xs text-gray-600 md:text-lg">
                  {user._count.tweet - countTweets === 1
                    ? "Comment"
                    : "Comments"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold md:text-base">
                  {user._count.likes}
                </span>
                <span className="text-xs text-gray-600 md:text-lg">
                  {user._count.likes === 1 ? "Like" : "Likes"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
