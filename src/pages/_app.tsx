import App from 'next/app';
import Layout from '@/layouts';
import { ThemeProvider } from 'next-themes';
// import NextNprogress from 'nextjs-progressbar';
// import { MDXProvider } from '@next/mdx'
import 'normalize.css';
import '@icon-park/react/styles/index.css';
import '@/styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider forcedTheme={Component.theme || undefined} attribute='class'>
      <Layout pageTitle='Blog' description='My Personal Blog'>
        {/* <NextNprogress color='#03a9f4' startPosition={0.3} stopDelayMs={200} height={2} /> */}
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
