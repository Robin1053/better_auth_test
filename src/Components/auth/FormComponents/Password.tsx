import { FormControl, InputLabel, Input, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as React from "react";

type PasswordfieldProps = {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    PasswordError: boolean;
    maxWidth?: number;
    Label: string;
};

export function Passwordfield({
    password,
    setPassword,
    PasswordError,
    maxWidth,
    Label,
}: PasswordfieldProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () =>
        setShowPassword((show) => !show);

    return (
        <FormControl fullWidth variant="standard" required>
            <InputLabel>{Label}</InputLabel>
            <Input
                sx={{ maxWidth }}
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                error={PasswordError}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}