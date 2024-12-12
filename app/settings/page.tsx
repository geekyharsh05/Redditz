import prisma from '@/lib/db'
import React from 'react'
import { unstable_noStore as noStore } from "next/cache";
import SettingsForm from '../components/SettingsForm';
import { checkAuth } from '@/utils/checkAuth';

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
    const user = await checkAuth();
    const data = await getData(user.id);

    return (
        <div className="max-w-[1000px] mx-auto mt-8 px-4 sm:px-6 lg:px-8">
            <SettingsForm username={data?.userName} />
        </div>
    )
}

export default SettingsPage;    