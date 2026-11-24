import {useEffect, useRef} from "react";

export const useOutsideClick = () => {
  const handlersRef = useRef(new Map<HTMLElement, () => void>());
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const handlers = handlersRef.current;

      handlers.forEach((callback, element) => {
        if (!element.contains(e.target as Node)) {
          callback();
        }
      });
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (callback: () => void) => {
    return (element: HTMLElement | null) => {
      if (!element) return;

      handlersRef.current.set(element, callback);

      return () => {
        handlersRef.current.delete(element);
      };
    };
  };
};