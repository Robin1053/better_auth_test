"use client"
//TODO: build a loading state or use the loading state from parent compunment 
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as React from "react";

type PasswordfieldProps = {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    PasswordError: boolean;
    maxWidth?: number;
    Label: string;
    tabIndex?: number;
};

export function Passwordfield({
    password,
    setPassword,
    PasswordError,
    maxWidth,
    Label,
    tabIndex
}: PasswordfieldProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () =>
        setShowPassword((show) => !show);

    return (
        <FormControl fullWidth variant="standard" required tabIndex={tabIndex}>
            <InputLabel>{Label}</InputLabel>
            <Input
                sx={{ maxWidth }}
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                error={PasswordError}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} tabIndex={tabIndex}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}
