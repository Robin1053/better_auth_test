"use client"

import * as React from 'react'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useRouter, useSearchParams } from 'next/navigation';
import Signin from './signin';
import Signup from './signup';
import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { TwoFaktor } from './twoFaktor';

function AuthPageComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [page, setPage] = React.useState("1");

    const viewToTab: Record<string, string> = {
        signin: "1",
        signup: "2",
        twoFactor: "3",
        forgot: "4",
        verification: "5",
    };

    const tabToView: Record<string, string> = {
        "1": "signin",
        "2": "signup",
        "3": "twoFactor",
        "4": "forgot",
        "5": "verification"
    };

    const setView = (view: string) => {
        const nextTab = viewToTab[view] ?? "1";
        setPage(nextTab);
        const nextQuery = view ? `?view=${view}` : "";
        router.replace(nextQuery, { scroll: false });
    };

    React.useEffect(() => {
        const viewParam = searchParams.get("view");
        if (viewParam && viewToTab[viewParam]) {
            setPage(viewToTab[viewParam]);
        }
    }, [searchParams]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setPage(newValue);
        const nextView = tabToView[newValue];
        if (nextView) {
            router.replace(`?view=${nextView}`, { scroll: false });
        }
    };

    
    useEffect(() => {
        if (!PublicKeyCredential.isConditionalMediationAvailable ||
            !PublicKeyCredential.isConditionalMediationAvailable()) {
            return;
        }

        void authClient.signIn.passkey({ autoFill: true })
    }, [])
    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={page}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Sign in" value="1" />
                            <Tab label="Sign up" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><Signin onForgotPassword={() => setView("forgot")} /></TabPanel>
                    <TabPanel value="2"><Signup /></TabPanel>
                    <TabPanel value="3"><TwoFaktor /></TabPanel>
                    <TabPanel value="4">Forgot Passwort</TabPanel>
                    <TabPanel value="5">Passwort Verfication</TabPanel>

                </TabContext>
            </Box>
        </>
    )
}

export { AuthPageComponent }