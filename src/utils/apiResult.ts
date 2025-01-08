import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function apiResult(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { apiResult };
export default apiResult;
