import { TextField } from "@mui/material"
import * as React from "react"


type EmailfieldProps = {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    EmailError: boolean;
    maxWidth?: number;
    tabIndex?: number;
};
export function Emailfield({
    email,
    setEmail,
    EmailError,
    maxWidth,
    tabIndex
}: EmailfieldProps) {
    return (
        <>
            <TextField
                sx={
                    {
                        maxWidth: maxWidth
                    }
                }
                fullWidth
                id="email"
                label="Max@Musterman.com"
                variant="standard"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={EmailError}
                helperText={EmailError ? "Please enter a valid email address." : ""}
                tabIndex={tabIndex}
            />
        </>
    )
}