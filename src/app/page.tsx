"use client"
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


export default function Home() {
  const router = useRouter();
  handleOneTapSignIn();

  async function handleOneTapSignIn() {
    await authClient.oneTap({
      fetchOptions: {
        onSuccess: () => {
          router.push("/dashboard");
        }
      }
    });

  }
  return (
    <>
    </>
  );
}
