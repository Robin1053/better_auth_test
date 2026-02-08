"use client"

import { authClient } from "@/lib/auth-client";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Input, FormControl, IconButton, InputAdornment, InputLabel, TextField, Typography, Alert, Button, LinearProgress, Divider, FormControlLabel, Checkbox } from "@mui/material";
import * as React from "react";
import { GitHubButton, GoogleButton, PasskeyButton } from "./LoginButtons";

type SigninProps = {
    onForgotPassword?: () => void;
};

function Signin({ onForgotPassword }: SigninProps) {
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




    //Validierungen 
    const isEmailValid = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };


    async function handleEmailSignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setEmailError(false);
        setPasswordError(false);

        // Clientseitige Prüfung
        if (!isEmailValid(email)) {
            setEmailError(true)
            setErrorMessage("These E-Mail is invalid")
            setLoading(false)
            return;
        }
        if (!email || !password) {
            setErrorMessage("E-Mail Or Password is missing.");
            setEmailError(!email);
            setPasswordError(!password);
            setLoading(false)
            return;
        }
        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                rememberMe,
                callbackURL: "/"
            });
            if (error) {
                switch (error.code) {
                    case "invalid_email":
                        setEmailError(true);
                        setErrorMessage("These E-Mail is invalid.");
                        break;

                    case "invalid_password":
                        setPasswordError(true);
                        setErrorMessage("Wrong Passwort.");
                        break;

                    case "user_not_found":
                        setEmailError(true);
                        setErrorMessage("There is no userer with this password.");
                        break;

                    case "too_many_requests":
                        setErrorMessage(
                            "Too many login attempts. Please try again later.."
                        );
                        break;

                    default:
                        setErrorMessage("Unknown error: " + error.message);
                        setEmailError(true);
                        setPasswordError(true);
                }

                console.error("Better Auth Eror:", error);
                return;
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setErrorMessage("An unexpected error has occurred.: " + String(err));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Card sx={{ maxWidth: 400, margin: "0 auto", mt: 5 }}>
                <CardHeader>
                    <Typography variant="h4" >Sign In</Typography>
                </CardHeader>
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h3" color="primary">Sign In </Typography>
                    {errorMessage && (
                        <Alert variant="outlined" color="error">
                            {errorMessage}
                        </Alert>
                    )}
                    <Box
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                        component="form"
                        onSubmit={handleEmailSignIn}
                        noValidate>


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
                        <Button
                            onClick={onForgotPassword}
                            sx={
                                {
                                    width: 50,
                                    justifyContent: "flex-end",
                                    textTransform: "none",
                                    padding: 0,
                                    minWidth: "unset"
                                }
                            }>
                            <Typography variant="caption" color="secondary" >Forgot Passwort?</Typography>
                        </Button>


                        <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor="password">Passwort</InputLabel>
                            <Input
                                value={password}
                                required
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
                        <FormControlLabel control={
                            <Checkbox value={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        } label="Remember Me?" />

                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                            Sign In with Email and Passwort
                        </Button>
                    </Box>
                    <Box>
                        {
                            loading && (
                                <LinearProgress />
                            )

                        }
                        {
                            !loading && (
                                <Divider>OR Sign in With</Divider>
                            )
                        }
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <PasskeyButton width={400} />
                        <GoogleButton width={400} />
                        <GitHubButton width={400} />
                    </Box>
                </CardContent>
            </Card >
        </>
    );
}

export default Signin;