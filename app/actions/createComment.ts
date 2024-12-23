"use server"

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { checkAuth } from "@/utils/checkAuth";

export async function createComment(formData: FormData) {
    const user = await checkAuth();
    
    const comment = formData.get("comment") as string;
    const postId = formData.get("postId") as string;
  
    await prisma.comment.create({
      data: {
        text: comment,
        userId: user.id,
        postId: postId,
      },
    });
  
    revalidatePath(`/post/${postId}`);
}