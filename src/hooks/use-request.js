// import { useLoader } from '@/app/shared/loader-views/use-loader';
// import useDialog from '@/hooks/use-dialog';

// export default function useRequest() {
//   const { openLoader, closeLoader } = useLoader();
//   const { confirmDialog, successDialog, errorDialog } = useDialog();

//   /**
//    * 呼叫Request
//    * @param confirmMessage 是否要顯示詢問訊息(選填)
//    * @param request 方法給予async function
//    * @param successMessage 成功時顯示的訊息(選填)
//    * @param onSuccess 成功後要執行的操作(選填)
//    * @param actionName 如果有傳，且沒有傳confirmMessage或successMessage，會增加預設訊息
//    * @param beforeRequest 確認執行到發送請求前的處理，通常放updFiles
//    * @param showError 失敗時是否要跳訊息
//    * @param showLoader 讀取時是否要顯示圖示
//    * @param onError 當request失敗時要執行的error function(選填)
//    * @param onFinally finally要執行的function(選填)
//    */
//   const call = ({
//     confirmMessage,
//     request,
//     successMessage,
//     onSuccess,
//     actionName,
//     beforeRequest,
//     showError = true,
//     showLoader = true,
//     onError,
//     onFinally,
//   }) => {
//     if (actionName) {
//       confirmMessage = confirmMessage ?? '確定要' + actionName + '?';
//       successMessage = successMessage ?? actionName + '成功';
//     }

//     const errorCallback = async () => {
//       if (typeof onError === 'function') {
//         await onError();
//       }
//     };

//     const finallyCallback = async () => {
//       if (typeof onFinally === 'function') {
//         await onFinally();
//       }
//     };

//     // 將錯誤處理和 finally 邏輯抽出來
//     const handleProcess = (process) => {
//       if (showLoader) {
//         openLoader();
//       }
//       return process()
//         .catch((error) => {
//           if (showError) {
//             errorDialog(error);
//           } else {
//             console.log(error);
//           }
//           if (onError) {
//             errorCallback();
//           }
//         })
//         .finally(() => {
//           if (onFinally) {
//             finallyCallback();
//           }
//           if (showLoader) {
//             closeLoader();
//           }
//         });
//     };

//     const postData = async () => {
//       if (typeof beforeRequest === 'function') {
//         await beforeRequest();
//       }

//       let response;
//       // 判斷如果 request 執行後返回陣列，則使用 Promise.all 處理
//       if (typeof request === 'function') {
//         const result = await request();
//         if (Array.isArray(result)) {
//           // 如果 request 返回陣列，使用 Promise.all 處理
//           response = await Promise.all(result);
//         } else {
//           // 如果返回單一值，直接使用
//           response = result;
//         }
//       }

//       const successCallback = async () => {
//         if (typeof onSuccess === 'function') {
//           await onSuccess(response);
//         }
//       };

//       // 有要顯示成功的訊息
//       if (typeof successMessage === 'function') {
//         successMessage = successMessage(response);
//       }

//       if (successMessage) {
//         successDialog(successMessage, () => handleProcess(successCallback));
//       } else {
//         await handleProcess(successCallback); // 直接執行 successCallback
//       }
//     };

//     // 有傳 confirmMessage 時，增加詢問，反之不詢問
//     if (confirmMessage) {
//       confirmDialog(confirmMessage, () => handleProcess(postData));
//     } else {
//       handleProcess(postData);
//     }
//   };

//   return {
//     call,
//   };
// }
