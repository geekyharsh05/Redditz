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
import { Suspense } from "react";
import { SuspenseCard } from "./components/SuspenseCard";
import Pagination from "./components/Pagination";

async function getData() {
  const data = await prisma.post.findMany({
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
          postId: true,
        },
      },
      subName: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default function Home() {
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
        <Suspense fallback={<SuspenseCard />}>
          <ShowItems />
        </Suspense>
      </div>
    </div>
  );
}

async function ShowItems() {
  const data = await getData();
  return (
    <>
      {data.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          jsonContent={post.textContent as string}
          subName={post.subName}
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

      <Pagination totalPages={5} />
    </>
  );
}
