"use client"
import { Card, CardContent, Typography, Box, Button, LinearProgress, Divider, Alert } from "@mui/material";
import * as React from "react"
import { GitHubButton, GoogleButton } from "@/Components/auth/FormComponents/LoginButtons";
import { Passwordfield } from "@/Components/auth/FormComponents/Password";
import { Emailfield } from "@/Components/auth/FormComponents/email";
import { authClient } from "@/lib/auth-client";
import { useNotification } from "@/Components/ui/NotificationProvider";
import { Namefield } from "@/Components/auth/FormComponents/name";
import { useRouter } from "next/navigation";
import { fa } from "zod/locales";





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
    const [loading, setLoading] = React.useState(false);




    // Error handling states
    const [errorMessage, setErrorMessage] = React.useState("");
    const [EmailError, setEmailError] = React.useState(false);
    const [PasswordError, setPasswordError] = React.useState(false)
    const [NameError, setNameError] = React.useState(false)


    //Validierungen 
    const isEmailValid = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password: string, password2: string): boolean => {
        const passwordRegex = /^(?=.*\d)(?=.*[^\w\s]).{8,}$/;
        if (password !== password2) {
            return false;
        } else {
            return passwordRegex.test(password);
        }
    };
    const isNameValid = (name: string): boolean => {
        return name.trim().length > 0;
    }

    async function handleEmailSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setEmailError(false);
        setPasswordError(false);
        setNameError(false)

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
        try {
            const { error } = await authClient.signUp.email(
                {
                    email,
                    password,
                    name,
                }
            );
            if (error) {
                setLoading(false);

                switch (error.code) {
                    case "INVALID_EMAIL":
                        setEmailError(true);
                        setErrorMessage("The email address is not valid.");
                        break;

                    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
                        setEmailError(true);
                        setErrorMessage("An account with this email already exists.");
                        break;

                    case "PASSWORD_TOO_SHORT":
                        setPasswordError(true);
                        setErrorMessage("The password is too short.");
                        break;

                    case "PASSWORD_TOO_WEAK":
                        setPasswordError(true);
                        setErrorMessage("The password is too weak.");
                        break;

                    case "INVALID_PASSWORD":
                        setPasswordError(true);
                        setErrorMessage("The password is invalid.");
                        break;

                    case "MISSING_FIELDS":
                        setErrorMessage("Please fill in all required fields.");
                        break;

                    case "INVALID_NAME":
                        setErrorMessage("The provided name is not valid.");
                        setNameError(true)
                        break;

                    case "RATE_LIMITED":
                        setErrorMessage("Too many signup attempts. Please try again later.");
                        break;

                    case "EMAIL_VERIFICATION_REQUIRED":
                        setErrorMessage("Please verify your email address to continue.");
                        notify({ message: "Please verify your email address to continue", type: "info" })
                        break;

                    case "INTERNAL_SERVER_ERROR":
                        setErrorMessage("An internal server error occurred. Please try again later.");
                        break;

                    default:
                        setErrorMessage("An unexpected error occurred. Please try again.");
                        console.log(error.code)
                        console.log(error.message)
                        break;
                }
                return
            }
            notify({ message: "Signup successful!", type: "success" });
        } catch (err) {
            console.error("Unexpected error:", err);
            setErrorMessage("An unexpected error has occurred.: " + String(err));
        } finally {
            setLoading(false)
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

                        />
                        <Emailfield
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={EmailError}
                            sx={{ maxWidth: 400 }}
                            loading={loading}
                            tabIndex={2}
                            label="E-Mail"
                        />
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
                        />
                        <Passwordfield
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            error={PasswordError}
                            loading={loading}
                            sx={
                                { maxWidth: 400 }
                            }
                            label="Repeat Password"
                            tabIndex={4}
                        />
                        {/* TODO: Add terms and conditions checkbox, and an Image input */}
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
                    <Box>
                        <GoogleButton width={400} />
                        <GitHubButton width={400} />
                    </Box>
                </CardContent>
            </Card>
        </>
    );

}
export default Signup;