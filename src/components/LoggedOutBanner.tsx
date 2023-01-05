import { signIn, signOut, useSession } from "next-auth/react";
import { Container } from "./Container";
export function LoggedOutBanner() {
  const { data: session } = useSession();

  if (session) {
    return null;
  }
  return (
    <div className="w- fixed bottom-0 flex w-full justify-center bg-slate-500 p-4">
      <Container
        classNames="bg-transparent flex justify-between items-center w-1/2
      "
      >
        <p className="text-center text-xl font-bold">
          Please login to get access to all features!
        </p>
        <div>
          <button
            className="w-40 rounded-full bg-cyan-500 px-4 py-2 text-xl text-white shadow-md"
            onClick={() => signIn()}
          >
            Login
          </button>
        </div>
      </Container>
    </div>
  );
}
