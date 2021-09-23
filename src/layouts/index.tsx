import DocHead from './Head';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { scrollToTop, toBottom } from '@/utils/index';
import { constant, partConfig } from '@/config/app.config';
import ParticlesContainer from '@/components/particles/index';
import { Up, Down, SunOne, Moon } from '@icon-park/react';

export default function Layout({ children, title, description }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 安装在客户端上时，现在我们可以显示 UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <DocHead title={title} description={description} />
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
          <button className='button' onClick={scrollToTop}>
            <Up theme='outline' size='24' strokeWidth={3} />
          </button>
          <button className='button' onClick={toBottom}>
            <Down theme='outline' size='24' strokeWidth={3} />
          </button>
        </div>
        <Footer />
        <ParticlesContainer options={partConfig} />
      </main>
    </>
  );
}
