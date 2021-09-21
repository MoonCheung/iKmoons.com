import Link from 'next/link';
import Logo from '@/assets/svg/logo.svg';

export default function Header({ posts }) {
  return (
    <>
      <nav className='navbar hero-head'>
        <div className='container mx-auto flex flex-row justify-start items-center'>
          <div className='navbar-brand'>
            <h1 className='brand-name'>iKmoons - 个人博客会随时撰写技术文章以及个人生活，分享他人</h1>
            <Link href='/'>
              <a href='/'>
                <Logo className='brand-logo' />
              </a>
            </Link>
          </div>
          <div className='navbar-menu'>
            <div className='navbar-start'>
              {posts.map((item, index) => (
                <Link href={item.route} key={index}>
                  <a href={item.route} className='navbar-link'>
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          {/* <div className="navbar-search"></div> */}
        </div>
      </nav>
    </>
  );
}
