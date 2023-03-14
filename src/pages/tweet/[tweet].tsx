import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Rightbar from "../../components/Rightbar";
import { Tweet } from "../../components/Timeline";
import { trpc } from "../../utils/trpc";
import { ThreeDots } from "react-loader-spinner";
import CreateComment from "../../components/CreateComment";
import { AiOutlineArrowDown } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

export default function TweetPage() {
  const router = useRouter();
  const id = router.asPath.split("/")[2] as string;

  const { data, isFetching, isInitialLoading } = trpc.tweet.getUnique.useQuery({
    tweetId: id,
  });

  const { data: dataOriginal } = trpc.tweet.getUnique.useQuery(
    { tweetId: data?.originalTweetId as string },
    { enabled: typeof data?.originalTweetId === "string" }
  );

  const { data: dataLikes } = trpc.tweet.uniqueLikes.useQuery({
    tweetId: id,
  });

  if (!data && !isFetching) {
    router.push("/");
  }

  const comments = data?.comments.map((comment) => {
    return <Tweet tweet={comment} key={comment.id} />;
  });

  const likeImages = dataLikes?.map((like) => {
    if (like.user.name && like.user.image)
      return (
        <Link
          href={{
            pathname: `/profile/${like.user.name}`,
            query: {
              id: like.userId,
            },
          }}
          replace
        >
          <Image
            src={like.user.image}
            alt={`${like.user.name} profile picture`}
            key={like.userId}
            width={30}
            height={30}
            className="rounded-xl"
            title={like.user.name}
          />
        </Link>
      );
  });

  return (
    <>
      <Navbar />
      <Rightbar />
      <div className="flex min-h-screen flex-col items-center">
        <h1 className="w-screen rounded-b-md bg-slate-600 py-2 text-center font-mono text-xl font-medium uppercase text-slate-200">
          Tweet
        </h1>
        {isInitialLoading ? (
          <ThreeDots color="cyan" height="100" />
        ) : (
          <>
            {dataOriginal && (
              <>
                <div className="mt-12 mb-6 h-max w-11/12 rounded-xl border-l-2 border-r-2 border-t-2 border-slate-400 lg:w-1/2 2xl:w-5/12">
                  <Tweet tweet={dataOriginal} />
                </div>
                <AiOutlineArrowDown size="1.5rem" />
              </>
            )}
            <div className="mt-6 mb-6 h-max w-11/12 rounded-xl border-l-2 border-r-2 border-t-2 border-slate-400 lg:w-1/2 2xl:w-5/12">
              {data && <Tweet tweet={data} />}
            </div>
            {dataLikes?.length !== 0 && (
              <div className="ml-5 mb-6 self-start md:ml-12 lg:ml-0 lg:w-5/12 lg:self-center xl:ml-12 xl:w-5/12">
                <h2 className="mb-1 text-sm text-slate-500">Liked by:</h2>
                <div className="flex gap-1">{likeImages}</div>
              </div>
            )}
            <CreateComment tweetId={id} />

            {comments !== undefined && comments?.length > 0 && (
              <div className="mt-12 mb-20 h-max w-11/12 rounded-xl border-l-2 border-r-2 border-t-2 border-slate-400 lg:w-5/12 2xl:w-4/12">
                {comments}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
