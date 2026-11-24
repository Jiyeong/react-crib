import { getNews, type NewsCategory } from '@/lib/data/news';
import { WIDGET_META } from '@/widgets/meta';
import { WidgetCard, WidgetError } from '@/widgets/WidgetCard';
import type { WidgetSize } from '@/widgets/types';

const META_BY_CATEGORY = {
  it: WIDGET_META['it-news'],
  economy: WIDGET_META['economy-news'],
} as const;

/** 크기별 표시 기사 수 */
const COUNT: Record<WidgetSize, number> = { small: 1, medium: 2, large: 6 };

function formatRelative(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return '방금';
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

export default async function NewsWidget({ category, size }: { category: NewsCategory; size: WidgetSize }) {
  const meta = META_BY_CATEGORY[category];
  const items = await getNews(category, COUNT[size]).catch(() => null);
  if (!items || items.length === 0) return <WidgetError size={size} title={meta.name} icon={meta.icon} />;

  return (
    <WidgetCard size={size} title={meta.name} icon={meta.icon} footer="Google 뉴스">
      <ul className="flex h-full flex-col justify-between divide-y divide-line overflow-hidden">
        {items.map((item) => (
          <li key={item.link} className="min-w-0 py-1 first:pt-0 last:pb-0">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-sm hover:opacity-70 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <p className="truncate text-sm font-medium">{item.title}</p>
              <p className="truncate text-[11px] text-muted">
                {item.source} · {formatRelative(item.publishedAt)}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
