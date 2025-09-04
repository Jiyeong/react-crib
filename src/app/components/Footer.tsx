import Image from 'next/image';

export default function Footer () {
  return (
      <footer id="footer">
        <div className="footerWrap">
          <div className="left"></div>
          <div className="center">
            Copyright 2025 Joel Kim. All rights reserved.
          </div>
          <div className="right">
            <a
              href="https://github.com/Jiyeong"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:opacity-80 transition-opacity"
              aria-label="GitHub 프로필"
            >
              <Image
                src="/icons/github.svg"
                alt="GitHub"
                width={24}
                height={24}
                className="text-gray-600 hover:text-gray-900"
              />
            </a>

          </div>
        </div>
      </footer>
      /*
      * © [연도] [저작권자 이름]. All rights reserved.

      * */
  )
}