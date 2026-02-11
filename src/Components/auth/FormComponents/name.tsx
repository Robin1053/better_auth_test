"use client";

import {
    TextField,
    CircularProgress,
    InputAdornment,
    TextFieldProps
} from "@mui/material";
import * as React from "react";

type NamefieldProps = {
    loading?: boolean;
} & TextFieldProps;

export const Namefield = React.forwardRef<
    HTMLInputElement,
    NamefieldProps
>(function Namefield(
    {
        loading = false,
        variant = "outlined",
        fullWidth = true,
        ...props
    },
    ref
) {
    return (
        <TextField
            {...props}
            inputRef={ref}
            variant={variant}
            fullWidth={fullWidth}
            disabled={loading}
        />
    );
});
