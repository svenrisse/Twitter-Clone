import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { Tweet } from "../components/Timeline";
import { trpc } from "../utils/trpc";
import Head from "next/head";

export default function Liked() {
  const { data: session } = useSession();

  const { data } = trpc.user.getLikes.useQuery({
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
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Navbar focusedLiked={true} />
        <h1 className="mt-6 font-sans text-lg font-medium">Tweets you liked</h1>
        <div className="mt-4 mb-20 h-max w-11/12 rounded-xl border-l-2 border-r-2 border-t-2 border-slate-400">
          {tweets}
        </div>
      </div>
    </>
  );
}
