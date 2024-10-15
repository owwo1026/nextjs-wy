import { getServerSession } from 'next-auth/next';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import AuthProvider from '@/app/api/auth/[...nextauth]/auth-provider';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { baselightTheme } from "@/utils/theme/DefaultColors";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <AuthProvider session={session}>
          <ThemeProvider theme={baselightTheme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
