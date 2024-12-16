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
        }
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
  })

  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10 px-4 sm:px-6 lg:px-8">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />
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
      </div>

      <div className="w-[35%]">
        <Card>
          <Image src={Banner} alt="Banner" />
          <div className="p-2">
            <div className="flex items-center">
              <Image
                src={HelloImage}
                alt="Hello Image"
                className="w-10 h-16 -mt-6"
              />
              <h1 className="font-medium pl-3">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Your Home Reddit frontpage. Come here to check in with your
              favorite communites!
            </p>

            <Separator className="my-5" />

            <div className="flex flex-col gap-y-3">
              <Button asChild variant="secondary">
                <Link href="/r/harsh/create">Create Post</Link>
              </Button>
              <Button asChild>
                <Link href="/r/create">Create Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
