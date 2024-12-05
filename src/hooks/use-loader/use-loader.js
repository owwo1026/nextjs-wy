'use client';

import { atom, useAtom } from 'jotai';

const loaderAtom = atom({
  isLoading: false,
  count: 0,
});

export function useLoader() {
  const [state, setState] = useAtom(loaderAtom);

  const openLoader = () => {
    setState((prev) => {
      return {
        ...prev,
        isLoading: true,
        count: prev.count + 1,
      };
    });
  };

  const closeLoader = () => {
    setState((prev) => {
      const cnt = prev.count - 1;
      return {
        ...prev,
        isLoading: cnt > 0, // 當計數為0時才會關閉isLoading，避免有多個useEffect時第一個執行完成就把loading關閉
        count: cnt,
      };
    });
  };

  return {
    ...state,
    openLoader,
    closeLoader,
  };
}
