// 위젯 공통 타입 정의 (서버/클라이언트 모두에서 사용 가능)

export const WIDGET_SIZES = ['small', 'medium', 'large'] as const;
export type WidgetSize = (typeof WIDGET_SIZES)[number];

export const WIDGET_IDS = ['weather', 'exchange', 'it-news', 'economy-news', 'calendar'] as const;
export type WidgetId = (typeof WIDGET_IDS)[number];

/** 메인 화면에 표시할 위젯 최소/최대 개수 */
export const MIN_WIDGETS = 2;
export const MAX_WIDGETS = 10;

/** 사용자가 선택한 위젯 하나의 설정 (배열 순서 = 화면 표시 순서) */
export interface WidgetSetting {
  id: WidgetId;
  size: WidgetSize;
}

export interface DashboardSettings {
  widgets: WidgetSetting[];
}

/** 위젯 목록(설정 화면)에 표시되는 메타 정보 */
export interface WidgetMeta {
  id: WidgetId;
  name: string;
  description: string;
  category: string;
  icon: string;
  defaultSize: WidgetSize;
  /** 이 위젯이 지원하는 크기 */
  sizes: readonly WidgetSize[];
}

export const SIZE_LABEL: Record<WidgetSize, string> = {
  small: '소',
  medium: '중',
  large: '대',
};
