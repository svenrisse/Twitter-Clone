import { useRouter } from "next/router";
import { Timeline } from "../components/Timeline";
import { trpc } from "../utils/trpc";
import Image from "next/image";

export default function UserPage() {
  const router = useRouter();
  const name = router.query.name as string;
  const id = router.query.id as string;

  const { data } = trpc.user.getUser.useQuery({
    id: id,
  });
  return (
    <div>
      <div className="pt-10">
        <div className="ml-3">
          <Image
            src={data?.image as string}
            alt={`${data?.name} profile image`}
            height={100}
            width={100}
          />
        </div>
        <div className="pt-5">
          <h2>@{data?.name}</h2>
          <div className="flex w-1/2 justify-between">
            <span>0 Following</span>
            <span>0 Followers</span>
            <span>{data?.tweet.length} Tweets</span>
            <span>{data?.likes.length} Likes given</span>
          </div>
        </div>
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
  );
}
