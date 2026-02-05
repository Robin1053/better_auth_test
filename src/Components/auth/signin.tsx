"use client"

import { authClient } from "@/lib/auth-client";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Input, FormControl, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import * as React from "react";
import * as zod from "zod";

function Signin() {
    // States 
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false);
    const [rememberMe, setRememberMe] = React.useState(false);


    // Error handling states
    const [errorMessage, setErrorMessage] = React.useState("");
    const [EmailError, setEmailError] = React.useState(false);
    const [PasswordError, setPasswordError] = React.useState(false)

    // Determine last used login methods
    const wasGoogle = authClient.isLastUsedLoginMethod("google")
    const wasEmail = authClient.isLastUsedLoginMethod("email")
    const wasPasskey = authClient.isLastUsedLoginMethod("passkey")
    const wasGitHub = authClient.isLastUsedLoginMethod("github")





    // ------------------------
    // Password visibility handlers
    // ------------------------
    //  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <>
            <Card>
                <CardHeader>
                    <Typography variant="h4" >Sign In</Typography>
                </CardHeader>
                <CardContent>
                    <Box>
                        <Box>
                            <TextField
                                fullWidth
                                id="email"
                                label="Max@Musterman.com"
                                variant="standard"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                error={EmailError}
                            />
                            <FormControl fullWidth variant="standard">
                                <InputLabel htmlFor="password">Passwort</InputLabel>
                                <Input
                                    value={password}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={PasswordError}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword
                                                        ? "Passwort ausblenden"
                                                        : "Passwort anzeigen"
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default Signin;