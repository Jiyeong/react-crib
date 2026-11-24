import type { ReactNode } from 'react';
import type { WidgetSize } from '@/widgets/types';

/** 그리드 칸 수: small=1×1, medium=2×1, large=2×2 (아이폰 위젯 비율) */
export const SIZE_CLASS: Record<WidgetSize, string> = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-2 row-span-1',
  large: 'col-span-2 row-span-2',
};

interface WidgetCardProps {
  size: WidgetSize;
  title: string;
  icon: string;
  children: ReactNode;
  footer?: ReactNode;
}

/** 모든 위젯이 공통으로 사용하는 카드 껍데기 */
export function WidgetCard({ size, title, icon, children, footer }: WidgetCardProps) {
  return (
    <section
      aria-label={title}
      className={`${SIZE_CLASS[size]} flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-line bg-card p-4 shadow-sm`}
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted">
        <span aria-hidden>{icon}</span>
        <span className="truncate">{title}</span>
      </div>
      <div className="mt-2 min-h-0 flex-1">{children}</div>
      {footer && <div className="mt-1 truncate text-[11px] text-muted">{footer}</div>}
    </section>
  );
}

/** 데이터 로딩 중 표시 */
export function WidgetSkeleton({ size, title, icon }: Omit<WidgetCardProps, 'children' | 'footer'>) {
  return (
    <WidgetCard size={size} title={title} icon={icon}>
      <div className="flex h-full flex-col gap-2" aria-busy="true">
        <div className="h-6 w-1/2 animate-pulse rounded-md bg-line" />
        <div className="h-4 w-3/4 animate-pulse rounded-md bg-line" />
        <div className="h-4 w-2/3 animate-pulse rounded-md bg-line" />
      </div>
    </WidgetCard>
  );
}

/** 외부 API 실패 시 표시 (해당 위젯만 실패하고 나머지는 정상 표시) */
export function WidgetError({ size, title, icon }: Omit<WidgetCardProps, 'children' | 'footer'>) {
  return (
    <WidgetCard size={size} title={title} icon={icon}>
      <div className="flex h-full flex-col items-center justify-center gap-1 text-center text-sm text-muted">
        <span aria-hidden className="text-xl">⚠️</span>
        데이터를 불러오지 못했습니다.
      </div>
    </WidgetCard>
  );
}
