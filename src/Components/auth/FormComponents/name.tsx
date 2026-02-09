import { TextField } from "@mui/material"
import * as React from "react"


type NamefieldProps = {
    Name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    NameError: boolean;
    maxWidth?: number;
};
function Namefield({
    Name,
    setName,
    NameError,
    maxWidth
}: NamefieldProps) {
    return (
        <>
            <TextField
                sx={
                    {
                        maxWidth: maxWidth
                    }
                }
                fullWidth
                id="name"
                label="Max Mustermann"
                variant="standard"
                name="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
                error={NameError}
            />
        </>
    )
}

export default Namefield