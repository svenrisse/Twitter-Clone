import { useState } from "react";
import { object, string } from "zod";
import { trpc } from "../utils/trpc";

export const tweetSchema = object({
  text: string({
    required_error: "Tweet text is required",
  })
    .min(10)
    .max(200),
});

export function CreateTweet() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { mutateAsync } = trpc.tweet.create.useMutation();

  async function handleSubmit(e) {
    e.prevent.default();

    try {
      await tweetSchema.parse({ text });
    } catch (e) {
      setError(e.message);
      return;
    }

    mutateAsync({ text });
  }

  return (
    <>
      {error && JSON.stringify(error)}
      <form
        onSubmit={handleSubmit}
        className="mb-4 flex w-full flex-col rounded-md border-2 p-4"
      >
        <textarea
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 shadow"
        />
        <div className="mt-4 flex justify-end">
          <button
            className="bg-primary rounded-md px-4 py-2 text-white"
            type="submit"
          >
            Tweet
          </button>
        </div>
      </form>
    </>
  );
}
