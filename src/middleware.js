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
    // 匹配所有路由，但排除以 /images 或 /public 為前綴的路徑
    '/((?!api|images|_next|authentication|favicon.ico).*)',
  ],
};
