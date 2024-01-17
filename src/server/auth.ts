import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { env } from "@/env";
import { db } from "@/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      console.log("USER", user);
      console.log("SESSION ", session);
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      name:"github",
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", placeholder: "Enter Email" },
        password: { label: "Password", placeholder: "Enter Password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials.password) return null;
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          console.log("dbsearch ", user);

          if (!user) return null;

          if (!user.password) return null;

          const compare = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          console.log(compare);

          if (!compare) return null;

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: env.JWT_SECRET,
};

export const getServerAuthSession = () => getServerSession(authOptions);
