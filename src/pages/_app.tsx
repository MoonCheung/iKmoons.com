import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
// import NextNprogress from 'nextjs-progressbar';
// import { MDXProvider } from '@next/mdx'
import { constant } from '@/config/app.config';
import 'normalize.css';
import '@icon-park/react/styles/index.css';
import '@/styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider forcedTheme={Component.theme || undefined} attribute='class'>
      {/* <NextNprogress color='#03a9f4' startPosition={0.3} stopDelayMs={200} height={2} /> */}
      <DefaultSeo
        title={`${constant.meta.title} - ${constant.meta.desc.split('-')[0]}`}
        titleTemplate={`%s | ${constant.meta.site}`}
        additionalMetaTags={[
          { name: 'viewport', content: 'width=device-width, initial-scale=1,user-scalable=no' },
          { name: 'MobileOptimized', content: '320' },
          { name: 'HandheldFriendly', content: 'true' },
          {
            name: 'apple-mobile-web-app-title',
            content: `${constant.meta.title} | ${constant.meta.desc}`
          },
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          { name: 'apple-mobile-web-app-status-bar-style', content: 'white' },
          { name: 'author', content: constant.meta.email },
          { name: 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
          { name: 'keywords', content: constant.meta.keys },
          { name: 'description', content: constant.meta.desc }
        ]}
        additionalLinkTags={[
          { rel: 'dns-prefetch', href: '//api.ikmoons.com' },
          { rel: 'dns-prefetch', href: '//cdn.ikmoons.com' },
          { rel: 'dns-prefetch', href: '//static.ikmoons.com' },
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel: 'canonical', href: '//ikmoons.com' }
        ]}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps };
// };

export default MyApp;
