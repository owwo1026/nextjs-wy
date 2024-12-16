'use client';
import { Grid, Box } from '@mui/material';

import PageContainer from '@/app/(frontend)/shared/PageContainer';
// components
import SalesOverview from '@/app/admin/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/admin/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/admin/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/admin/components/dashboard/ProductPerformance';
import Blog from '@/app/admin/components/dashboard/Blog';
import MonthlyEarnings from '@/app/admin/components/dashboard/MonthlyEarnings';

const Dashboard = () => {
  return (
    <PageContainer title="wydesign" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
