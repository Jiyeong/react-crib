'use client'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_NAME } from '@/constants/app';
import ThemeToggle from '@/app/components/ThemeToggle';

const NAV = [
  { href: '/', label: '홈', icon: '/icons/home.png' },
  { href: '/settings', label: '설정', icon: '/icons/setting.png' },
];

/** MineMine 상단 헤더 (로고 + 홈/설정 메뉴) */
export default function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="border-b border-line backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          {APP_NAME}
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className="flex gap-1">
            <li>
              <ThemeToggle />
            </li>
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    title={item.label}
                    aria-current={active ? 'page' : undefined}
                    className={`group inline-flex size-9 items-center justify-center rounded-full transition-colors ${
                      active ? 'bg-foreground' : 'hover:bg-line'
                    }`}
                  >
                    {/* 아이콘이 검정 단색이므로 배경에 맞춰 invert 필터로 색을 반전한다 */}
                    <Image
                      src={item.icon}
                      alt=""
                      width={20}
                      height={20}
                      className={
                        active
                          ? 'invert dark:invert-0'
                          : 'opacity-50 transition-opacity group-hover:opacity-100 dark:invert'
                      }
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
