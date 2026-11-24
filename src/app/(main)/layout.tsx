import type { ReactNode } from 'react';
import AppHeader from '@/app/components/AppHeader';
import Footer from '@/app/components/Footer';

/** MineMine 서비스 공통 레이아웃 (홈, 설정) */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    // 콘텐츠가 짧아도 Footer가 화면 최하단에 위치하도록 main이 남은 높이를 채운다 (sticky footer)
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
}
