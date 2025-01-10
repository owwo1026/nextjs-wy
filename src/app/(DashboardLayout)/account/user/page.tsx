'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

import PageContainer from '@/components/container/PageContainer';
import DashboardCard from '@/components/shared/DashboardCard';
import BasicTable, { HeadCell } from '@/components/table/basic-table';

import { useLoader } from '@/hooks/use-loader/use-loader';
import useDialog from '@/hooks/use-dialog';
import useRequest from '@/hooks/use-request';
import { DATE_FORMAT, formatDate } from '@/utils/date';

interface Data {
  id: number;
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: '姓名',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: '帳號',
  },
  {
    id: 'updated_at',
    numeric: true,
    disablePadding: false,
    label: '最後異動時間',
    render: (value) => formatDate(value, DATE_FORMAT.DAYJS_TIME_SLASH),
  },
  {
    id: 'created_at',
    numeric: true,
    disablePadding: false,
    label: '建立時間',
    render: (value) => formatDate(value, DATE_FORMAT.DAYJS_TIME_SLASH),
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: '功能',
  },
];

const pageHeader = {
  title: '使用者管理',
  description: '使用者列表',
};

export default function Page() {
  const router = useRouter();
  const { openLoader, closeLoader, isLoading } = useLoader();
  const { errorDialog, successDialog } = useDialog();

  const [data, setData] = useState<[]>([]);

  console.log('data', data);

  useEffect(() => {
    const getUserData = async () => {
      try {
        openLoader();
        const result = await fetch(`/api/user`, {
          method: 'GET',
          // body: JSON.stringify(formValues),
        });
        const response = await result.json();
        console.log('getUserData response', response);
        if (!response.success) {
          throw new Error(response.message);
        }
        setData(response.data);
        // successDialog('註冊成功，請先至電子信箱驗證啟用帳號', () => {
        //   router.push('/authentication/login');
        // });
      } catch (error) {
        errorDialog(error);
      } finally {
        closeLoader();
      }
    };
    getUserData();
  }, []);

  return (
    <PageContainer title={pageHeader.title} description={pageHeader.description}>
      <DashboardCard {...pageHeader}>
        <Box sx={{ width: '100%' }}>
          <BasicTable
            // title="使用者列表"
            columns={headCells}
            data={data}
            onRowClick={(e, row) => {
              console.log(row);
            }}
          />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
}
