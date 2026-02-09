"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { authClient } from '@/lib/auth-client'

const { data: session } = await authClient.getSession()


export default function Home() {

  return (
    <>
      <Typography variant="h1">Home</Typography>
      <Button variant="outlined"
        color="secondary"
        onClick={async () => await authClient.signOut()}>
        Sign Out Button

      </Button >
      {session && <Typography variant="body1">Logged in as {session.user.name}</Typography>}
      {session && <Image src={session.user.image || ''} alt="Profile Picture" width={100} height={100} />}
    </>
  );
}
