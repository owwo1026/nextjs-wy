// import NextAuth, { Session, User as NextAuthUser } from 'next-auth';
import { type NextAuthOptions, type Session, type User } from 'next-auth';
// import Google from "next-auth/providers/google";
// import GitHub from "next-auth/providers/github";
// import Faacebook from "next-auth/providers/facebook";
// import Line from "next-auth/providers/line";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, User as PrismaUser } from '@prisma/client';

import { get as getUser } from '@/app/repository/user';
import { routes } from '@/config/routes';
import { prisma } from '@/utils/prisma';

export type CustomSession = {
  authUser: PrismaUser;
} & Session;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    updateAge: 24 * 60 * 60, // 每24小時更新一次
  },
  pages: {
    signIn: routes.signIn,
    error: routes.signIn,
  },
  callbacks: {
    async session({ session }: any) {
      const dbUser = await getUser({ email: session.user.email as string });

      const newSession = session as unknown as CustomSession;
      newSession.authUser = dbUser;

      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user }) {
      console.log('CredentialsProvider token', token, user);
      // if (user) {
      //   token.accessToken = (user as User)?.accessToken;
      // }
      return token;
    },
  },
  providers: [
    // Google({
    //   allowDangerousEmailAccountLinking: true,
    // }),
    // GitHub({
    //   allowDangerousEmailAccountLinking: true,
    // }),
    // Faacebook({
    //   allowDangerousEmailAccountLinking: true,
    // }),
    // Line({
    //   allowDangerousEmailAccountLinking: true,
    //   checks: ["state"],
    // }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize({ email, password }: any) {
        const user = await getUser({
          email: email as string,
        });
        console.log('CredentialsProvider', email, password, user);

        if (!user || !user.password) {
          return null;
        }

        const match = await bcrypt.compare(password as string, user.password);

        if (match) {
          if (user.is_active === false) {
            throw new Error('帳號尚未啟用，請至電子信箱中驗證帳號');
          }
          return user as unknown as User;
        }

        return null;
      },
    }),
  ],
};
