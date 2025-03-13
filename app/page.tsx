import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import Banner from "../public/banner.png";
import HelloImage from "../public/hero-image.png";
import CreatePostCard from "./components/CreatePostCard";
import prisma from "@/lib/db";
import PostCard from "./components/PostCard";
import { Suspense, use } from "react";
import { SuspenseCard } from "./components/SuspenseCard";
import Pagination from "./components/Pagination";
import { connection } from "next/server";

async function getData(searchParams: string) {
  await connection()
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),

    prisma.post.findMany({
      take: 10,
      skip: searchParams ? (Number(searchParams) - 1) * 10 : 0,
      select: {
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,
        subName: true,
        User: {
          select: {
            userName: true,
          },
        },
        Vote: {
          select: {
            userId: true,
            voteType: true,
            postId: true,
          },
        },
        Comment: {
          select: {
            id: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  ]);

  return { data, count };
}

export default function Home({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = use(searchParams)
  return (
    <div className="max-w-[1000px] mx-auto flex flex-col lg:flex-row gap-x-10 mt-4 mb-10 px-4 sm:px-6 lg:px-8">
      {/* Right Section */}
      <div className="lg:w-[35%] w-full mt-6 lg:mt-0 order-first lg:order-2">
        <Card>
          <Image src={Banner} alt="Community Banner" className="w-full object-cover" />
          <div className="p-2">
            <div className="flex items-center">
              <Image
                src={HelloImage}
                alt="Welcome Illustration"
                className="w-10 h-16 -mt-6"
              />
              <h1 className="font-medium pl-3">Welcome Home</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              This is your personalized Reddit front page. Check in with your favorite communities and explore new ones!
            </p>

            <Separator className="my-5" />

            <div className="flex flex-col gap-y-3">
              <Button asChild variant="secondary">
                <Link href="/r/harsh/create">Create a Post</Link>
              </Button>
              <Button asChild>
                <Link href="/r/create">Start a Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Left Section */}
      <div className="lg:w-[65%] w-full flex flex-col gap-y-5 lg:order-1">
        <CreatePostCard />
        <Suspense fallback={<SuspenseCard />} key={page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function ShowItems({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams
  const { count, data } = await getData(page);

  return (
    <>
      {data.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          jsonContent={post.textContent as string}
          subName={post.subName as string}
          commentCount={post.Comment.length}
          userName={post.User?.userName as string}
          imageString={post.imageString as string}
          createdAt={post.createdAt}
          voteCount={post.Vote.reduce((acc, vote) => {
            if (vote.voteType === "UP") return acc + 1;
            if (vote.voteType === "DOWN") return acc - 1;

            return acc;
          }, 0)}
        />
      ))}

      <Pagination totalPages={Math.ceil(count / 10)} />
    </>
  );
}
