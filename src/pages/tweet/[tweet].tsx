import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Rightbar from "../../components/Rightbar";
import { Tweet } from "../../components/Timeline";
import { trpc } from "../../utils/trpc";
import { ThreeDots } from "react-loader-spinner";
import CreateComment from "../../components/CreateComment";

export default function TweetPage() {
  const router = useRouter();
  const id = router.asPath.split("/")[2] as string;

  const { data, isFetching } = trpc.tweet.getUnique.useQuery({
    tweetId: id,
  });

  if (!data && !isFetching) {
    router.push("/");
  }

  const comments = data?.comments.map((comment) => {
    return <Tweet tweet={comment} key={comment.id} />;
  });

  return (
    <>
      <Navbar />
      <Rightbar />
      <div className="flex min-h-screen flex-col items-center">
        <h1 className="w-screen rounded-b-md bg-slate-600 py-2 text-center font-mono text-xl font-medium uppercase text-slate-200">
          Tweet
        </h1>
        {isFetching ? (
          <ThreeDots color="cyan" height="100" />
        ) : (
          <>
            <div className="mt-12 mb-12 h-max w-11/12 rounded-xl border-l-2 border-r-2 border-t-2 border-slate-400 lg:w-1/2 2xl:w-5/12">
              {data && <Tweet tweet={data} />}
            </div>

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
