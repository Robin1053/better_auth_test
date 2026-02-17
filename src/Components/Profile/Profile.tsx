"use client"
import { Box, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { UserProfile } from "./Tabs/UserProfile";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



function Profile() {

    const { data: session } = authClient.useSession()


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="User Profile" value={0} />
                    <Tab label="Safety" value={1} />
                    <Tab label="Sessions" value={2} />
                    <Tab label="Accounts" value={3} />
                    <Tab label="Danger" value={4} />
                </Tabs>
            </Box>
            <Box sx={{ p: 3 }}>
                {value === 0 && <UserProfile session={session} />}
                {value === 1 && <div>Safety Content</div>}
                {value === 2 && <div>Sessions Content</div>}
                {value === 3 && <div>Accounts Content</div>}
                {value === 4 && <div>Danger Content</div>}
            </Box>
        </>
    );
}

export { Profile }