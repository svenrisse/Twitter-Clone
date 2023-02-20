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
        onSubmit={(e) => handleSubmit(e)}
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
            className="h-12 w-20 rounded-md bg-primary px-4 py-2 font-bold text-white active:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Tweet"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
