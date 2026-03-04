import { Middleware } from "better-auth";
import prisma from "../prisma";

async function usePeopleApi(ctx: Middleware) {
    if (ctx.path.startsWith("/callback") && ctx.context.newSession) {
        const newSession = ctx.context.newSession;

        if (newSession?.user?.id) {
            const userId = newSession.user.id;
            await new Promise(resolve => setTimeout(resolve, 200));

            // Hole das Google Access Token
            const account = await prisma.account.findFirst({
                where: {
                    userId: userId,
                    providerId: "google",
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            if (account?.accessToken) {
                try {
                    const response = await fetch(
                        'https://people.googleapis.com/v1/people/me?personFields=birthdays',
                        {
                            headers: {
                                Authorization: `Bearer ${account.accessToken}`,
                            },
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();

                        if (data.birthdays?.[0]?.date) {
                            const bday = data.birthdays[0].date;
                            if (bday.year && bday.month && bday.day) {
                                const birthday = new Date(bday.year, bday.month, bday.day);

                                // Update User mit Birthday
                                await prisma.user.update({
                                    where: { id: userId },
                                    data: { birthday },
                                });
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error fetching birthday from Google People API:", error);
                }
            }
        }
    }
}

export { usePeopleApi };