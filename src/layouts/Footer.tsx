export default function Footer() {
  return (
    <>
      <footer className='hero-foot footer'>
        <div className='container mx-auto'>
          <p className='foot-text'>
            Copyright&nbsp;©&nbsp;2021&nbsp;
            <a className='hover:text-gray-900' href='//www.ikmoons.com'>
              MoonCheung
            </a>
            .保留所有权利&nbsp;-&nbsp;
            <a className='hover:text-gray-900' href='//beian.miit.gov.cn' target='_blank'>
              赣ICP备20001301号
            </a>
          </p>
          <p className='foot-text'>
            Powered&nbsp;By&nbsp;
            <a className='hover:text-gray-900' href='https://zh.nuxtjs.org/' target='_blank'>
              Next.js
            </a>
            ，Designed&nbsp;By&nbsp;
            <a className='hover:text-gray-900' href='http://www.ikmoons.com'>
              MoonCheung
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
