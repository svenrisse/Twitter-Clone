import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { Container } from "../components/Container";
import { LoggedOutBanner } from "../components/LoggedOutBanner";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="TypeScript App built by Sven Risse" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Container>
          <main>
            <Component {...pageProps} />
          </main>
        </Container>
        <LoggedOutBanner />
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
