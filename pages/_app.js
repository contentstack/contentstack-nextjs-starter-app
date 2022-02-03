import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/third-party.css";
import "../styles/style.css";
import '@contentstack/live-preview-utils/dist/main.css';

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
