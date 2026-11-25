import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { readSettings, settingsSchema, writeSettings } from '@/lib/settings';

/** 현재 대시보드 설정 조회 */
export async function GET() {
  return NextResponse.json(await readSettings());
}

/** 대시보드 설정 저장 (위젯 2~10개, 중복 불가, 위젯별 지원 크기만 허용) */
export async function PUT(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: '요청 본문이 올바른 JSON이 아닙니다.' }, { status: 400 });
  }

  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((issue) => issue.message).join(' ') },
      { status: 400 },
    );
  }

  await writeSettings(parsed.data);
  revalidatePath('/');
  return NextResponse.json(parsed.data);
}
