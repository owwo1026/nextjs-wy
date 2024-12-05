'use client';

import { Button } from '@mui/material';
import cn from '@/utils/class-names';

export default function TbsButton({ colorType = 'default', className, children, ...props }) {
  const customClasses = {
    default: '',
    outline: 'bg-white text-black border-2 border-gray-300 hover:bg-white hover:border-2 hover:border-black ',
    white: 'bg-white text-black hover:border hover:border-gray-300 hover:bg-white hover:opacity-75',
    blue: 'bg-tbs-blue-light hover:bg-[#0069D9]',
    brown: 'bg-tbs-brown text-white hover:bg-[#9c813a]',
    darkBrown: 'bg-tbs-brown-dark text-white hover:bg-[#7E4C00]',
    orange: 'bg-tbs-orange text-white hover:bg-[#915801]',
    cyan: 'bg-[#618D9B] text-white hover:bg-[#468194]',
    green: 'bg-[#619B8D] text-white hover:bg-[#4c7a6f]',
    red: 'bg-tbs-red text-white hover:bg-[#E55353]',
    transparent: 'text-white @xl:w-auto bg-transparent hover:bg-transparent hover:text-white hover:opacity-75',
  };

  return (
    <Button
      className={cn('font-normal', customClasses[colorType], props?.disabled ? 'opacity-50' : '', className)}
      {...props}
    >
      {children}
    </Button>
  );
}
