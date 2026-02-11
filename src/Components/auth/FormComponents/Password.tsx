"use client";

import {
    TextField,
    InputAdornment,
    IconButton,
    TextFieldProps
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as React from "react";

type PasswordfieldProps = {
    loading?: boolean;
} & Omit<TextFieldProps, "type">;

export function Passwordfield({
    loading = false,
    InputProps,
    ...props
}: PasswordfieldProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <TextField
            {...props}
            type={showPassword ? "text" : "password"}
            disabled={loading}
            slotProps={{
                input: {
                    ...InputProps,
                    endAdornment: (<InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                            tabIndex={props.tabIndex}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>)
                }
            }}
        />
    );
}
