import { authClient } from "@/lib/auth-client";
import { Box, Card, CardHeader, Button, FormControlLabel, Checkbox, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import * as React from 'react'
import { ActionButton, useNotification } from "@robineb/mui-utility";
import { useRouter } from "next/navigation";

export function TwoFaktor() {
    const { notify } = useNotification();
    const [otp, setOtp] = React.useState("");
    const router = useRouter();
    const [Loading, setLoading] = React.useState(false);
    const [TrustDevice, setTrustDevice] = React.useState(false)
    const [open, setOpen] = React.useState(false);

    const handleOtpChange = (value: string) => {
        if (Loading) return;
        setOtp(value);
    };


    const handleOTPSubmit = async () => {
        if (Loading || otp.length !== 6) return;
        console.log("Submitted OTP:", otp);
        setLoading(true);
        const { data, error } = await authClient.twoFactor.verifyTotp({
            code: otp,
            trustDevice: TrustDevice
        });
        if (error) {
            console.error("OTP verification failed:", error);
            notify({
                message: error.message ?? "OTP verification failed",
                type: "error"
            });
            setLoading(false);
        } else {
            console.log("OTP verification successful:", data);
            notify({
                message: "OTP verification successful!",
                type: "success"
            });
            router.push("/");
            setLoading(false);
        };
    }


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
                        onChange={handleOtpChange}
                        length={6}
                        autoFocus={true}
                        TextFieldsProps={
                            {
                                disabled: Loading,
                                inputProps: {
                                    readOnly: Loading,
                                }
                            }
                        }
                    />
                    <FormControlLabel
                        label="Trust  Device?"
                        control={
                            <Checkbox
                                value=""
                                onChange={(e) => setTrustDevice(e.target.checked)}
                                color="primary"
                                disabled={Loading}
                            />
                        }
                    />
                    <Box sx={
                        {
                            display: "flex",
                            flexDirection: "row-reverse"
                        }
                    }>
                        <Button variant="text" color="primary" onClick={() => setOpen(true)}>
                            <Typography variant="caption" color="tertiary">
                                Can't access your authenticator app?
                            </Typography>
                        </Button>
                    </Box>
                    <ActionButton
                        action={handleOTPSubmit}
                        Props={
                            {
                                ButtonProps: {
                                    loading: Loading,
                                    disabled: otp.length !== 6,
                                    fullWidth: true,
                                    sx: {
                                        mt: 0
                                    }
                                }
                            }
                        }
                    >
                        Verify
                    </ActionButton>
                </Box>
                <BackupOTPDialog />
            </Card>
        </>
    );

    function BackupOTPDialog() {
        const [BackupOTP, setBackupOTP] = React.useState("");
        
        const handleBackupOTPChange = (value: string) => {
            if (Loading) return;
            setBackupOTP(value);
        };
        const handleBackupOTPSubmit = async () => {
            if (Loading || BackupOTP.length !== 6) return;
            console.log("Submitted OTP:", BackupOTP);
            setLoading(true);
            const { data, error } = await authClient.twoFactor.verifyBackupCode({
                code: BackupOTP,
                trustDevice: TrustDevice
            });
            if (error) {
                console.error("Backup OTP verification failed:", error);
                notify({
                    message: error.message ?? "Backup OTP verification failed",
                    type: "error"
                });
                setLoading(false);
            } else {
                console.log("Backup OTP verification successful:", data);
                notify({
                    message: "Backup OTP verification successful!",
                    type: "success"
                });
                router.push("/");
                setLoading(false);
            };
        }
        return (
            <>
                <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby={"BackupDialogTitleId"}>
                    <DialogTitle id={"BackupDialogTitleId"}>
                        Backup Codes
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <MuiOtpInput
                                value={BackupOTP}
                                onChange={handleBackupOTPChange}
                                length={6}
                                autoFocus={true}
                                TextFieldsProps={
                                    {
                                        disabled: Loading,
                                        inputProps: {
                                            readOnly: Loading,
                                        }
                                    }
                                }
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={
                        {
                            display: "flex",
                        }}>
                        <ActionButton
                            action={handleBackupOTPSubmit}
                            Props={{
                                ButtonProps: {
                                    loading: Loading,
                                    disabled: BackupOTP.length !== 6,
                                    fullWidth: true,

                                    color: "primary",
                                    sx: {
                                        mt: 0,
                                        width: "75%"
                                    }
                                }
                            }}
                        >
                            Verify with Backup Code
                        </ActionButton>
                        <Button onClick={() => setOpen(false)} color="secondary" sx={{ width: "25%" }}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog >
            </>
        )
    }
}

