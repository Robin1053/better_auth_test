"use client"

import * as React from 'react'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import Signin from './signin';
import Signup from './signup';

function AuthPageComponent() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Sign in" value="1" />
                            <Tab label="Sign up" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><Signin /></TabPanel>
                    <TabPanel value="2"><Signup /></TabPanel>
                    <TabPanel value="3">2-FA</TabPanel>
                    <TabPanel value="3">Forgot Passwort</TabPanel>
                    <TabPanel value="3">Passwort Verfication</TabPanel>

                </TabContext>
            </Box>
        </>
    )
}

export { AuthPageComponent}