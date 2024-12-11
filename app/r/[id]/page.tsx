import SubDescriptionForm from "@/app/components/SubDescriptionForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { checkAuth } from "@/utils/checkAuth";
import { CakeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(name: string) {
    const data = await prisma.subreddit.findUnique({
        where: {
            name: name,
        },
        select: {
            name: true,
            description: true,
            createdAt: true,
            userId: true,
        }
    })

    return data;
}

export default async function SubredditRoute({ params }: { params: { id: string } }) {
    const resolvedParams = await params
    const data = await getData(resolvedParams.id);
    const user = await checkAuth();

    return (
        <div className="max-w-[1000px] mx-auto mt-8 px-4 sm:px-6 lg:px-8 flex gap-x-10">
            <div className="w-[65%] flex flex-col gap-y-5">
                <h1>Hello from the post section</h1>
            </div>

            <div className="w-[35%]">
                <Card>
                    <div className="bg-muted p-4 font-semibold">About Community</div>
                    <div className="p-4">
                        <div className="flex items-center gap-x-3">
                            <Image
                                src={`https://avatar.vercel.sh/${data?.name}`}
                                alt="community"
                                width={60}
                                height={60}
                                className="rounded-full h-16 w-16"
                            />
                            <Link href={`/r/${data?.name}`} className="flex items-center gap-x-3">
                                r/{data?.name}
                            </Link>
                        </div>
                        {user?.id === data?.userId ? (
                            <SubDescriptionForm description={data?.description} subredditName={data?.name} />
                        ) : (
                            <p className="text-sm font-normal text-secondary-foreground mt-2">
                                {data?.description}
                            </p>
                        )}

                        <div className="flex items-center gap-x-2 mt-2">
                            <CakeIcon className="h-4 w-4" />
                            <p className="text-sm font-medium text-muted-foreground">
                                Created On: {new Date(data?.createdAt as Date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>

                        <Separator className="my-5" />

                        <Button asChild className="w-full rounded-full">
                            <Link
                                href={user?.id ? `/r/${data?.name}/create` : "/api/auth/login"}
                            >
                                Create Post
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}