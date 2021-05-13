import App from 'next/app';
import Layout from '../layouts';
import normalize from 'normalize.css';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <Layout pageTitle='Blog' description='My Personal Blog'>
      <NextNprogress color='#0288D1' startPosition={0.3} stopDelayMs={200} height={2} />
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
