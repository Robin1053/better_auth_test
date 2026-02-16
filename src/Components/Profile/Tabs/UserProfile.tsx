import { Box } from "@mui/material";
import { Session } from "@/lib/auth-client";
type Props = {
    session: Session | null;
};

function UserProfile({ session }: Props) {
    return (
        <Box sx={{ width: "100%" }}>
            {/* content */}
        </Box>
    );
}

export { UserProfile };
