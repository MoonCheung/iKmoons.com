import DocHead from './Head';
import Header from './Header';
import Footer from './Footer';
import ParticlesContainer from '@/components/particles/index';
import { constant, partConfig } from '@/config/app.config';

export default function Layout({ children, pageTitle, description }) {
  return (
    <>
      <DocHead pageTitle={pageTitle} description={description} />
      <main className='hero'>
        <Header posts={constant.menus} />
        <div className='hero-body'>{children}</div>
        <Footer />
        <ParticlesContainer options={partConfig} />
      </main>
    </>
  );
}
