import Layout from '../layouts'
export default function App({ Component, pageProps }) {
  return (
    <Layout pageTitle="Blog" description="My Personal Blog">
      <Component {...pageProps} />
    </Layout>
  )
}