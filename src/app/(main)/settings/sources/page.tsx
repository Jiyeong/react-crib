import Link from 'next/link';
import { DATA_SOURCES, MCP_SOURCES, type DataSource } from '@/constants/sources';

export const metadata = { title: '데이터 출처 | MineMine' };

/** 서비스가 사용하는 외부 API·MCP 출처 안내 (설정 화면 하단 링크로 진입) */
export default function SourcesPage() {
  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-bold">데이터 출처</h1>
          <p className="text-sm text-muted">MineMine 위젯이 정보를 가져오는 곳입니다.</p>
        </div>
        <Link
          href="/settings"
          aria-label="닫기"
          title="닫기"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-card text-lg text-muted hover:text-foreground"
        >
          ✕
        </Link>
      </div>

      <h2 className="mb-2 text-sm font-semibold text-muted">API · 데이터</h2>
      <ul className="flex flex-col gap-3">
        {DATA_SOURCES.map((source) => (
          <SourceCard key={source.name} source={source} />
        ))}
      </ul>

      <h2 className="mb-2 mt-8 text-sm font-semibold text-muted">MCP</h2>
      {MCP_SOURCES.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {MCP_SOURCES.map((source) => (
            <SourceCard key={source.name} source={source} />
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-line bg-card p-4 text-sm text-muted">
          현재 사용 중인 MCP 서버가 없습니다.
        </p>
      )}
    </>
  );
}

function SourceCard({ source }: { source: DataSource }) {
  return (
    <li className="rounded-2xl border border-line bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">
          {source.name}
          <span className="ml-2 rounded-full bg-line px-2 py-0.5 align-middle text-[11px] font-medium text-muted">
            {source.type}
          </span>
        </p>
        {source.url && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs text-accent hover:underline"
          >
            사이트 ↗
          </a>
        )}
      </div>
      <p className="mt-1 text-sm">{source.description}</p>
      <p className="mt-2 text-xs text-muted">
        사용 위젯: {source.widgets.join(', ')}
        {source.note && <> · {source.note}</>}
      </p>
    </li>
  );
}
