"use client"
import { Box, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { UserProfile } from "./Tabs/UserProfile";



function Profile() {



    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Profile Tabs">
                    <Tab label="User Profile" value={0} aria-label="Profile Tab" />
                    <Tab label="Safety" value={1} aria-label="Safety Tab" />
                    <Tab label="Sessions" value={2} aria-label="Sessions Tab" />
                    <Tab label="Accounts" value={3} aria-label="Accounts Tab" />
                    <Tab label="Danger" value={4} aria-label="Danger Tab" />
                </Tabs>
            </Box>
            <Box sx={{ p: 3 }}>
                {value === 0 && <UserProfile />}
                {value === 1 && <div>Safety Content</div>}
                {value === 2 && <div>Sessions Content</div>}
                {value === 3 && <div>Accounts Content</div>}
                {value === 4 && <div>Danger Content</div>}
            </Box>
        </>
    );
}

export { Profile }