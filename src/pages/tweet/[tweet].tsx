import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Rightbar from "../../components/Rightbar";
import { Tweet } from "../../components/Timeline";
import { trpc } from "../../utils/trpc";

export default function TweetPage() {
  const id = useRouter().asPath.split("/")[2] as string;

  const { data, isFetching } = trpc.tweet.getUnique.useQuery({
    tweetId: id,
  });

  return (
    <div className="min-h-screen bg-slate-200">
      <Navbar />
      <Rightbar />
      {data && (
        <div>
          <Tweet tweet={data} />
        </div>
      )}
    </div>
  );
}
