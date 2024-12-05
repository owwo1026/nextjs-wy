'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Modal, Box } from '@mui/material';

import { useModal } from '@/hooks/use-modal/use-modal';

export default function GlobalModal() {
  const { viewStack, isOpen, closeModal, closeAllModals } = useModal();
  const pathname = usePathname();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
  };

  useEffect(() => {
    closeAllModals();
  }, [pathname]);

  return (
    <>
      {viewStack.map((modal, index) => {
        const zIndex = viewStack?.length == 1 ? 9999 : 9990 + index;
        const size = modal.customSize || 'fit-content';
        const maskCloseable = modal.maskCloseable === true;
        return (
          <Modal
            key={index}
            open={isOpen}
            disableEscapeKeyDown
            onClose={() => (maskCloseable ? closeModal() : null)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...style, width: size }}>{modal.view}</Box>
          </Modal>
        );
      })}
    </>
  );
}
