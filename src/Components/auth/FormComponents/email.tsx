"use client"
import { CircularProgress, InputAdornment, TextField, TextFieldProps } from "@mui/material"
import * as React from "react"


type EmailfieldProps = {
    loading?: boolean;
} & Omit<TextFieldProps, "type">;

export function Emailfield({
    loading = false,
    ...props }: EmailfieldProps) {
    return (
        <>
            <TextField
                {...props}
                disabled={loading}
            />
        </>
    )
}
