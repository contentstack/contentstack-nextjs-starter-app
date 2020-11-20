/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import "../styles/style.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
