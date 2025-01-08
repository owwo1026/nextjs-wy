'use client';
import { Box, Typography, Button } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';
import DashboardCard from '@/components/shared/DashboardCard';
import { useLoader } from '@/hooks/use-loader/use-loader';
import useDialog from '@/hooks/use-dialog';

import { create } from '@/app/repository/user';

const SamplePage = () => {
  const { openLoader, closeLoader, isLoading } = useLoader();
  const { errorDialog, successDialog } = useDialog();

  const handleSubmit = async () => {
    try {
      openLoader();
      const result = await fetch(`/api/register`, {
        method: 'POST',
        body: JSON.stringify({
          name: 'test',
          email: 'test@gmail.com',
          password: 'test',
          passwordConfirm: 'test',
        }),
      });
      const response = await result.json();
      console.log('response', response);
      if (!result.ok) {
        throw new Error(response.message);
      }
      successDialog('成功');
    } catch (error) {
      errorDialog(error);
    } finally {
      closeLoader();
    }
  };

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Sample Page">
        <div>
          <Typography>This is a test page</Typography>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            註冊
          </Button>
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
