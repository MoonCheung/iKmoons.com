import Link from 'next/link';

export default function Header({ posts }) {
  return (
    <>
      <nav className='navbar hero-head'>
        <div className='container mx-auto flex flex-row justify-start items-center'>
          <div className='navbar-brand'>
            <Link href='/'>
              <h1 className='logo'>iKmoons - 个人博客会随时撰写技术文章以及个人生活，分享他人</h1>
            </Link>
          </div>
          <div className='navbar-menu'>
            <div className='navbar-start'>
              {posts.map((item, index) => (
                <Link href={item.route} key={index}>
                  <a className='navbar-link'>{item.name}</a>
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
