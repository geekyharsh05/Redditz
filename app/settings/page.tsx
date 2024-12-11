import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from 'next/navigation';
import SettingsForm from '../components/SettingsForm';

async function getData(userId: string) {
    noStore();
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            userName: true,
        },
    });

    return data;
}

async function SettingsPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const data = await getData(user.id);

    return (
        <div className="max-w-[1000px] mx-auto mt-8 px-4 sm:px-6 lg:px-8">
            <SettingsForm username={data?.userName} />
        </div>
    )
}

export default SettingsPage;    