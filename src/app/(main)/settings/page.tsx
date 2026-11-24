import { connection } from 'next/server';
import { APP_NAME } from '@/constants/app';
import { APP_VERSION } from '@/constants/version';
import { readSettings } from '@/lib/settings';
import SettingsEditor from './SettingsEditor';

export const metadata = { title: '설정 | MineMine' };

export default async function SettingsPage() {
  await connection();
  const { widgets } = await readSettings();

  return (
    <>
      <h1 className="mb-1 text-2xl font-bold">설정</h1>
      <p className="mb-6 text-sm text-muted">메인 화면에 표시할 위젯을 고르고 크기와 순서를 정하세요.</p>

      <SettingsEditor initialWidgets={widgets} />

      <p className="mt-12 text-center text-xs text-muted">
        {APP_NAME} v{APP_VERSION}
      </p>
    </>
  );
}
