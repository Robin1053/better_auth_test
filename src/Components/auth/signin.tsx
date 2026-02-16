"use client"

import { authClient } from "@/lib/auth-client";
import { Box, Card, CardContent, Typography, Alert, Button, LinearProgress, Divider, FormControlLabel, Checkbox, Badge } from "@mui/material";
import * as React from "react";
import { GitHubButton, GoogleButton, PasskeyButton } from "@/Components/auth/FormComponents/LoginButtons";
import { Passwordfield } from "@/Components/auth/FormComponents/Password";
import { Emailfield } from "@/Components/auth/FormComponents/email";
import { useNotification } from "@/Components/ui/NotificationProvider";
import { useRouter } from "next/navigation";
import { theme } from "@/theme/mui";
import { set } from "zod";


type SigninProps = {
    onForgotPassword?: () => void;
};
const { data: session } = await authClient.getSession()

function Signin({ onForgotPassword }: SigninProps) {


    async function handleOneTap() {
        await authClient.oneTap({
            uxMode: "popup",
            button: {
                container: "#google-signin-button",
                config: {
                    theme: theme.palette.mode === "dark" ? "filled_black" : "outline",
                    size: "large",
                    type: "standard",
                    text: "signin_with",
                    width: 400,
                }
            }
        });
    }
    console.log(process.env.GOOGLE_CLIENT_ID)

    handleOneTap();


    const router = useRouter();

    //session check
    if (session) {
        router.replace("/")
    }

    //Notification
    const { notify } = useNotification();

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
        await authClient.signIn.email({
            email: email,
            password: password,
        },
            {
                async onSuccess(context) {
                    setLoading(false)
                    setEmailError(false);
                    setPasswordError(false);
                    setEmail("");
                    setPassword("");
                    if (context.data.twoFactorRedirect) {
                        notify({
                            message: "Please complete the two-factor authentication to proceed.",
                            type: "info",
                        });
                        router.push("/auth?view=twoFactor")
                    }
                },
                onError(error) {
                    setErrorMessage(error.error.message || "An error occurred during sign-in.");
                    setLoading(false);
                    if (error.error.code === "INVALID_EMAIL_OR_PASSWORD") {
                        setEmailError(true);
                        setPasswordError(true);
                    }
                    if (error.error.code === "UserNotFound") {
                        setEmailError(true);
                        setErrorMessage(error.error.message || "No account found with this email.");
                    }
                    if (error.error.code === "TooManyAttempts") {
                        setErrorMessage(error.error.message || "Too many failed attempts. Please try again later.");
                        notify({
                            message: error.error.message || "Too many failed attempts. Please try again later.",
                            type: "error",
                        });
                    }
                },
                onUnexpectedError() {
                    setErrorMessage("An unexpected error occurred. Please try again.");
                    setLoading(false);
                }
            }
        )

    }

    return (
        <>
            <Card sx={{ maxWidth: 450, margin: "0 auto", mt: 5 }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h3" color="primary">Sign In </Typography>
                    {errorMessage && (
                        <Alert
                            variant="outlined"
                            severity="error">
                            {errorMessage}
                        </Alert>
                    )}
                    <Box
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                        component="form"
                        onSubmit={handleEmailSignIn}
                        noValidate>

                        <Emailfield
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={EmailError}
                            sx={{ maxWidth: 400 }}
                            loading={loading}
                            tabIndex={2}
                            label="E-Mail"
                            autoComplete="email webauthn"
                        />

                        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                            <Button
                                tabIndex={-1}
                                variant="text"
                                onClick={onForgotPassword}
                                sx={{ textTransform: "none" }}
                            >
                                Forgot Password?
                            </Button>
                        </Box>


                        <Passwordfield
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={PasswordError}
                            loading={loading}
                            sx={
                                { maxWidth: 400 }
                            }
                            label="Password"
                            tabIndex={3}
                            autoComplete="current-password webauthn"

                        />
                        <FormControlLabel control={
                            <Checkbox value={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} tabIndex={3} />
                        } label="Remember Me?" />
                        <Box sx={{ position: "relative", width: "100%" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                                tabIndex={4}
                            >
                                Sign In with Email and Passwort
                            </Button>
                            {wasEmail && (
                                <Typography
                                    variant="caption"
                                    color="primary"
                                    sx={{
                                        position: "absolute",
                                        top: -12,
                                        right: 0,
                                        backgroundColor: "white",
                                        px: 0.5,
                                        borderRadius: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Last logged in
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Box sx={
                        {
                            maxWidth: 400,
                            position: "relative"
                        }
                    }>
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
                        <div id="google-signin-button"></div>
                        {[{ button: PasskeyButton, used: wasPasskey },
                        //    { button: GoogleButton, used: wasGoogle },
                        { button: GitHubButton, used: wasGitHub }].map((item, index) => (
                            <Box key={index} sx={{ position: "relative", width: 400 }}>
                                <item.button width={400} />
                                {item.used && (
                                    <Typography
                                        variant="caption"
                                        color="primary"
                                        sx={{
                                            position: "absolute",
                                            top: -12,
                                            right: 0,
                                            backgroundColor: "white",
                                            px: 0.5,
                                            borderRadius: 1,
                                            fontWeight: 500,
                                        }}
                                    >
                                        Last logged in
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>

                </CardContent>
            </Card >
        </>
    );
}

export default Signin;