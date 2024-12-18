"use server";

import prisma from "@/lib/db";
import { checkAuth } from "@/utils/checkAuth";
import { redirect } from "next/navigation";
import { JSONContent } from "@tiptap/react";

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