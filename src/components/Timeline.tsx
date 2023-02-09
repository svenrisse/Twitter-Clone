import dayjs from "dayjs";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import type { RouterInputs, RouterOutputs } from "../utils/trpc";
import { CreateTweet } from "./CreateTweet";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ThreeDots } from "react-loader-spinner";

const LIMIT = 10;

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("end", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1m",
    m: "1m",
    mm: "%d m",
    h: "1h",
    hh: "%d h ",
    d: "a d",
    dd: "%d d",
    M: "1M",
    MM: "%d M",
    y: "1y",
    yy: "%d y",
  },
});

function useScrollPosition() {
  const [scrollPosition, setScrollPostion] = useState(0);

  function handleScroll() {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const scrolled = (winScroll / height) * 100;

    setScrollPostion(scrolled);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}

export function Tweet({
  tweet,
}: {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
}) {
  const { data: session } = useSession();

  const utils = trpc.useContext();

  const { mutateAsync: likeMutation, isLoading: likeIsLoading } =
    trpc.tweet.like.useMutation({
      onSuccess: () => {
        utils.tweet.timeline.invalidate();
        utils.user.getUser.invalidate();
        utils.user.getLikes.invalidate();
      },
    });

  const { mutateAsync: unlikeMutation, isLoading: unlikeIsLoading } =
    trpc.tweet.unlike.useMutation({
      onSuccess: () => {
        utils.tweet.timeline.invalidate();
        utils.user.getUser.invalidate();
        utils.user.getLikes.invalidate();
      },
    });

  let hasLiked = tweet.likes.length > 0;

  if (!session) {
    hasLiked = false;
  }

  function handleLikeClick() {
    if (!session) {
      return;
    }

    if (hasLiked) {
      unlikeMutation({
        tweetId: tweet.id,
      });
      return;
    }

    likeMutation({
      tweetId: tweet.id,
    });
  }
  const { mutateAsync: deleteMutation, isLoading: deleteIsLoading } =
    trpc.tweet.delete.useMutation({
      onSuccess: () => {
        utils.tweet.timeline.invalidate();
      },
    });

  function handleDeleteClick(id: string) {
    deleteMutation({
      tweetId: id,
    });
  }

  return (
    <div className="mb-4 h-fit border-b-2 border-slate-400 pb-4">
      <div className="flex p-2">
        {tweet.author.image && (
          <Link
            href={{
              pathname: `${tweet.author.name}`,
              query: {
                id: tweet.authorId,
              },
            }}
          >
            <Image
              src={tweet.author.image}
              alt={`${tweet.author.name} profile picture`}
              width={48}
              height={48}
              className="max-h-12 rounded-full"
            />
          </Link>
        )}

        <div className="ml-2">
          <div className="flex items-center">
            <p className="font-bold">
              <Link
                href={{
                  pathname: `${tweet.author.name}`,
                  query: {
                    id: tweet.authorId,
                  },
                }}
              >
                @{tweet.author.name}
              </Link>
            </p>
            <p className="text-sm text-gray-400">
              {" "}
              - {dayjs(tweet.createdAt).fromNow()}
            </p>
          </div>

          <div>{tweet.text}</div>
        </div>
        <div className="ml-auto cursor-pointer"></div>
        {tweet.authorId == session?.user?.id && (
          <button className="ml-auto">
            <BsTrashFill
              size="1.5rem"
              onClick={() => handleDeleteClick(tweet.id)}
            />
          </button>
        )}
      </div>
      <div className="mt-4 flex items-center p-2">
        <AiFillHeart
          color={hasLiked ? "red" : "black"}
          size="2rem"
          onClick={handleLikeClick}
          className="active:fill-red-900"
        />
        <span className="text-sm text-gray-500">{tweet._count.likes}</span>
      </div>
    </div>
  );
}

export function Timeline({
  where = {},
  renderCreate,
}: {
  where: RouterInputs["tweet"]["timeline"]["where"];
  renderCreate: boolean;
}) {
  const { data: session } = useSession();

  if (!session) {
    renderCreate = false;
  }

  const scrollPosition = useScrollPosition();

  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.tweet.timeline.useInfiniteQuery(
      {
        limit: LIMIT,
        where,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

  // fetch nextPage when scroll position is at 90%
  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching, scrollPosition]);

  return (
    <div className="w-11/12 lg:w-1/2 2xl:w-5/12">
      {renderCreate && <CreateTweet />}
      <div className="mt-8 rounded-xl border-l-2 border-r-2 border-t-2 border-slate-400">
        {tweets.map((tweet) => {
          return <Tweet key={tweet.id} tweet={tweet} />;
        })}
      </div>
      <div className="flex justify-center">
        {isFetching && <ThreeDots color="cyan" height="100" />}
      </div>
      {!hasNextPage && !isFetching && <p>No more Tweets to load.</p>}
    </div>
  );
}
