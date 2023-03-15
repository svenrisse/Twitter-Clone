import { useRouter } from "next/router";
import { Timeline } from "../../components/Timeline";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Rightbar from "../../components/Rightbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSession } from "next-auth/react";

export default function UserPage() {
  const router = useRouter();
  const name = router.query.name as string;
  const id = router.query.id as string;
  const userId = useSession().data?.user?.id;
  const { data: session } = useSession();

  const { data, isInitialLoading } = trpc.user.getUser.useQuery({
    id: id,
  });

  const hasFollow =
    typeof data?.followers.length === "number" && data.followers.length > 0
      ? true
      : false;

  const { mutateAsync: followMutation } = trpc.user.follow.useMutation({});

  function handleFollowClick(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!session || !data?.id) {
      return;
    }

    if (hasFollow) {
      alert("Already following!");
      return;
    }

    followMutation({
      userId: data.id,
    });
  }

  const countComments =
    (data?._count.tweet as number) - (data?.tweet.length as number);

  const countTweets = data?.tweet.length as number;

  return (
    <>
      <Navbar focused={id == userId ? "profile" : ""} />
      <Rightbar />
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
              <div className="flex w-1/2 gap-10 pt-5">
                <div className="flex w-min flex-col items-center">
                  <span className="font-bold">
                    {isInitialLoading ? (
                      <Skeleton width={40} inline={true} borderRadius={24} />
                    ) : (
                      countTweets
                    )}
                  </span>
                  <span>
                    {countTweets > 1 || countTweets < 1 ? "Tweets" : "Tweet"}
                  </span>
                </div>
                <div className="flex w-min flex-col items-center">
                  <span className="font-bold">
                    {isInitialLoading ? (
                      <Skeleton width={40} inline={true} borderRadius={24} />
                    ) : (
                      countComments
                    )}
                  </span>
                  <span>
                    {countComments > 1 || countComments < 1
                      ? "Comments"
                      : "Comment"}
                  </span>
                </div>
                <div className="flex w-min flex-col items-center">
                  <span className="font-bold">
                    {isInitialLoading ? (
                      <Skeleton width={40} inline={true} borderRadius={24} />
                    ) : (
                      data?.likes.length
                    )}
                  </span>
                  <span>Liked</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button onClick={(e) => handleFollowClick(e)}>
              Follow/Unfollow
            </button>
          </div>
          <Timeline
            where={{
              author: {
                name,
              },
            }}
            renderCreate={false}
          />
        </div>
      </div>
    </>
  );
}
