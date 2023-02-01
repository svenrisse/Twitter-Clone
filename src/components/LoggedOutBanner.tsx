import { signIn, useSession } from "next-auth/react";
export function LoggedOutBanner() {
  const { data: session } = useSession();

  if (session) {
    return null;
  }
  return (
    <div className="fixed bottom-0 flex w-full items-center gap-3 bg-slate-600 px-2 py-2">
      <p className="text-center font-mono text-base font-bold text-slate-200">
        Please login to get access to all features!
      </p>
      <div>
        <button
          className="rounded-full bg-cyan-500 py-2 px-8 font-mono text-base text-slate-600 shadow-md"
          onClick={() => signIn()}
        >
          Login
        </button>
      </div>
    </div>
  );
}
