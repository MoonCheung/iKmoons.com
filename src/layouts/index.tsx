import DocHead from './Head';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from 'next-themes';
import { constant, partConfig } from '@/config/app.config';
import ParticlesContainer from '@/components/particles/index';
import { Up, Down, SunOne, Moon } from '@icon-park/react';

export default function Layout({ children, pageTitle, description }) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <DocHead pageTitle={pageTitle} description={description} />
      <main className='hero'>
        <Header posts={constant.menus} />
        <div className='hero-body'>{children}</div>
        <div className='affix'>
          {theme === 'light' ? (
            <button className='button' onClick={() => setTheme('dark')}>
              <SunOne theme='outline' size='24' strokeWidth={3} />
            </button>
          ) : (
            <button className='button' onClick={() => setTheme('light')}>
              <Moon theme='outline' size='20' strokeWidth={3} />
            </button>
          )}
          <button className='button'>
            <Up theme='outline' size='24' strokeWidth={3} />
          </button>
          <button className='button'>
            <Down theme='outline' size='24' strokeWidth={3} />
          </button>
        </div>
        <Footer />
        <ParticlesContainer options={partConfig} />
      </main>
    </>
  );
}
