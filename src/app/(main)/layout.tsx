import type { ReactNode } from 'react';
import AppHeader from '@/app/components/AppHeader';
import Footer from '@/app/components/Footer';

/** MineMine 서비스 공통 레이아웃 (홈, 설정) */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-6">{children}</main>
      <Footer />
    </>
  );
}
