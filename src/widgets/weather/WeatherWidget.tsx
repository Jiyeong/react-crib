import { getWeather } from '@/lib/data/weather';
import { WIDGET_META } from '@/widgets/meta';
import { WidgetCard, WidgetError } from '@/widgets/WidgetCard';
import type { WidgetSize } from '@/widgets/types';

const meta = WIDGET_META.weather;

export default async function WeatherWidget({ size }: { size: WidgetSize }) {
  const data = await getWeather().catch(() => null);
  if (!data) return <WidgetError size={size} title={meta.name} icon={meta.icon} />;

  const observed = `${Number(data.observedAt.slice(11, 13))}시 기준`;

  const summary = (
    <div className={`flex flex-col ${size === 'small' ? 'h-full justify-between' : 'gap-1'}`}>
      <div>
        <p className="text-sm font-semibold">{data.location}</p>
        <p className="text-4xl font-light leading-tight tabular-nums">{data.temperature}°</p>
      </div>
      <div className="text-xs">
        <p className="font-medium">
          <span aria-hidden>{data.emoji}</span> {data.condition}
        </p>
        <p className="text-muted tabular-nums">
          최고 {data.high}° · 최저 {data.low}°
        </p>
      </div>
    </div>
  );

  if (size === 'small') {
    return (
      <WidgetCard size={size} title={meta.name} icon={meta.icon}>
        {summary}
      </WidgetCard>
    );
  }

  const details = [
    { label: '체감', value: `${data.apparentTemperature}°` },
    { label: '습도', value: `${data.humidity}%` },
    { label: '바람', value: `${data.windSpeed}m/s` },
  ];

  return (
    <WidgetCard size={size} title={meta.name} icon={meta.icon} footer={`Open-Meteo · ${observed}`}>
      <div className="flex h-full flex-col gap-3">
        <div className="flex gap-4">
          <div className="flex-1">{summary}</div>
          <dl className="flex flex-col justify-end gap-1 text-xs">
            {details.map((d) => (
              <div key={d.label} className="flex justify-between gap-3">
                <dt className="text-muted">{d.label}</dt>
                <dd className="font-medium tabular-nums">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {size === 'large' && (
          <ol className="mt-auto grid grid-cols-6 gap-1 border-t border-line pt-3 text-center text-xs">
            {data.hourly.map((h) => (
              <li key={h.time} className="flex flex-col items-center gap-1">
                <span className="text-muted">{h.time}</span>
                <span aria-hidden className="text-base">{h.emoji}</span>
                <span className="font-medium tabular-nums">{h.temperature}°</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </WidgetCard>
  );
}
