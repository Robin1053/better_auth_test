'use client'
import Button from '@mui/material/Button'
import * as React from "react"
import { useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';



function Verfication() {
    const searchParams = useSearchParams();

    const EmailToken = searchParams.get('token')


    async function verify() {
        authClient.verifyEmail(
            {
                query: {
                    token: EmailToken as string,
                    callbackURL: "/"
                }
            })
    }

    return (
        <>
            <Button variant="text" color="primary" onClick={verify}>
                Anmelden
            </Button>
        </>
    )
}

export { Verfication }