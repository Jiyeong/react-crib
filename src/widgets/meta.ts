import type { WidgetId, WidgetMeta } from '@/widgets/types';

/**
 * 위젯 메타 정보 레지스트리.
 * 새 위젯 추가 시: types.ts의 WIDGET_IDS → 여기 메타 → components.tsx 렌더러 순서로 등록한다.
 */
export const WIDGET_META: Record<WidgetId, WidgetMeta> = {
  weather: {
    id: 'weather',
    name: '오늘의 날씨',
    description: '서울의 현재 기온, 체감 온도, 시간별 예보를 보여줍니다.',
    category: '생활',
    icon: '🌤️',
    defaultSize: 'medium',
    sizes: ['small', 'medium', 'large'],
  },
  exchange: {
    id: 'exchange',
    name: '오늘의 환율',
    description: '미국 달러(USD)와 일본 엔화(JPY 100엔)의 원화 환율과 전일 대비 변동을 보여줍니다.',
    category: '경제',
    icon: '💱',
    defaultSize: 'small',
    sizes: ['small', 'medium'],
  },
  'it-news': {
    id: 'it-news',
    name: 'IT 뉴스',
    description: '국내 IT·기술 분야 주요 뉴스 헤드라인을 보여줍니다.',
    category: '뉴스',
    icon: '💻',
    defaultSize: 'medium',
    sizes: ['medium', 'large'],
  },
  'economy-news': {
    id: 'economy-news',
    name: '경제 뉴스',
    description: '국내 경제·비즈니스 분야 주요 뉴스 헤드라인을 보여줍니다.',
    category: '뉴스',
    icon: '📈',
    defaultSize: 'medium',
    sizes: ['medium', 'large'],
  },
  calendar: {
    id: 'calendar',
    name: '이번 달 달력',
    description: '오늘 날짜를 강조한 이번 달 월간 달력을 보여줍니다.',
    category: '생활',
    icon: '📅',
    defaultSize: 'large',
    // 월간 달력(최대 6주)은 2×1 칸에 담기 어려워 medium은 지원하지 않는다
    sizes: ['small', 'large'],
  },
};

export const WIDGET_LIST: WidgetMeta[] = Object.values(WIDGET_META);
