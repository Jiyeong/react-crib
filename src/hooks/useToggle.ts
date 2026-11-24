import {useCallback, useState} from "react";
/*
* 사용법
* const [isModalOpen, toggleModal, openModal, closeModal] = useToggle(false);
*
* 사용 예
* 로딩 상태
* const [isLoading, toggleLoading, startLoading, stopLoading] = useToggle(false);
* 다크 모드
* const [isDarkMode, toggleDarkMode] = useToggle(false);
* 사이드바
* const [isSidebarOpen, toggleSidebar, startSidebar, stopSidebar] = useToggle(false);
* */
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse] as const
}

