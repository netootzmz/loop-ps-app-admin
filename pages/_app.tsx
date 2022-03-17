import "./../sass/styles.scss";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "animate.css";
import Cookies from "../components/Cookies";
import wrapper from "../store";

declare global {
  interface Window {
    _sift: any;
    ReactInputMask: any;
    eventListener: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <Cookies>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Cookies>
  );
}

export default wrapper.withRedux(MyApp);
