
import { Card } from "@/components/ui/card";

import { SellForm } from "../components/form/Sellform";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { unstable_noStore } from "next/cache";

async function getData(userId: string) {
    await prisma.user.findUnique({
        where: {
            id: userId,
        }
    });



    return null;
}

export default async function SellRoute() {
    unstable_noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    await getData(user.id);

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
            <Card>

                <SellForm />
            </Card>
        </section>
    );
}