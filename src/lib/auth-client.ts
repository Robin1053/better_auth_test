import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { passkeyClient } from "@better-auth/passkey/client"; // import the client-side plugin
import { adminClient, lastLoginMethodClient, oneTapClient, twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    passkeyClient(),
    adminClient(),
    lastLoginMethodClient(),
    twoFactorClient(),
    oneTapClient(
      {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        autoSelect: true,
        uxMode: "popup",
        cancelOnTapOutside: true,
      }
    )
  ],
});
