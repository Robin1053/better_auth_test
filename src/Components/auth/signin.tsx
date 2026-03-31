"use client";

import * as React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Alert,
    Button,
    LinearProgress,
    Divider,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Emailfield } from "@/Components/auth/FormComponents/email";
import {
    Passwordfield,
    SocialSigninButton,
    useNotification,
} from "@robineb/mui-utility";
import { isEmailValid } from "@/lib/hooks/Validations";
import { Provider, SigninProps } from "@/@types/auth";





function Signin({ onForgotPassword }: SigninProps) {
    const router = useRouter();
    const { notify } = useNotification();

    const [session, setSession] = React.useState<any>(null);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [rememberMe, setRememberMe] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);
    const [PasswordError, setPasswordError] = React.useState(false);

    // last used login-method flags
    const wasGoogle = authClient.isLastUsedLoginMethod("google");
    const wasEmail = authClient.isLastUsedLoginMethod("email");
    const wasPasskey = authClient.isLastUsedLoginMethod("passkey");
    const wasGitHub = authClient.isLastUsedLoginMethod("github");

    React.useEffect(() => {
        (async () => {
            const { data } = await authClient.getSession();
            setSession(data ?? null);
        })();
    }, []);

    React.useEffect(() => {
        if (session) router.replace("/");
    }, [session, router]);

    async function handleSocialLogin(provider: Provider) {
        try {
            setLoading(true);
            setErrorMessage("");

            if (provider === "passkey") {
                // ggf. an deine passkey API anpassen
                await authClient.signIn.passkey();
            } else {
                await authClient.signIn.social({
                    provider,
                    callbackURL: "/",
                });
            }
        } catch (err: any) {
            const msg = err?.message || "Social sign-in failed.";
            setErrorMessage(msg);
            notify({ message: msg, type: "error" });
        } finally {
            setLoading(false);
        }
    }

    async function handleEmailSignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setEmailError(false);
        setPasswordError(false);

        if (!isEmailValid(email)) {
            setEmailError(true);
            setErrorMessage("This e-mail is invalid.");
            setLoading(false);
            return;
        }

        if (!email || !password) {
            setErrorMessage("E-mail or password is missing.");
            setEmailError(!email);
            setPasswordError(!password);
            setLoading(false);
            return;
        }

        await authClient.signIn.email(
            { email, password, rememberMe },
            {
                async onSuccess(context: any) {
                    setLoading(false);
                    setEmailError(false);
                    setPasswordError(false);
                    setEmail("");
                    setPassword("");

                    if (context?.data?.twoFactorRedirect) {
                        notify({
                            message: "Please complete two-factor authentication.",
                            type: "info",
                        });
                        router.push("/auth?view=twoFactor");
                    }
                },
                onError(error: any) {
                    setLoading(false);
                    const code = error?.error?.code;
                    const msg = error?.error?.message || "Sign-in failed.";
                    setErrorMessage(msg);

                    if (code === "INVALID_EMAIL_OR_PASSWORD") {
                        setEmailError(true);
                        setPasswordError(true);
                    }
                },
                onUnexpectedError() {
                    setLoading(false);
                    setErrorMessage("An unexpected error occurred. Please try again.");
                },
            }
        );
    }

    const signinItems: Array<{ provider: Provider; used: boolean }> = [
        { provider: "passkey", used: wasPasskey },
        { provider: "google", used: wasGoogle },
        { provider: "github", used: wasGitHub },
    ];

    return (
        <Card sx={{ maxWidth: 450, mx: "auto", mt: 5 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h3" color="primary">
                    Sign In
                </Typography>

                {errorMessage && (
                    <Alert variant="outlined" severity="error">
                        {errorMessage}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleEmailSignIn}
                    noValidate
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <Emailfield
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
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
                        Props={{
                            TextfieldProps: {
                                tabIndex: 3,
                                autoComplete: "current-password webauthn",
                            },
                        }}
                    >
                        Password
                    </Passwordfield>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                tabIndex={3}
                            />
                        }
                        label="Remember me?"
                    />

                    <Box sx={{ position: "relative", width: "100%" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                            tabIndex={4}
                        >
                            Sign in with e-mail and password
                        </Button>

                        {wasEmail && (
                            <Typography
                                variant="caption"
                                color="primary"
                                sx={{
                                    position: "absolute",
                                    top: -12,
                                    right: 0,
                                    backgroundColor: "background.paper",
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

                <Box sx={{ maxWidth: 400, position: "relative" }}>
                    {loading ? <LinearProgress /> : <Divider>OR Sign in with</Divider>}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {signinItems.map((item) => (
                        <Box key={item.provider} sx={{ position: "relative", width: 400 }}>
                            <SocialSigninButton
                                Provider={item.provider}
                                variant="large"
                                maxWidth={400}
                                action={() => handleSocialLogin(item.provider)}
                                Notification={{
                                    useNotification: true,
                                    successmessage: "Login successful",
                                    errormessage: "Login failed",
                                }}
                            >
                                {`Continue with ${item.provider}`}
                            </SocialSigninButton>

                            {item.used && (
                                <Typography
                                    variant="caption"
                                    color="primary"
                                    sx={{
                                        position: "absolute",
                                        top: -12,
                                        right: 8,
                                        backgroundColor: "background.paper",
                                        px: 0.75,
                                        borderRadius: 1,
                                        fontWeight: 600,
                                        zIndex: 1,
                                    }}
                                >
                                    Last logged in
                                </Typography>
                            )}
                        </Box>
                    ))}
                </Box>

                <Box id="google-signin-button" />
            </CardContent>
        </Card>
    );
}

export default Signin;