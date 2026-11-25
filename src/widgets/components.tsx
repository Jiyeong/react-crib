import { Suspense } from 'react';
import { WIDGET_META } from '@/widgets/meta';
import { WidgetSkeleton } from '@/widgets/WidgetCard';
import type { WidgetId, WidgetSetting, WidgetSize } from '@/widgets/types';
import WeatherWidget from '@/widgets/weather/WeatherWidget';
import ExchangeWidget from '@/widgets/exchange/ExchangeWidget';
import NewsWidget from '@/widgets/news/NewsWidget';
import CalendarWidget from '@/widgets/calendar/CalendarWidget';

/** 위젯 id → 렌더링 컴포넌트 (서버 컴포넌트 전용) */
const RENDERERS: Record<WidgetId, (props: { size: WidgetSize }) => React.ReactNode> = {
  weather: ({ size }) => <WeatherWidget size={size} />,
  exchange: ({ size }) => <ExchangeWidget size={size} />,
  'it-news': ({ size }) => <NewsWidget category="it" size={size} />,
  'economy-news': ({ size }) => <NewsWidget category="economy" size={size} />,
  calendar: ({ size }) => <CalendarWidget size={size} />,
};

/** 위젯 하나를 로딩 스켈레톤과 함께 렌더링한다. 각 위젯은 독립적으로 로딩된다. */
export function Widget({ setting }: { setting: WidgetSetting }) {
  const meta = WIDGET_META[setting.id];
  const Renderer = RENDERERS[setting.id];
  return (
    <Suspense fallback={<WidgetSkeleton size={setting.size} title={meta.name} icon={meta.icon} />}>
      <Renderer size={setting.size} />
    </Suspense>
  );
}
