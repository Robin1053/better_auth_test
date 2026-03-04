import { Avatar, Badge, Box, IconButton, Typography, TextField, Divider, Button, Alert } from "@mui/material";
import { authClient, Session } from "@/lib/auth-client";
import * as React from "react";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Emailfield } from "@/Components/auth/FormComponents/email";

type Props = {
    session: Session | null;
};

function UserProfile({ session }: Props) {
    //states 
    const [image, setImage] = React.useState(session?.user.image);
    const [Name, setName] = React.useState(session?.user.name)
    const [Email, setEmail] = React.useState(session?.user.email)
    const [error, setError] = React.useState<string | null>(null);


    async function updateUser() {
        try {
            await authClient.updateUser({
                name: Name,
                image: image,
            });
        } catch (error) {
            setError(error.message || "Failed to update profile");
        }
        if (Email !== session?.user.email) {
            authClient.changeEmail({
                newEmail: Email as string,
            }).catch((error) => {
                setError(error.message || "Failed to change email");
            })
        }
    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
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
                    <IconButton component="label">
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={handleUpload}
                        />
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={<PhotoCameraIcon sx={{ fontSize: 18 }} />}
                        >
                            <Avatar
                                src={session.user.image || image || undefined}
                                sx={{ width: 128, height: 128 }}
                            />
                        </Badge>
                    </IconButton>
                    <Divider />
                    <TextField
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
                    {error && (
                        <Alert
                            variant="outlined"
                            severity="error">
                            {error}
                        </Alert>
                    )}
                    <Button
                        variant="contained"
                        onClick={updateUser}
                        sx={{
                            mt: 2,
                            width: 400
                        }}
                    >
                        Update Profile
                    </Button>
                </Box >
            </Box >

        );
    }
}

export { UserProfile };
