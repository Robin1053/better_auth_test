import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "@better-auth/passkey";
import { admin, lastLoginMethod } from "better-auth/plugins";

export const auth = betterAuth({
  database: new Database(process.env.DB_PATH || "dev.db"),
  baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "default_secret_key",

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies(), passkey(), admin(), lastLoginMethod()],
});
