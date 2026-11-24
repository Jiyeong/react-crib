import type { KeyboardEvent } from "react";

type KeyHandler = (event: KeyboardEvent) => void;
type KeyHandlers = Partial<Record<string, KeyHandler>>;
interface KeyPressOptions {
  preventDefault?: boolean | string[];
  caseSensitive?: boolean;
}

// 기본 키 매핑
const keyMap: Record<string, string> = {
  'Enter': 'onEnter',
  'Escape': 'onEscape',
  ' ': 'onSpace',
  'ArrowLeft': 'onArrowLeft',
  'ArrowRight': 'onArrowRight',
  'ArrowUp': 'onArrowUp',
  'ArrowDown': 'onArrowDown',
  'Tab': 'onTab'
/*  'Backspace': 'onBackspace',
  'Delete': 'onDelete',
  'Home': 'onHome',*/
};

export const keyPress = (handlers: KeyHandlers, options: KeyPressOptions = {}) => {
  const { preventDefault = false, caseSensitive = false } = options;
  return (event: KeyboardEvent) => {
    const { key } = event;
    let handler: KeyHandler | undefined;

    if (keyMap[key]) {
      handler = handlers[keyMap[key]];
    } else {
      // 커스텀 키 처리
      const normalizedKey = caseSensitive ? key : key.toLowerCase();
      handler = handlers[normalizedKey];
    }
    if (handler) {
      const shouldPreventDefault = preventDefault === true || (Array.isArray(preventDefault) && preventDefault.includes(key));

      if (shouldPreventDefault) {
        event.preventDefault();
      }
      handler(event);
    }
  }
}
