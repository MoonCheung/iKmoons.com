import App from 'next/app'
import Layout from '../layouts'
import normalize from 'normalize.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout pageTitle="Blog" description="My Personal Blog">
      <Component {...pageProps} />
    </Layout>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return {...appProps}
}

export default MyApp