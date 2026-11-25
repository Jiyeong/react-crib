import { WIDGET_META } from '@/widgets/meta';
import { WidgetCard } from '@/widgets/WidgetCard';
import type { WidgetSize } from '@/widgets/types';

const meta = WIDGET_META.calendar;
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

/** 서버 시간대(UTC 등)와 관계없이 한국 기준 오늘 날짜를 구한다. */
function getSeoulToday() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get('year'), month: get('month'), day: get('day') };
}

/** 해당 월의 날짜 칸 배열 (1일 앞 빈칸은 null, 주 단위로 끊어진다) */
function buildMonthWeeks(year: number, month: number): (number | null)[][] {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/** 요일별 글자색: 일요일 빨강, 토요일 파랑 */
const weekdayColor = (index: number) => (index === 0 ? 'text-up' : index === 6 ? 'text-down' : '');

interface MonthTableProps {
  year: number;
  month: number;
  day: number;
  /** '소' 크기용 축소 스타일 (1×1 칸에 최대 6주가 모두 들어가도록 글자·강조 원을 줄인다) */
  compact: boolean;
}

function MonthTable({ year, month, day, compact }: MonthTableProps) {
  const weeks = buildMonthWeeks(year, month);
  return (
    <table
      className={`h-full w-full table-fixed border-collapse text-center tabular-nums ${
        compact ? 'text-[10px] leading-none' : 'text-sm'
      }`}
    >
      <caption className="sr-only">
        {year}년 {month}월 달력, 오늘은 {day}일
      </caption>
      <thead>
        <tr>
          {WEEKDAYS.map((label, i) => (
            <th
              key={label}
              scope="col"
              className={`font-medium ${compact ? 'pb-0.5' : 'pb-1 text-xs'} ${weekdayColor(i) || 'text-muted'}`}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, w) => (
          <tr key={w}>
            {week.map((date, i) => (
              <td key={i} className="p-0">
                {date && (
                  <span
                    aria-current={date === day ? 'date' : undefined}
                    className={`mx-auto flex items-center justify-center rounded-full ${
                      compact ? 'size-[15px]' : 'size-7'
                    } ${date === day ? 'bg-accent font-semibold text-white' : weekdayColor(i)}`}
                  >
                    {date}
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** 월간 달력 위젯 (외부 API 없이 날짜 계산만 사용) */
export default function CalendarWidget({ size }: { size: WidgetSize }) {
  const { year, month, day } = getSeoulToday();

  // '소'는 본문 공간이 좁아 연월 제목을 카드 제목으로 대신한다
  if (size === 'small') {
    return (
      <WidgetCard size={size} title={`${month}월`} icon={meta.icon}>
        <MonthTable year={year} month={month} day={day} compact />
      </WidgetCard>
    );
  }

  return (
    <WidgetCard size={size} title={meta.name} icon={meta.icon}>
      <div className="flex h-full flex-col">
        <p className="mb-2 text-lg font-bold">
          {year}년 {month}월
        </p>
        <div className="min-h-0 flex-1">
          <MonthTable year={year} month={month} day={day} compact={false} />
        </div>
      </div>
    </WidgetCard>
  );
}
