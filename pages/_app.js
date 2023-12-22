import "@/styles/globals.css";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  const title = "Willowood - Delights";
  return (
    <>
      <div>
        <Head>
          <meta property="og:image" content="/favicon.png" />
          <title>{title}</title>
          <meta name="og_site_name" property="og:site_name" content="willowood.com" />
          <meta property="og:type" content="website" />
        </Head>
        <Component {...pageProps} />
      </div>
    </>
  );
}
