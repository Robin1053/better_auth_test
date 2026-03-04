import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "@better-auth/passkey";
import { admin, lastLoginMethod, oneTap, twoFactor } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../../generated/prisma/client';
import SendVerificationEmail from "./mail";
const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db"
})
const prisma = new PrismaClient({ adapter })

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,

  appName: "Better Auth Demo",
  rateLimit: {
    enabled: true,
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendVerificationEmail: SendVerificationEmail,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: [
        "https://www.googleapis.com/auth/user.birthday.read"
      ],
      mapProfileToUser: (profile) => {
        return {
          email: profile.email,
          name: profile.name,
          avatarUrl: profile.picture,
          emailVerified: profile.email_verified,
          birthday: profile.birthday ? new Date(profile.birthday) : undefined,
        };
      }
    },
    github: {

      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          email: profile.email,
          name: profile.name,
          avatarUrl: profile.avatar_url,
          emailVerified: true,
          birthday: profile.birthday ? new Date(profile.birthday) : undefined,
        };
      }
    },
  },
  plugins: [
    oneTap({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
    }),
    nextCookies(),
    passkey({
      rpName: "Better Auth Demo",
      origin: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000",
    }),
    admin({ defaultRole: "user", allowImpersonatingAdmins: true }),
    lastLoginMethod(),
    twoFactor({
      backupCodeOptions: {
        length: 6,
        amount: 10,
      },
    })
  ],
  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
    additionalFields : {
      birthday: {
        type: "date",
      }
    }
  },

});
