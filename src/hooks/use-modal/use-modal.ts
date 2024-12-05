'use client';

import { atom, useAtom } from 'jotai';
import React from 'react';

type ModalView = {
  view: React.ReactNode;
  customSize?: string;
  maskCloseable?: boolean;
};

type ModalTypes = {
  viewStack: ModalView[];
  isOpen: boolean;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  viewStack: [],
});

export function useModal() {
  const [state, setState] = useAtom(modalAtom);

  const openModal = ({
    view,
    customSize,
    maskCloseable,
  }: {
    view: React.ReactNode;
    customSize?: string;
    maskCloseable?: boolean;
  }) => {
    setState((pre) => ({
      ...pre,
      isOpen: true,
      viewStack: [...pre.viewStack, { view, customSize, maskCloseable }],
    }));
  };

  const closeModal = (count: number = 1) => {
    setState((prevState) => {
      const cnt = typeof count === 'number' ? count : 1;
      const newViewStack = prevState.viewStack.slice(0, -cnt);
      const isOpen = newViewStack.length > 0;
      return {
        ...prevState,
        viewStack: newViewStack,
        isOpen,
      };
    });
  };

  const closeAllModals = () => {
    setState((pre) => ({
      ...pre,
      viewStack: [],
      isOpen: false,
    }));
  };

  return {
    ...state,
    openModal,
    closeModal,
    closeAllModals,
  };
}
