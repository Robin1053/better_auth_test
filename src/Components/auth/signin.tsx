"use client"

import { authClient } from "@/lib/auth-client";
import { Box, Card, CardContent, Typography, Alert, Button, LinearProgress, Divider, FormControlLabel, Checkbox, Badge } from "@mui/material";
import * as React from "react";
import { GitHubButton, GoogleButton, PasskeyButton } from "@/Components/auth/FormComponents/LoginButtons";
import { Passwordfield } from "@/Components/auth/FormComponents/Password";
import { Emailfield } from "@/Components/auth/FormComponents/email";
import { useNotification } from "@/Components/ui/NotificationProvider";
import { useRouter } from "next/navigation";


type SigninProps = {
    onForgotPassword?: () => void;
};
const { data: session } = await authClient.getSession()

function Signin({ onForgotPassword }: SigninProps) {
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
            notify({ message: "Signin successful!", type: "success" });

        } catch (err) {
            console.error("Unexpected error:", err);
            setErrorMessage("An unexpected error has occurred.: " + String(err));
        } finally {
            setLoading(false);
        }
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
                            email={email}
                            setEmail={setEmail}
                            EmailError={EmailError}
                            maxWidth={400}
                        />

                        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                            <Button
                                variant="text"
                                onClick={onForgotPassword}
                                sx={{ textTransform: "none" }}
                            >
                                Forgot Password?
                            </Button>
                        </Box>


                        <Passwordfield
                            password={password}
                            setPassword={setPassword}
                            PasswordError={PasswordError}
                            maxWidth={400}
                            Label="Password"
                        />
                        <FormControlLabel control={
                            <Checkbox value={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        } label="Remember Me?" />
                        <Box sx={{ position: "relative", width: "100%" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
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
                        {[{ button: PasskeyButton, used: wasPasskey },
                        { button: GoogleButton, used: wasGoogle },
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