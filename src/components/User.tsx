import Link from "next/link";
import type { RouterOutputs } from "../utils/trpc";
import Image from "next/image";

export default function User({
  user,
}: {
  user: RouterOutputs["user"]["getFollows"]["follows"][number];
}) {
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
        <div className="p-2">
          <Image
            src={user.image as string}
            alt={`${user.name} picture`}
            width={0}
            height={0}
            sizes="100vw"
            className="h-12 w-12 rounded-full"
          />
        </div>
      </Link>
    </div>
  );
}
