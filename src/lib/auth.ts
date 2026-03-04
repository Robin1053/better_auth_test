import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "@better-auth/passkey";
import { admin, lastLoginMethod, oneTap, twoFactor } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../../generated/prisma/client';
import { sendPasswordResetEmail as sendPasswordResetMail, sendVerificationEmail as sendVerificationMail } from "./mail/mails";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthMiddleware } from "better-auth/api";
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
    sendVerificationEmail: sendVerificationMail,
    sendPasswordResetEmail: sendPasswordResetMail,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: [
        "openid",
        "email", 
        "profile",
        "https://www.googleapis.com/auth/user.birthday.read"
      ],
      mapProfileToUser: (profile) => {
        return {
          email: profile.email,
          name: profile.name,
          avatarUrl: profile.picture,
          emailVerified: profile.email_verified,
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
    }),
    inferAdditionalFields(),
  ],
  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
    additionalFields: {
      birthday: {
        type: "date",
        required: false,
        input: true,
      }
    }
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // Nur bei OAuth Callback ausführen
      if (ctx.path.startsWith("/callback") && ctx.context.newSession) {
        const newSession = ctx.context.newSession;
        
        if (newSession?.user?.id) {
          const userId = newSession.user.id;
          
          // Warte kurz, damit der Account gespeichert ist
          await new Promise(resolve => setTimeout(resolve, 500));

          // Hole das Google Access Token
          const account = await prisma.account.findFirst({
            where: {
              userId: userId,
              providerId: "google",
            },
            orderBy: {
              createdAt: "desc",
            },
          });

          if (account?.accessToken) {
            try {
              const response = await fetch(
                'https://people.googleapis.com/v1/people/me?personFields=birthdays',
                {
                  headers: {
                    Authorization: `Bearer ${account.accessToken}`,
                  },
                }
              );

              if (response.ok) {
                const data = await response.json();

                if (data.birthdays?.[0]?.date) {
                  const bday = data.birthdays[0].date;
                  if (bday.year && bday.month && bday.day) {
                    const birthday = new Date(bday.year, bday.month, bday.day);
                    
                    // Update User mit Birthday
                    await prisma.user.update({
                      where: { id: userId },
                      data: { birthday },
                    });
                  }
                }
              }
            } catch (error) {
              console.error("Error fetching birthday from Google People API:", error);
            }
          }
        }
      }
    }),
  },

});
