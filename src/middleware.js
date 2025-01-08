import withAuth from 'next-auth/middleware';

import { routes } from '@/config/routes';

export default withAuth({
  pages: {
    signIn: routes.signIn,
    error: routes.signIn,
  },
});

export const config = {
  matcher: [
    // 匹配需要排除驗證的路徑
    '/((?!api|images|_next|test|authentication|favicon.ico).*)',
  ],
};
