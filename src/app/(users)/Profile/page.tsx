import { Profile } from "@/Components/Profile/Profile";
import { auth } from "@/lib/auth";
import { headers } from "next/headers"

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) {
        //TODO: 
        //Pusch useres to sign in page if they are not signed in. This is a temporary solution until we have a better way to handle this.
        return <div>You are not signed in. Please sign in to view your profile.</div>
    }
    return (
        <Profile />
    )
}