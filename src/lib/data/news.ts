import { XMLParser } from 'fast-xml-parser';

// Google 뉴스 RSS (한국어) 카테고리별 헤드라인 조회 (API 키 불필요)

export type NewsCategory = 'it' | 'economy';

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  publishedAt: string; // ISO 문자열
}

const FEED_TOPIC: Record<NewsCategory, string> = {
  it: 'TECHNOLOGY',
  economy: 'BUSINESS',
};

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  source?: string | { '#text': string };
}

const parser = new XMLParser({ ignoreAttributes: true });

export async function getNews(category: NewsCategory, limit = 10): Promise<NewsItem[]> {
  const url = `https://news.google.com/rss/headlines/section/topic/${FEED_TOPIC[category]}?hl=ko&gl=KR&ceid=KR:ko`;
  const res = await fetch(url, { next: { revalidate: 900 } });
  if (!res.ok) throw new Error(`뉴스 조회 실패: ${res.status}`);

  const xml = parser.parse(await res.text());
  const raw: RssItem | RssItem[] | undefined = xml?.rss?.channel?.item;
  const items = raw ? (Array.isArray(raw) ? raw : [raw]) : [];

  return items.slice(0, limit).map((item) => {
    const source = typeof item.source === 'object' ? item.source['#text'] : (item.source ?? '');
    // 제목 끝의 " - 언론사" 표기 제거
    const title = source && item.title.endsWith(` - ${source}`)
      ? item.title.slice(0, -(source.length + 3))
      : item.title;
    return {
      title,
      link: item.link,
      source,
      publishedAt: new Date(item.pubDate).toISOString(),
    };
  });
}
