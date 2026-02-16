"use client"
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image"
const { data: session } = await authClient.getSession()

export default function Home() {
  const router = useRouter();
  async function handleOneTap() {
    await authClient.oneTap({
      uxMode: "popup",
    });
  }
  console.log(process.env.GOOGLE_CLIENT_ID as string);

  handleOneTap();

  return (
    <>
      {session ? (
        <div>
          <h1>Welcome, {session.user.name}!</h1>
        </div>
      ) : (
        <div>
          <h1>You are not logged in.</h1>
          <button onClick={handleOneTap}>Login with Google One Tap</button>
        </div>
      )}
    </>
  );
}
