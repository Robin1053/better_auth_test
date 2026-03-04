import { authClient } from "@/lib/auth-client";
import { Box, Card, CardHeader, Button } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import * as React from 'react'
import { useNotification } from "@/Components/ui/NotificationProvider";
import { useRouter } from "next/navigation";

export function TwoFaktor() {
    const { notify } = useNotification();
    const [otp, setOtp] = React.useState("");
    const router = useRouter();
    const [Loading, setLoading] = React.useState(false);

    const handleOTPSubmit = async () => {
        console.log("Submitted OTP:", otp);
        const { data, error } = await authClient.twoFactor.verifyTotp({
            code: otp,
            trustDevice: true,
        });
        if (error) {
            console.error("OTP verification failed:", error);
            notify({
                message: "OTP verification failed. Please try again.",
                type: "error"
            });
        } else {
            console.log("OTP verification successful:", data);
            notify({
                message: "OTP verification successful!",
                type: "success"
            });
            router.push("/");
        }

    };
    //TODO: Add error handling, e.g. show error message if OTP is incorrect or expired, and handle successful verification, e.g. redirect to dashboard or show success message.
    //TODO: Add loading state while verifying OTP, and disable the input and button during verification to prevent multiple submissions.
    //TODO: Add option to use backup codes if the user cannot access their authenticator app, and handle that flow as well.
    return (
        <>
            <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, p: 2 }}>
                <CardHeader
                    title="OTP-Code"
                    subheader="Please put your OTP in the Box"
                    sx={
                        {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                        }
                    }
                />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <MuiOtpInput
                        value={otp}
                        onChange={setOtp}
                        length={6}
                        autoFocus={true} />
                    <Button
                        loading={Loading}
                        disabled={otp.length !== 6 || Loading}
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={
                            { mt: 2 }
                        }
                        onClick={handleOTPSubmit}
                    >
                        Verify
                    </Button>
                </Box>
            </Card>
        </>
    );
}