import { getExchangeRates, type RateInfo } from '@/lib/data/exchange';
import { WIDGET_META } from '@/widgets/meta';
import { WidgetCard, WidgetError } from '@/widgets/WidgetCard';
import type { WidgetSize } from '@/widgets/types';

const meta = WIDGET_META.exchange;

const krw = new Intl.NumberFormat('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** 상승=빨강 ▲, 하락=파랑 ▼ (국내 금융 표기 관례) */
function Change({ info, showPercent }: { info: RateInfo; showPercent: boolean }) {
  if (info.change === 0) return <span className="text-muted">-</span>;
  const up = info.change > 0;
  return (
    <span className={`tabular-nums ${up ? 'text-up' : 'text-down'}`}>
      {up ? '▲' : '▼'}
      {krw.format(Math.abs(info.change))}
      {showPercent && ` (${up ? '+' : ''}${info.changePercent}%)`}
    </span>
  );
}

export default async function ExchangeWidget({ size }: { size: WidgetSize }) {
  const data = await getExchangeRates().catch(() => null);
  if (!data) return <WidgetError size={size} title={meta.name} icon={meta.icon} />;

  const rows = [
    { symbol: '$', label: 'USD', unit: '1달러', info: data.usd },
    { symbol: '¥', label: 'JPY', unit: '100엔', info: data.jpy100 },
  ];
  const isSmall = size === 'small';
  const date = `${Number(data.date.slice(5, 7))}.${Number(data.date.slice(8, 10))}`;

  return (
    <WidgetCard size={size} title={meta.name} icon={meta.icon} footer={`${date} 기준${isSmall ? '' : ' · 유럽중앙은행 기준환율'}`}>
      <ul className="flex h-full flex-col justify-around gap-1">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold">
                <span aria-hidden className="mr-1 inline-flex size-4 items-center justify-center rounded-full bg-foreground text-[10px] text-background">
                  {row.symbol}
                </span>
                {row.label}
                {!isSmall && <span className="ml-1 font-normal text-muted">{row.unit}</span>}
              </p>
              {isSmall && (
                <p className="text-[11px]">
                  <Change info={row.info} showPercent={false} />
                </p>
              )}
            </div>
            <div className="text-right">
              <p className={`${isSmall ? 'text-base' : 'text-xl'} font-semibold tabular-nums`}>
                {krw.format(row.info.rate)}
              </p>
              {!isSmall && (
                <p className="text-xs">
                  <Change info={row.info} showPercent />
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
