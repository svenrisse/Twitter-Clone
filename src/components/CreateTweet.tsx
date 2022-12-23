import { useState } from "react";
import { object, string } from "zod";
import { trpc } from "../utils/trpc";

export const tweetSchema = object({
  text: string({ required_error: "Text is required" }).min(10).max(280),
});

export function CreateTweet() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync } = trpc.tweet.create.useMutation();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await tweetSchema.parse(text);
    } catch (e) {
      setError(e.message);
      return;
    }

    mutateAsync({ text });
  }
  return (
    <>
      {error && JSON.stringify(error)}
      <form onSubmit={handleSubmit}>
        <textarea onChange={(e) => setText(e.target.value)} />
        <div>
          <button type="submit">Tweet</button>
        </div>
      </form>
    </>
  );
}
