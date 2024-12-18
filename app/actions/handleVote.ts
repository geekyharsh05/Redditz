"use server";

import prisma from "@/lib/db";
import { TypeOfVote } from "@prisma/client";
import { checkAuth } from "@/utils/checkAuth";
import { revalidatePath } from "next/cache";

export async function handleVote(formData: FormData) {
    const user = await checkAuth();
  
    const postId = formData.get("postId") as string;
    const voteDirection = formData.get("voteDirection") as TypeOfVote;
  
    const vote = await prisma.vote.findFirst({
      where: {
        userId: user.id,
        postId: postId,
      },
    });
  
    if (vote) {
      if (vote.voteType === voteDirection) {
        await prisma.vote.delete({
          where: {
            id: vote.id,
          },
        });
  
        return revalidatePath("/", "page");
      } else {
        await prisma.vote.update({
          where: {
            id: vote.id,
          },
          data: {
            voteType: voteDirection,
          },
        });
        return revalidatePath("/", "page");
      }
    }
  
    await prisma.vote.create({
      data: {
        userId: user.id,
        postId: postId,
        voteType: voteDirection,
      },
    });
  
    return revalidatePath("/", "page");
}