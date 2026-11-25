import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { THEME_STORAGE_KEY } from "@/constants/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MineMine",
  description: "개인적으로 필요한 정보를 한눈에 모아보는 나만의 대시보드",
  icons: {
    icon: "/icons/music.svg",
  },
/*  openGraph: {
    images: [
      {
        url: '/opengraph-image.png',
        alt: '이미지 설명',
      },
    ],
  },
  twitter: {
    images: [
      {
        url: '/twitter-image.png',
        alt: '이미지 설명',
      },
    ],
  },*/
};

const THEME_INIT_SCRIPT = `(function(){var t;try{t=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 첫 페인트 전에 테마를 적용해 깜빡임을 막는다 (저장값 → OS 설정 순) */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
