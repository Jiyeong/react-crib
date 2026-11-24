import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
