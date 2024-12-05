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

import { create as createUser, get as getUser } from '@/app/repository/user';
// import { sendWelcomeEmail } from "@/app/service/email/welcome";
// import { sendVerificationEmail } from "@/app/service/email/verify";
import { routes } from '@/config/routes';

const prisma = new PrismaClient();

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
      console.log('CredentialsProvider session', session);
      const dbUser = await getUser({ email: session.user.email as string });

      const newSession = session as unknown as CustomSession;
      newSession.authUser = dbUser;

      return session;
    },
    async signIn({ user }) {
      console.log('CredentialsProvider signIn', user);
      if (!user) {
        return false;
      }

      let userExists = null;

      try {
        userExists = await getUser({ email: user.email as string });
      } catch (e) {
        console.error(e);
      }

      if (userExists) {
        return true;
      }

      await createUser({
        email: user.email as string,
        name: user.name as string,
        image: user.image as string,
      });

      // sendWelcomeEmail(user.name as string, user.email as string);
      // sendVerificationEmail(user.name as string, user.email as string);

      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('CredentialsProvider redirect', url, baseUrl);
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
          return user as unknown as User;
        }

        return null;
      },
    }),
  ],
};
