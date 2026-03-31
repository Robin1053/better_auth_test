"use client"
import { Card, CardContent, Typography, Box, Button, LinearProgress, Divider, Alert } from "@mui/material";
import * as React from "react"
import { Emailfield } from "@/Components/auth/FormComponents/email";
import { authClient } from "@/lib/auth-client";
import { AvatarUpload, Passwordfield, SocialSigninButton, useNotification } from "@robineb/mui-utility";
import { Namefield } from "@/Components/auth/FormComponents/name";
import { useRouter } from "next/navigation";
import { isEmailValid, isPasswordValid, isNameValid, isBirthdayValid } from "@/lib/hooks/Validations";
import { Provider } from "@/@types/auth";
import { Dayjs } from "dayjs";


const { data: session } = await authClient.getSession()

function Signup() {
    //Router 
    const router = useRouter();


    //Session check
    if (session) {
        router.replace("/")
    }
    //Notification
    const { notify } = useNotification();

    // States 
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [password2, setPassword2] = React.useState("")
    const [birthday, setBirthday] = React.useState<Dayjs | null>(null)
    const [loading, setLoading] = React.useState(false);


    // Error handling states
    const [errorMessage, setErrorMessage] = React.useState("");
    const [EmailError, setEmailError] = React.useState(false);
    const [PasswordError, setPasswordError] = React.useState(false)
    const [NameError, setNameError] = React.useState(false)
    const [BirthdayError, setBirthdayError] = React.useState(false)
    const [Error, setError] = React.useState(false)

    // last used login-method flags
    const signinItems: Array<{ provider: Provider }> = [
        { provider: "google" },
        { provider: "github" },
    ];


    async function handleEmailSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setEmailError(false);
        setPasswordError(false);
        setNameError(false)
        setError(false)

        //client Validirungen 
        if (!isNameValid(name)) {
            setLoading(false)
            setNameError(true)
            setErrorMessage("Please fill in the Name field")
            return;
        }
        if (!isEmailValid(email)) {
            setLoading(false)
            setErrorMessage("These E-Mail is invalid")
            setEmailError(true)
            return;
        }
        if (!isPasswordValid(password, password2)) {
            setLoading(false)
            setErrorMessage("These Password are invalid")
            setPasswordError(true)
            return;
        }

        await authClient.signUp.email(
            { email, password, name, birthday: birthday ? birthday.toDate() : null },
            {
                async onSuccess(context: any) {
                    setError(false)
                    setLoading(false);
                    setErrorMessage("");
                    setEmailError(false);
                    setPasswordError(false);
                    setNameError(false)
                    setEmail("");
                    setPassword("");
                    setName("");
                    setPassword2("");
                    setBirthday(null)
                },
                onError(ctx) {
                    if (ctx.error.status === 403) {
                        router.push("/auth?view=verification")
                        notify({
                            message: "Please verify your email address",
                            type: "warning"
                        })
                    } else {
                        setError(true)
                        notify({
                            type: "error",
                            message: ctx.error.message
                        })
                    }
                },
            }
        );
    }

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


    return (
        <>
            <Card sx={
                {
                    maxWidth: 450,
                    margin: "0 auto",
                    mt: 5
                }
            }>
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h3" color="primary">Sign Up </Typography>
                    {errorMessage && (
                        <Alert
                            variant="outlined"
                            severity="error">
                            {errorMessage}
                        </Alert>
                    )}
                    <Box
                        component="form"
                        onSubmit={handleEmailSignUp}
                        noValidate
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                        <Namefield
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={NameError}
                            sx={{ maxWidth: 400 }}
                            tabIndex={1}
                            loading={loading}
                            label="Name"
                            autoComplete="webauthn"


                        />
                        <Emailfield
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={EmailError}
                            sx={{ maxWidth: 400 }}
                            loading={loading}
                            tabIndex={2}
                            label="E-Mail"
                            autoComplete="webauthn"
                        />
                        <Passwordfield
                            showstrength
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={PasswordError}
                            loading={loading}
                            Props={{
                                TextfieldProps: {
                                    tabIndex: 3,
                                    autoComplete: "current-password webauthn",
                                    sx: {
                                        maxWidth: 400
                                    }
                                },
                            }}
                        >
                            Password
                        </Passwordfield>
                        <Passwordfield
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            error={PasswordError}
                            loading={loading}
                            Props={{
                                TextfieldProps: {
                                    tabIndex: 3,
                                    autoComplete: "current-password webauthn",
                                    sx: {
                                        maxWidth: 400
                                    }
                                },

                            }}
                        >
                            Repeat Password
                        </Passwordfield>


                        {/* TODO: Add terms and conditions checkbox */}
                        <Button type="submit" variant="contained" fullWidth color="primary">
                            Sign Up
                        </Button>
                    </Box>
                    {loading && (
                        <LinearProgress />
                    )}
                    {!loading && (
                        <Divider>Or Sign up with</Divider>
                    )}
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
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </>
    );

}
export default Signup;