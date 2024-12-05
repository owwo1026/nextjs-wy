import React from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Button,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { IconAlertCircle, IconCircleCheck, IconCircleX, IconAlertTriangle } from '@tabler/icons-react';

import { useModal } from '@/hooks/use-modal/use-modal';

export default function useDialog() {
  const { openModal, closeModal } = useModal();

  const CheckModal = ({ icon, title, message, onOk, onCancel, buttonRender }) => {
    return (
      <div className="p-4 bg-white m-auto rounded-lg min-w-44">
        <div className="mb-1 pb-1 flex flex-col gap-2 items-center justify-center overflow-auto">
          {icon}
          <div className="text-xl font-bold">{title}</div>
          <div className="text-lg font-normal text-center">{message}</div>
          <div className="flex flex-row gap-1">
            {buttonRender ? (
              buttonRender()
            ) : (
              <>
                {onCancel && (
                  <Button
                    onClick={() => {
                      if (typeof onCancel === 'function') {
                        onCancel();
                      }
                      closeModal();
                    }}
                  >
                    取消
                  </Button>
                )}
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    if (typeof onOk === 'function') {
                      onOk();
                    }
                    closeModal();
                  }}
                >
                  確定
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const successDialog = (message, onOk) => {
    openModal({
      view: (
        <CheckModal icon={<IconCircleCheck color="green" size={48} />} title="成功" message={message} onOk={onOk} />
      ),
    });
  };

  const errorDialog = (message, onOk) => {
    let content = message;
    if (typeof message !== String) {
      content = message?.message || '未知錯誤';
    }
    openModal({
      view: <CheckModal icon={<IconCircleX color="red" size={48} />} title="錯誤" message={content} onOk={onOk} />,
    });
  };

  // const confirmDialog = (message, onOk) => {
  //   // 刪除時將確認圖示改成警告圖示
  //   const isDelete = typeof message === 'string' && message.includes('刪除');
  //   openModal({
  //     view: (
  //       <CheckModal
  //         type={isDelete ? TBS.CHECK_MODAL_TYPE.WARN : TBS.CHECK_MODAL_TYPE.CONFIRM}
  //         title="確認"
  //         content={message}
  //         onCancel={closeModal}
  //         onOk={() => {
  //           closeModal();
  //           if (typeof onOk === 'function') {
  //             onOk();
  //           }
  //         }}
  //       />
  //     ),
  //     customSize: '240px',
  //   });
  // };

  // const warningDialog = (message) => {
  //   openModal({
  //     view: (
  //       <CheckModal
  //         type={TBS.CHECK_MODAL_TYPE.WARN}
  //         title="警告"
  //         content={message}
  //         buttonRender={() => (
  //           <Button colorType="blue" onClick={closeModal}>
  //             確定
  //           </Button>
  //         )}
  //       />
  //     ),
  //     customSize: '240px',
  //   });
  // };

  return {
    successDialog,
    errorDialog,
    // confirmDialog,
    // warningDialog,
  };
}
