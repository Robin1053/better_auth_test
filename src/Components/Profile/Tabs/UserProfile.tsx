import { Avatar, Badge, Box, IconButton, Typography, TextField, Divider, Button, Alert } from "@mui/material";
import { authClient } from "@/lib/auth-client";
import * as React from "react";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Emailfield } from "@/Components/auth/FormComponents/email";
import { ActionButton, AvatarUpload, useNotification } from "@robineb/mui-utility";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers"
import { th } from "zod/v4/locales";


function UserProfile() {
    const { data: session } = authClient.useSession()
    if (session === null) {
        return (null)
    }
    //states 
    const [image, setImage] = React.useState(session.user.image);
    const [Name, setName] = React.useState(session.user.name)
    const [Email, setEmail] = React.useState(session.user.email)
    const [Birthday, setBirthday] = React.useState<Dayjs>()
    const [error, setError] = React.useState("");
    const [Loadig, setLoading] = React.useState(false)

    const { notify } = useNotification();
    const router = useRouter()

    async function updateUser() {
        setLoading(true)
        await authClient.updateUser({
            name: Name,
            image: image,
            birthday: Birthday?.toDate()
        },
            {
                onError: (error) => {
                },
                onSuccess: (data) => {
                    setLoading(false)
                    notify({
                        message: "Update Successful",
                        type: "success"
                    })
                }
            });

        if (Email !== session?.user.email) {
            authClient.changeEmail({
                newEmail: Email,
            }, {
                onError(error) {
                    if (error.error.status === 403) {
                        notify({ type: "warning", message: "Please verify your email address" })
                        router.push("/auth?view=verification")
                    } else {
                        setError(error.error.message)
                        notify({ type: "error", message: error.error.message })
                    }
                },
                onSuccess() {
                    setLoading(false)
                },
            })
        }
    }

    const handleUpload = (file: File) => {
        if (file) {
            const PUT = async (file: File) => {
                const formData = new FormData();
                formData.append("file", file);


            } else {
                const error = new Error("File upload failed");
                error.name = "UploadError";
                throw error;
            }
        };

        if (!session) {
            return null
        }
        else {
            return (
                <Box sx={{ width: "100%" }}>
                    <Typography
                        variant="h2"
                        color="tertiary"
                        sx={
                            {
                                display: "flex",
                                justifyContent: "center"
                            }
                        }
                    >User Profile
                    </Typography>
                    <Box
                        component="form"
                        sx={
                            {
                                mt: 2,
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center"
                            }
                        }>
                        <AvatarUpload onUpload={handleUpload} image={session.user.image ?? "/"} />
                        <Divider />
                        <TextField
                            defaultValue={session.user.name}
                            id="Name"
                            label="Name"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            variant="standard"
                            sx={
                                {
                                    width: 400
                                }
                            }
                        />
                        <Emailfield
                            defaultValue={session.user.email}
                            label="Email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="standard"
                            margin="normal"
                            sx={
                                {
                                    width: 400
                                }
                            }
                        />
                        <DatePicker
                            defaultValue={dayjs(session.user.birthday)}
                            value={Birthday}
                            onChange={(e) => setBirthday(e ?? undefined)}
                        />
                        {error && (
                            <Alert
                                variant="outlined"
                                severity="error">
                                {error}
                            </Alert>
                        )}
                        <ActionButton
                            action={updateUser}
                        >
                            Update User
                        </ActionButton>
                    </Box >
                </Box >

            );
        }
    }

    export { UserProfile };
