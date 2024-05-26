import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import ContextProvider from "../config/context/context";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
  <ContextProvider>
        <Component {...pageProps} />
    </ContextProvider>
      </RecoilRoot>
    </SessionProvider>
    
  );
}

export default MyApp;
