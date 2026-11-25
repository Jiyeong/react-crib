'use client'
import { useSyncExternalStore } from 'react';
import { THEME_STORAGE_KEY } from '@/constants/app';

type Theme = 'light' | 'dark';

// <html data-theme> 속성 변경을 구독한다 (초기값은 layout.tsx의 인라인 스크립트가 설정)
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
// 서버 렌더링 시에는 테마를 알 수 없으므로 null (아이콘을 그리지 않음)
const getServerSnapshot = () => null;

/** 헤더의 라이트/다크 모드 전환 버튼 */
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === 'dark' ? 'light' : 'dark';
  const label = next === 'dark' ? '다크 모드로 전환' : '라이트 모드로 전환';

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // 저장소를 사용할 수 없는 환경(시크릿 모드 등)에서는 현재 화면에만 적용
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-line hover:text-foreground"
    >
      {theme === 'dark' ? <SunIcon /> : theme === 'light' ? <MoonIcon /> : null}
    </button>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
