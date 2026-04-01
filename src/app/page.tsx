"use client"
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography'


export default function Home() {
  const { data: session } = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (<>Loading...</>);
  }


  return (
    <>
      {session ? (
        <div>
          <Typography
            variant="h1"
            color="tertiary"
            sx={
              {
                display: "flex",
                justifyContent: "center"
              }
            }
          >Welcome, {session.user.name}</Typography>
        </div >
      ) : (
        <div>
          <h1>You are not logged in.</h1>
        </div>
      )
      }
    </>
  );
}
