"use client"
import { authClient } from "@/lib/auth-client";
import Typography from '@mui/material/Typography'
import {ActionButton} from "@robineb/mui-utility"

const { data: session } = await authClient.getSession()

export default function Home() {
  async function handleOneTap() {
    await authClient.oneTap({
      uxMode: "popup",
    });
  }

  handleOneTap();

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
