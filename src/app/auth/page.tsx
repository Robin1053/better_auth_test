import Signin from '@/Components/auth/signin'
import Typography from '@mui/material/Typography'
export default async function AuthPage() {
    return (
        <>
            <Typography variant="h3" >Auth Page</Typography>
            <Signin>
            </Signin>
        </>
    )
}