import "@/styles/globals.css";
import Head from "next/head";
import appStore from "@/utils/appStore";
import { Provider } from "react-redux";
export default function App({ Component, pageProps }) {
  const title = "Willowood - Delight";
  return (
    <Provider store={appStore}>
      <div>
        <Head>
          <meta property="og:image" content="/fav.png" />
          <link rel="icon" sizes="16x16" href="/fav.png" />
          <title>{title}</title>
          <meta
            name="og_site_name"
            property="og:site_name"
            content="willowood.com"
          />

          <meta property="og:type" content="website" />
        </Head>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
