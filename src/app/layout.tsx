import { getServerSession } from 'next-auth/next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AuthProvider from '@/app/api/auth/[...nextauth]/auth-provider';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { baselightTheme } from '@/theme/DefaultColors';

import GlobalLoader from '@/hooks/use-loader/container';
import GlobalModal from '@/hooks/use-modal/container';

import '@/app/global.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <body>
        <AuthProvider session={session}>
          <ThemeProvider theme={baselightTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <GlobalLoader />
            <GlobalModal />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
