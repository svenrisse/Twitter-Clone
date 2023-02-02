import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { Tweet } from "../components/Timeline";
import { trpc } from "../utils/trpc";
import Head from "next/head";
import { ThreeDots } from "react-loader-spinner";
import Rightbar from "../components/Rightbar";

export default function Liked() {
  const { data: session } = useSession();

  const { data, isFetching } = trpc.user.getLikes.useQuery({
    id: session?.user?.id,
  });

  const tweets = data?.map((tweet) => {
    return <Tweet key={tweet.id} tweet={tweet} />;
  });

  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center">
        <Navbar focusedLiked={true} />
        <h1 className="w-screen rounded-b-md bg-slate-600 py-2 text-center font-mono text-xl font-medium uppercase text-slate-200">
          Tweets you liked
        </h1>
        {isFetching ? (
          <ThreeDots color="cyan" height="100" />
        ) : (
          <div className="mt-4 mb-20 h-max w-11/12 rounded-xl border-l-2 border-r-2 border-t-2 border-slate-400 lg:w-1/2">
            {tweets}
          </div>
        )}
        <Rightbar />
      </div>
    </>
  );
}
