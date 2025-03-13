import CreatePostCard from "@/app/components/CreatePostCard";
import Pagination from "@/app/components/Pagination";
import PostCard from "@/app/components/PostCard";
import SubDescriptionForm from "@/app/components/SubDescriptionForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { checkAuth } from "@/utils/checkAuth";
import { CakeIcon, FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

async function getData(name: string, searchParams: string) {
    await connection()
    const [count, data] = await prisma.$transaction([
        prisma.post.count({
            where: {
                subName: name,
            }
        }),

        prisma.subreddit.findUnique({
            where: {
                name: name,
            },
            select: {
                name: true,
                description: true,
                createdAt: true,
                userId: true,
                posts: {
                    take: 10,
                    skip: searchParams ? (Number(searchParams) - 1) * 10 : 0,
                    select: {
                        title: true,
                        createdAt: true,
                        textContent: true,
                        id: true,
                        imageString: true,
                        User: {
                            select: {
                                userName: true,
                            },
                        },
                        Vote: {
                            select: {
                                userId: true,
                                voteType: true,
                            },
                        },
                        Comment: {
                            select: {
                                id: true,
                            }
                        },
                        subName: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                }
            }
        })]
    )

    return { data, count };
}

export default async function SubredditRoute({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ page: string }> }) {
    const { id } = await params;
    const { page } = await searchParams
    const { data, count } = await getData(id, page);
    const user = await checkAuth();

    return (
        <div className="max-w-[1000px] mx-auto mt-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-y-10 sm:gap-x-10">
            {/* Left Section */}
            <div className="w-full sm:w-[65%] flex flex-col gap-y-5">
                <CreatePostCard />

                {data?.posts.length === 0 ? (
                    <div className="flex min-h-[300px] flex-col justify-center items-center rounded-md border border-dashed p-8 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                            <FileQuestion className="h-10 w-10 text-primary" />
                        </div>

                        <h2 className="mt-6 text-xl font-semibold">
                            No Posts Yet!
                        </h2>
                    </div>
                ) : (
                    data?.posts.map((post) => (
                        <PostCard
                            key={post.id}
                            id={post.id}
                            imageString={post.imageString as string}
                            title={post.title}
                            subName={post.subName as string}
                            userName={post.User?.userName as string}
                            jsonContent={post.textContent as string}
                            voteCount={post.Vote.reduce((acc, vote) => {
                                if (vote.voteType === "UP") return acc + 1;
                                if (vote.voteType === "DOWN") return acc - 1;

                                return acc;
                            }, 0)}
                            createdAt={post.createdAt}
                            commentCount={post.Comment.length}
                        />
                    ))
                )}

                <Pagination totalPages={Math.ceil(count / 10)} />
            </div>

            {/* Right Section */}
            <div className="w-full sm:w-[35%]">
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

                        {/* Show Description Form or Text */}
                        {user?.id === data?.userId ? (
                            <SubDescriptionForm description={data?.description} subName={data?.name} />
                        ) : (
                            <p className="text-sm font-normal text-secondary-foreground mt-2">
                                {data?.description}
                            </p>
                        )}

                        {/* Created On Date */}
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

                        {/* Create Post Button */}
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
    );
}