import { useRouter } from "next/router";
import { Timeline, Tweet } from "../../components/Timeline";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Rightbar from "../../components/Rightbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UserPage() {
  const router = useRouter();
  const name = router.query.name as string;
  const id = router.query.id as string;
  const userId = useSession().data?.user?.id;
  const { data: session } = useSession();
  const utils = trpc.useContext();

  const [active, setActive] = useState("tweets");

  const { data, isInitialLoading } = trpc.user.getUser.useQuery({
    id: id,
  });

  const { mutateAsync: followMutation, isLoading: followLoading } =
    trpc.user.follow.useMutation({
      onSuccess: () => {
        utils.user.getUser.invalidate();
      },
    });

  const { mutateAsync: unfollowMutation, isLoading: unfollowLoading } =
    trpc.user.unfollow.useMutation({
      onSuccess: () => {
        utils.user.getUser.invalidate();
      },
    });

  const countComments = data?.tweet.length;

  const countTweets = data && data?._count.tweet - data.tweet.length;

  const hasFollow =
    typeof data?.followers.length === "number" && data.followers.length > 0
      ? true
      : false;

  function handleFollowClick(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!session || !data?.id || data.id === userId) {
      return;
    }

    if (hasFollow) {
      unfollowMutation({
        userId: data.id,
      });
      return;
    }

    followMutation({
      userId: data.id,
    });
  }

  const comments = data?.tweet.map((tweet) => {
    return <Tweet key={tweet.id} tweet={tweet} />;
  });

  const likedTweets = data?.likes.map((like) => {
    return <Tweet key={like.tweet.id} tweet={like.tweet} />;
  });

  return (
    <>
      <Navbar focused={id == userId ? "profile" : ""} />
      <Rightbar />
      {data && (
        <div className="flex min-h-screen w-screen flex-col items-center">
          <h1 className="w-screen rounded-b-md bg-slate-600 py-2 text-center font-mono text-xl font-medium uppercase text-slate-200">
            {isInitialLoading ? (
              <Skeleton
                width={60}
                duration={0.5}
                borderRadius={24}
                inline={true}
              />
            ) : (
              <span>{`${data?.name}`}</span>
            )}
            {`'s Profile`}
          </h1>
          <div className="flex w-11/12 flex-col items-center">
            <div className="flex flex-col items-center pt-10 text-center">
              <div className="ml-3">
                {isInitialLoading ? (
                  <Skeleton
                    height={100}
                    width={100}
                    duration={0.5}
                    borderRadius={100}
                  />
                ) : (
                  <Image
                    src={data?.image as string}
                    alt={`${data?.name} profile image`}
                    height={100}
                    width={100}
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="pt-4">
                <h2 className="font-bold">
                  @
                  {isInitialLoading ? (
                    <Skeleton width={50} duration={0.5} borderRadius={24} />
                  ) : (
                    data?.name
                  )}
                </h2>
                <div className="flex w-fit pt-5">
                  <div
                    className={`${
                      active === "tweets" && "bg-slate-400"
                    } flex w-16 cursor-pointer flex-col items-center rounded-xl p-2`}
                    onClick={() => setActive("tweets")}
                  >
                    <span className="font-bold md:text-lg">
                      {isInitialLoading ? (
                        <Skeleton width={40} inline={true} borderRadius={24} />
                      ) : (
                        countTweets
                      )}
                    </span>
                    <span className="text-xs text-gray-600 md:text-lg">
                      {countTweets && (countTweets > 1 || countTweets < 1)
                        ? "Tweets"
                        : "Tweet"}
                    </span>
                  </div>
                  <div
                    className={`${
                      active === "comments" && "bg-slate-400"
                    } flex w-16 cursor-pointer flex-col  items-center rounded-xl p-2`}
                    onClick={() => setActive("comments")}
                  >
                    <span className="font-bold md:text-lg">
                      {isInitialLoading ? (
                        <Skeleton width={40} inline={true} borderRadius={24} />
                      ) : (
                        countComments
                      )}
                    </span>
                    <span className="text-xs text-gray-600 md:text-lg">
                      {countComments && (countComments > 1 || countComments < 1)
                        ? "Comments"
                        : "Comment"}
                    </span>
                  </div>
                  <div
                    className={`${
                      active === "likes" && "bg-slate-400"
                    } flex w-16 cursor-pointer flex-col items-center rounded-xl p-2`}
                    onClick={() => setActive("likes")}
                  >
                    <span className="font-bold md:text-lg">
                      {isInitialLoading ? (
                        <Skeleton width={40} inline={true} borderRadius={24} />
                      ) : (
                        data?.likes.length
                      )}
                    </span>
                    <span className="text-xs text-gray-600 md:text-lg">
                      Liked
                    </span>
                  </div>
                  <div
                    className={`${
                      active === "followers" && "bg-slate-400"
                    } flex w-16 cursor-pointer flex-col items-center rounded-xl p-2`}
                    onClick={() => setActive("followers")}
                  >
                    <span className="font-bold md:text-lg">
                      {isInitialLoading ? (
                        <Skeleton width={40} inline={true} borderRadius={24} />
                      ) : (
                        data?._count.followers
                      )}
                    </span>
                    <span className="text-xs text-gray-600 md:text-lg">
                      Followers
                    </span>
                  </div>
                  <div
                    className={`${
                      active === "follows" && "bg-slate-400"
                    } flex w-16 cursor-pointer flex-col items-center rounded-xl p-2`}
                    onClick={() => setActive("follows")}
                  >
                    <span className="font-bold md:text-lg">
                      {isInitialLoading ? (
                        <Skeleton width={40} inline={true} borderRadius={24} />
                      ) : (
                        data?._count.follows
                      )}
                    </span>
                    <span className="text-xs text-gray-600 md:text-lg">
                      Follows
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {data?.id !== userId && session?.user && (
              <div className="mt-3">
                <button
                  onClick={(e) => handleFollowClick(e)}
                  className={`h-12 w-28 rounded-md bg-primary px-4 py-2 font-bold text-white active:bg-blue-600 ${
                    hasFollow && "hover:bg-red-500"
                  }`}
                  disabled={followLoading || unfollowLoading}
                >
                  {followLoading || unfollowLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <div>{hasFollow ? "Following" : "Follow"}</div>
                  )}
                </button>
              </div>
            )}
            {active === "tweets" && (
              <>
                <Timeline
                  where={{
                    author: {
                      name,
                    },
                  }}
                  renderCreate={false}
                />
              </>
            )}
            {active === "comments" && (
              <div className="mt-12 mb-20 h-max w-11/12 rounded-xl border-l-2 border-r-2 border-t-2 border-slate-400 lg:w-1/2 2xl:w-5/12">
                {comments}
              </div>
            )}
            {active === "likes" && (
              <div className="mt-12 mb-20 h-max w-11/12 rounded-xl border-l-2 border-r-2 border-t-2 border-slate-400 lg:w-1/2 2xl:w-5/12">
                {likedTweets}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
