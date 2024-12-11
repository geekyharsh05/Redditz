"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { checkAuth } from "@/utils/checkAuth";
import { redirect } from "next/navigation";
import { JSONContent } from "@tiptap/react";

export async function updateUsername(prevState: unknown, formData: FormData) {
    const user = await checkAuth();

    try {
      const username = formData.get("username") as string;
  
      const currentUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { userName: true },
      });
    
      if (currentUser?.userName === username) {
          return {
              message: "Your username is the same as the current one.",
              status: "error",
          };
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          userName: username,
        },
      });
      
      return {
        message: "Username Updated Successfully!",
        status: "success",
      };
    } catch(e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return {
            message: "This username is already taken.",
            status: "error",
          };
        }
      }
      throw e;
    }
}

export async function createCommunity(prevState: unknown, formData: FormData) {
  const user = await checkAuth();

  try {
    const name = formData.get("name") as string;

    const data = await prisma.subreddit.create({
      data: {
        name: name,
        userId: user.id,
      },
    })
  
    return {
        message: "Community Created Successfully!",
        status: "success",
        redirectUrl: `/r/${data.name}`,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Community name already exists",
          status: "error",
        };
      }
    }
    throw e;
  }
}

export async function updateSubRedditDescription(prevState: unknown, formData: FormData) {
  await checkAuth();
  try {
    const subName = formData.get("subName") as string;
    const description = formData.get("description") as string;

    await prisma.subreddit.update({
      where: {
        name: subName,
      },
      data: {
        description: description,
      },
    })

    return {
      message: "Description Updated Successfully!",
      status: "success",
    }
  } catch (e) {
    return {
      status: "error",
      message: "Sorry something went wrong!",
    };
  }
}

export async function createPost(
  { jsonContent }: { jsonContent: JSONContent | null },
  formData: FormData
) {
  const user = await checkAuth()

  const title = formData.get("title") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const subName = formData.get("subName") as string;

  const data = await prisma.post.create({
    data: {
      title: title,
      imageString: imageUrl ?? undefined,
      subName: subName,
      userId: user.id,
      textContent: jsonContent ?? undefined,
    },
  });

  return redirect(`/post/${data.id}`);
}