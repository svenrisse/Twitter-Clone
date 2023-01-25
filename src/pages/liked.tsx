import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";
import { Tweet } from "../components/Timeline";
import { trpc } from "../utils/trpc";
export default function Liked() {
  const { data: session } = useSession();

  const { data } = trpc.user.getLikes.useQuery({
    id: session?.user?.id,
  });
  const client = useQueryClient();

  console.log(data);
  return (
    <div className="flex min-h-screen justify-center">
      <Leftbar />

      <div>This is still Work in Progress, please come back later :) </div>
      <Rightbar />
    </div>
  );
}
