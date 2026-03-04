import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { passkeyClient } from "@better-auth/passkey/client"; // import the client-side plugin
import { adminClient, inferAdditionalFields, lastLoginMethodClient, oneTapClient, twoFactorClient } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({


  plugins: [
    inferAdditionalFields<typeof auth>(),
    passkeyClient(),
    adminClient(),
    lastLoginMethodClient(),
    twoFactorClient(),
    oneTapClient(
      {
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        autoSelect: true,
        uxMode: "popup",
        cancelOnTapOutside: true,
      }
    )
  ],
});

export type Session = typeof authClient.$Infer.Session
