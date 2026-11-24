'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { WIDGET_LIST, WIDGET_META } from '@/widgets/meta';
import {
  MAX_WIDGETS,
  MIN_WIDGETS,
  SIZE_LABEL,
  type WidgetId,
  type WidgetSetting,
  type WidgetSize,
} from '@/widgets/types';

interface SortableRowProps {
  setting: WidgetSetting;
  index: number;
  onSizeChange: (id: WidgetId, size: WidgetSize) => void;
  onRemove: (id: WidgetId) => void;
}

/** 선택된 위젯 한 줄 (드래그 정렬 + 크기 선택 + 제거) */
function SortableRow({ setting, index, onSizeChange, onRemove }: SortableRowProps) {
  const meta = WIDGET_META[setting.id];
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: setting.id });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 rounded-2xl border border-line bg-card p-3 ${
        isDragging ? 'relative z-10 shadow-lg' : ''
      }`}
    >
      <button
        ref={setActivatorNodeRef}
        type="button"
        aria-label={`${meta.name} 순서 변경 (현재 ${index + 1}번째)`}
        className="cursor-grab touch-none rounded-md px-1 py-2 text-muted hover:text-foreground active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>
      <span aria-hidden className="text-xl">{meta.icon}</span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium">{meta.name}</span>

      <div role="radiogroup" aria-label={`${meta.name} 크기`} className="flex rounded-full bg-background p-0.5">
        {meta.sizes.map((size) => (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={setting.size === size}
            onClick={() => onSizeChange(setting.id, size)}
            className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
              setting.size === size ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
            }`}
          >
            {SIZE_LABEL[size]}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onRemove(setting.id)}
        aria-label={`${meta.name} 제거`}
        className="rounded-full px-2 py-1 text-muted hover:text-up"
      >
        ✕
      </button>
    </li>
  );
}

export default function SettingsEditor({ initialWidgets }: { initialWidgets: WidgetSetting[] }) {
  const router = useRouter();
  const [widgets, setWidgets] = useState<WidgetSetting[]>(initialWidgets);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const count = widgets.length;
  const isFull = count >= MAX_WIDGETS;
  const isValid = count >= MIN_WIDGETS && count <= MAX_WIDGETS;
  const selectedIds = new Set(widgets.map((w) => w.id));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    setWidgets((prev) => {
      const from = prev.findIndex((w) => w.id === active.id);
      const to = prev.findIndex((w) => w.id === over.id);
      return arrayMove(prev, from, to);
    });
  };

  const addWidget = (id: WidgetId) => {
    if (isFull || selectedIds.has(id)) return;
    setWidgets((prev) => [...prev, { id, size: WIDGET_META[id].defaultSize }]);
  };

  const removeWidget = (id: WidgetId) => setWidgets((prev) => prev.filter((w) => w.id !== id));

  const changeSize = (id: WidgetId, size: WidgetSize) =>
    setWidgets((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)));

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ widgets }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? '저장에 실패했습니다.');
      }
      router.push('/');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : '저장에 실패했습니다.');
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 선택된 위젯: 순서/크기 */}
      <section aria-labelledby="selected-title">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 id="selected-title" className="font-semibold">메인에 표시할 위젯</h2>
          <span className={`text-sm tabular-nums ${isValid ? 'text-muted' : 'text-up'}`}>
            {count} / {MAX_WIDGETS}
          </span>
        </div>
        <p className="mb-3 text-xs text-muted">
          ⠿ 를 끌어서 순서를 바꿀 수 있습니다. 최소 {MIN_WIDGETS}개, 최대 {MAX_WIDGETS}개까지 선택할 수 있습니다.
        </p>

        {count === 0 ? (
          <p className="rounded-2xl border border-dashed border-line p-6 text-center text-sm text-muted">
            아래 목록에서 위젯을 추가하세요.
          </p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={widgets.map((w) => w.id)} strategy={verticalListSortingStrategy}>
              <ol className="flex flex-col gap-2">
                {widgets.map((setting, index) => (
                  <SortableRow
                    key={setting.id}
                    setting={setting}
                    index={index}
                    onSizeChange={changeSize}
                    onRemove={removeWidget}
                  />
                ))}
              </ol>
            </SortableContext>
          </DndContext>
        )}
      </section>

      {/* 전체 위젯 목록 */}
      <section aria-labelledby="catalog-title">
        <h2 id="catalog-title" className="mb-3 font-semibold">전체 위젯</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {WIDGET_LIST.map((meta) => {
            const selected = selectedIds.has(meta.id);
            return (
              <li key={meta.id} className="flex items-start gap-3 rounded-2xl border border-line bg-card p-4">
                <span aria-hidden className="text-2xl">{meta.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">
                    {meta.name}
                    <span className="ml-2 rounded-full bg-background px-2 py-0.5 text-[11px] font-normal text-muted">
                      {meta.category}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-muted">{meta.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => (selected ? removeWidget(meta.id) : addWidget(meta.id))}
                  disabled={!selected && isFull}
                  aria-pressed={selected}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    selected ? 'bg-background text-muted' : 'bg-accent text-white'
                  }`}
                >
                  {selected ? '제거' : '추가'}
                </button>
              </li>
            );
          })}
        </ul>
        {isFull && <p className="mt-2 text-xs text-muted">최대 {MAX_WIDGETS}개까지 선택했습니다.</p>}
      </section>

      {/* 저장 */}
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
        {!isValid && (
          <p className="text-sm text-up" role="status">
            위젯을 최소 {MIN_WIDGETS}개 선택해야 저장할 수 있습니다.
          </p>
        )}
        {error && (
          <p className="text-sm text-up" role="alert">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={save}
          disabled={!isValid || saving}
          className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? '저장 중…' : '저장'}
        </button>
      </div>
    </div>
  );
}
