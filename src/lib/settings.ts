import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { WIDGET_META } from '@/widgets/meta';
import {
  MAX_WIDGETS,
  MIN_WIDGETS,
  WIDGET_IDS,
  WIDGET_SIZES,
  type DashboardSettings,
} from '@/widgets/types';

// 사용자 설정은 서비스 내 JSON 파일에 저장한다. (로그인 기능 도입 시 DB로 전환 예정)
const SETTINGS_PATH = path.join(process.cwd(), 'data', 'settings.json');

export const DEFAULT_SETTINGS: DashboardSettings = {
  widgets: [
    { id: 'weather', size: 'medium' },
    { id: 'exchange', size: 'small' },
    { id: 'it-news', size: 'medium' },
  ],
};

export const settingsSchema = z
  .object({
    widgets: z
      .array(
        z.object({
          id: z.enum(WIDGET_IDS, { errorMap: () => ({ message: '등록되지 않은 위젯입니다.' }) }),
          size: z.enum(WIDGET_SIZES, { errorMap: () => ({ message: '올바르지 않은 위젯 크기입니다.' }) }),
        }),
      )
      .min(MIN_WIDGETS, `위젯은 최소 ${MIN_WIDGETS}개 선택해야 합니다.`)
      .max(MAX_WIDGETS, `위젯은 최대 ${MAX_WIDGETS}개까지 선택할 수 있습니다.`),
  })
  .superRefine(({ widgets }, ctx) => {
    const seen = new Set<string>();
    widgets.forEach((widget, index) => {
      if (seen.has(widget.id)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['widgets', index, 'id'], message: `중복된 위젯입니다: ${widget.id}` });
      }
      seen.add(widget.id);
      if (!WIDGET_META[widget.id].sizes.includes(widget.size)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['widgets', index, 'size'],
          message: `${WIDGET_META[widget.id].name} 위젯은 '${widget.size}' 크기를 지원하지 않습니다.`,
        });
      }
    });
  });

/** 설정 파일을 읽는다. 파일이 없거나 내용이 잘못된 경우 기본값을 반환한다. */
export async function readSettings(): Promise<DashboardSettings> {
  try {
    const raw = await fs.readFile(SETTINGS_PATH, 'utf-8');
    const parsed = settingsSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** 검증된 설정을 파일에 저장한다. */
export async function writeSettings(settings: DashboardSettings): Promise<void> {
  await fs.mkdir(path.dirname(SETTINGS_PATH), { recursive: true });
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(settings, null, 2) + '\n', 'utf-8');
}
