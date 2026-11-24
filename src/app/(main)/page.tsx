import Link from 'next/link';
import { connection } from 'next/server';
import { readSettings } from '@/lib/settings';
import { Widget } from '@/widgets/components';

export default async function Home() {
  // 요청마다 설정 파일을 읽도록 동적 렌더링 (외부 API 응답은 fetch 캐시로 재사용)
  await connection();
  const { widgets } = await readSettings();

  const today = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  }).format(new Date());

  return (
    <>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-sm text-muted">{today}</p>
          <h1 className="text-2xl font-bold">오늘의 MineMine</h1>
        </div>
        <Link
          href="/settings"
          className="rounded-full bg-card px-3 py-1.5 text-sm font-medium shadow-sm border border-line hover:opacity-80"
        >
          위젯 편집
        </Link>
      </div>

      <div className="grid grid-flow-row-dense auto-rows-[170px] grid-cols-2 gap-3 sm:grid-cols-4">
        {widgets.map((setting) => (
          <Widget key={setting.id} setting={setting} />
        ))}
      </div>
    </>
  );
}
