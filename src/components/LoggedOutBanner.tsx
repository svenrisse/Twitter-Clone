import { signIn, signOut, useSession } from "next-auth/react";
import { Container } from "./Container";
export function LoggedOutBanner() {
  const { data: session } = useSession();

  if (session) {
    return null;
  }
  return (
    <div className="w- fixed bottom-0 flex w-full justify-center bg-primary p-4">
      <Container
        classNames="bg-transparent flex justify-between w-1/2
      "
      >
        <p className="text-center">Do not miss out</p>
        <div>
          <button
            className="px-4 py-2 text-white shadow-md"
            onClick={() => signIn()}
          >
            Login
          </button>
        </div>
      </Container>
    </div>
  );
}
