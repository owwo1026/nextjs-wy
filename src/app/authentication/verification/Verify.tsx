'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { useLoader } from '@/hooks/use-loader/use-loader';
import useDialog from '@/hooks/use-dialog';

interface VerifyProps {
  setError: (error: string) => void;
}

export default function Verify(props: VerifyProps) {
  const { setError } = props;

  const searchParams = useSearchParams();
  const router = useRouter();
  const { openLoader, closeLoader, isLoading } = useLoader();
  const { errorDialog, successDialog } = useDialog();

  const token = searchParams.get('token');

  if (!token) {
    router.push('/signin');
  }

  const verify = useCallback(async () => {
    const response = await fetch('/api/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });

    console.log('VerificationPage verify response', response);
    if (response.ok) {
      successDialog('帳號啟用成功', () => {
        router.push('/signin');
      });
    } else {
      const data = await response.json();
      setError(data.message);
      errorDialog(data.message);
    }
  }, [router, token, setError]);

  useEffect(() => {
    verify();
  }, [token, verify]);

  return null;
}
