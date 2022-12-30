import { useRouter } from "next/router";
import { Timeline } from "../components/Timeline";
import { trpc } from "../utils/trpc";

export default function UserPage() {
  const router = useRouter();
  const name = router.query.name as string;
  const id = router.query.id as string;

  const { data } = trpc.user.getUser.useQuery({
    id: id,
  });
  return (
    <div>
      {data?.image}
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
