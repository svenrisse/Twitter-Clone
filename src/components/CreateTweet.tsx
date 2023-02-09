import React, { useState } from "react";
import { object, string } from "zod";
import { trpc } from "../utils/trpc";

export const tweetSchema = object({
  text: string({ required_error: "Text is required" }).min(10).max(280),
});

export function CreateTweet() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const utils = trpc.useContext();

  const { mutateAsync, isLoading } = trpc.tweet.create.useMutation({
    onSuccess: () => {
      setText("");
      utils.tweet.timeline.invalidate();
    },
  });

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    try {
      tweetSchema.parse({ text });
    } catch (e: any) {
      setError(e.message);
      return;
    }

    mutateAsync({ text });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-4 flex w-full flex-col rounded-md border-2 p-4"
      >
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="w-full rounded-xl p-4 shadow"
          minLength={10}
          maxLength={280}
          placeholder="Say something to the world..."
        />
        <div className="mt-4 flex justify-between">
          <div className="font-bold text-red-400">
            {error &&
              "Tweet must contain at least 10 characters and less than 280 !"}
          </div>
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-white"
            disabled={isLoading}
          >
            Tweet
          </button>
        </div>
      </form>
    </>
  );
}
