"use client"
import { Box, Typography } from '@mui/material'
import { authClient } from '@/lib/auth-client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            await authClient.signOut();
            router.replace("/auth?view=signin");
        };

        logout();
    }, [router]); return <Box sx={{ display: "flex", justifyContent: "center", height: "80vh", alignItems: "center" }}><Typography variant="h1" color='error'>{"You shouldn't see this. 🤔"}</Typography></Box>
}